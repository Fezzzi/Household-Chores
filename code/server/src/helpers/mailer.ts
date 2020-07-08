import nodemailer from 'nodemailer';

import { Logger } from '../helpers/logger';
import { MAIL_LOG } from '../constants/logs';

const getTemplate = (templateName: string, data: any): { subject: string, html: string} => {
  const templateModule = require(`serverSrc/../mails/${templateName}.js`);
  return {
    subject: templateModule.getSubject(data),
    html: templateModule.getHTML(data),
  };
}

export const sendEmails = async (templateName: string, data:any, recipients: [string]) => {
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // Add locale translations to data
  const { subject, html } = getTemplate(templateName, data)
  transporter.sendMail({
    from: 'Household App',
    to: recipients.join(','),
    subject,
    html,
  }).then(({ err, info }) => {
    console.log(info);
    Logger(MAIL_LOG, `Sent ${recipients.length} emails to ${recipients.join(',')}`);
  });
}
