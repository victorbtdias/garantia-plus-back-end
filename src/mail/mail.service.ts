require('dotenv').config();
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, content: string) {
    try {
      await this.transporter.sendMail({
        from: `Suporte Garantia+ <${process.env.MAILER_EMAIL}>`,
        to,
        subject,
        html: `
        <html>
          <body>
            ${content}
            <br />
            <p>Garantia+</p>
          </body>
        </html>
        `,
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao enviar e-mail');
    }
  }
}
