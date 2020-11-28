import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

import { Logger } from './logger'
import { LOGS } from '../constants'

const envs = dotenv.config()

const getTemplate = (templateName: string, data: any): { subject: string; html: string} => {
  const templateModule = require(`serverSrc/mails/${templateName}.ts`)
  return {
    subject: templateModule.getSubject(data),
    html: templateModule.getHTML(data),
  }
}

export const sendEmails = async (templateName: string, data: any, recipients: [string]) => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  // todo: Add locale translations to data
  const { subject, html } = getTemplate(templateName, data)
  return transporter.sendMail({
    from: 'Household App',
    to: envs.parsed
      ? (envs.parsed.TEST === 'true'
        ? envs.parsed.TEST_EMAIL
        : recipients.join(','))
      : '',
    subject,
    html,
  }).then(value => {
    Logger(
      LOGS.MAIL_LOG,
      `Sent ${value.accepted.length} of ${value.accepted.length + value.rejected.length} ${templateName} emails, `
      + `approved: [${value.accepted.join(',')}] failed: [${value.rejected.join(',')}]`
    )
    return value.accepted.length > 0
  }).catch(reason => {
    Logger(LOGS.MAIL_LOG, `Sending ${templateName} emails to ${recipients.join(',')} failed - ${reason.code}`)
    return false
  })
}
