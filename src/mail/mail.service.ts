import * as nodemailer from 'nodemailer';

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"MonitorWeb" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}
