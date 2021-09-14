import sgMail from '@sendgrid/mail'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants'
import { Email, EmailTemplateDataShapeType, mails } from 'serverSrc/mails'
import { wrapSubject, wrapText, wrapHTML } from 'serverSrc/mails/template'

import { Logger } from './logger'
import { LOGS, CONFIG, EMAIL_TEMPLATE } from '../constants'

if (CONFIG.SENDGRID_API_KEY && CONFIG.SENDGRID_EMAIL) {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY)
}

const getTemplate = <T extends EMAIL_TEMPLATE> (
  templateName: T,
  data: EmailTemplateDataShapeType[T],
  locale: string,
) => {
  const localeCode = (locale && AVAILABLE_LOCALES.includes(locale as string) && locale as string) || DEFAULT_LOCALE
  const template = mails[localeCode] ?? mails[DEFAULT_LOCALE]
  const { getSubject, getText, getHTML } = template[templateName] as Email<EmailTemplateDataShapeType[T]>

  return {
    subject: wrapSubject(getSubject(data)),
    text: wrapText(getText(data)),
    html: wrapHTML(getHTML(data)),
  }
}

export const sendEmails = async<T extends EMAIL_TEMPLATE> (
  recipients: string[],
  templateName: T,
  data: EmailTemplateDataShapeType[T],
  locale: string
): Promise<boolean> => {
  if (!CONFIG.SENDGRID_API_KEY || !CONFIG.SENDGRID_EMAIL) {
    console.warn('Emails are disabled, to enable them set up SENDGRID_API_KEY and SENDGRID_EMAIL environmental variables.')
    console.warn(`Attempted to send ${templateName} to ${recipients.join(',')}.`)
    return true
  }

  const { subject, text, html } = getTemplate(templateName, data, locale)

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
