import nodemailer from 'nodemailer'

import { InternalServerError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export interface Mailer {
  sendMail: (to: string, subject: string, text: string, html?: string) => Promise<void>
}

export class NodemailerAdapter implements Mailer {
  @inject('Logger')
  private readonly Logger!: Logger

  async sendMail(to: string, subject: string, text?: string, html?: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER_MAIL,
          pass: process.env.SMTP_USER_PASS
        }
      })
      const mailOptions = {
        from: process.env.SMTP_FROM_MAIL,
        to,
        subject,
        text,
        html
      }
      await transporter.sendMail(mailOptions)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.Logger.error(errorMessage)
      throw new InternalServerError('Mailer Error')
    }
  }
}
