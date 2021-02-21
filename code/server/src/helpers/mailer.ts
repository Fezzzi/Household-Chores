import nodemailer, { SentMessageInfo } from 'nodemailer'
import dotenv from 'dotenv'

import { Logger } from './logger'
import { LOGS } from '../constants'

dotenv.config()

const getTemplate = (templateName: string, data: any): { subject: string; html: string} => {
  const templateModule = require(`serverSrc/mails/${templateName}.ts`)
  return {
    subject: templateModule.getSubject(data),
    html: templateModule.getHTML(data),
  }
}

export const sendEmails = async (templateName: string, data: any, recipients: [string]): Promise<boolean> => {
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

  const info: SentMessageInfo = await transporter.sendMail({
    from: 'Household App',
    to: process.env.TEST === 'true'
      ? process.env.TEST_EMAIL
      : recipients.join(','),
    subject,
    html,
  }, err => err && Logger(LOGS.MAIL_LOG, `Sending ${templateName} emails to ${recipients.join(',')} failed - ${err.message}`))

  Logger(
    LOGS.MAIL_LOG,
    `Sent ${info.accepted.length} of ${info.accepted.length + info.rejected.length} ${templateName} emails, `
    + `approved: [${info.accepted.join(',')}] failed: [${info.rejected.join(',')}]`
  )
  return info.accepted.length > 0
}
