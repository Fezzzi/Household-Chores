import sgMail from '@sendgrid/mail'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants'
import { EmailDataShape, mails } from 'serverSrc/mails'
import * as template from 'serverSrc/mails/template'

import { Logger } from './logger'
import { LOGS, CONFIG } from '../constants'

interface EmailTemplate {
  subject: string
  text: string
  html: string
}

const getTemplate = (templateName: string, locale: string, data: any): EmailTemplate => {
  const localeCode = (locale && AVAILABLE_LOCALES.includes(locale as string) && locale as string) || DEFAULT_LOCALE
  const { wrapSubject, wrapText, wrapHTML } = template
  const { getSubject, getText, getHTML } = mails[localeCode]?.[templateName] ?? mails[DEFAULT_LOCALE]?.[templateName]

  return {
    subject: wrapSubject(getSubject(data)),
    text: wrapText(getText(data)),
    html: wrapHTML(getHTML(data)),
  }
}

if (CONFIG.SENDGRID_API_KEY && CONFIG.SENDGRID_EMAIL) {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY)
}

export const sendEmails = async (
  templateName: string,
  locale: string,
  data: EmailDataShape,
  recipients: string[]
): Promise<boolean> => {
  if (!CONFIG.SENDGRID_API_KEY || !CONFIG.SENDGRID_EMAIL) {
    console.warn('Emails are disabled, to enable them set up SENDGRID_API_KEY and SENDGRID_EMAIL environmental variables.')
    console.warn(`Attempted to send ${templateName} to ${recipients.join(',')}.`)
    return true
  }

  const { subject, text, html } = getTemplate(templateName, locale, data)

  const results = await Promise.all(recipients.map(recipient => new Promise(resolve => {
    const msg = {
      to: recipient,
      from: CONFIG.SENDGRID_EMAIL!,
      subject,
      text,
      html,
    }

    sgMail.send(msg)
      .then(() => {
        Logger(LOGS.MAIL_LOG, `Sending of ${templateName} email to ${recipients.join(',')} was successful`)
        resolve(true)
      })
      .catch(err => {
        Logger(LOGS.MAIL_LOG, `Sending of ${templateName} email to ${recipients.join(',')} failed - ${err.message}`)
        resolve(false)
      })
  })))

  return results.some(Boolean)
}
