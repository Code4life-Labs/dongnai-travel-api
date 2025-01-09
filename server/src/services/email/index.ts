import nodemailer from "nodemailer";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import AppConfig
import AppConfig from "src/app.config.json";

type EmailContent = {
  isHTML: boolean;
  content: string;
};

/**
 * A class user to standardize email sender
 */
export class EmailService {
  private _from!: string;
  private _transporter!: nodemailer.Transporter;

  constructor() {
    this._from = AppConfig.email;
    this._transporter = nodemailer.createTransport({
      host: AppConfig.emailServer.host,
      port: AppConfig.emailServer.port,
      auth: {
        user: AppConfig.emailServer.username,
        pass: AppConfig.emailServer.password,
      },
    } as any);
  }

  /**
   * Use to send
   * @param to
   * @param subject
   * @param content
   */
  async sendEmail(
    to: Array<string> | string,
    subject: string,
    content: EmailContent
  ) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      if (typeof to !== "string" && Array.isArray(to))
        throw new Error(
          "Error: Email service - `to` must be a string or array of string"
        );

      const emailOptions = {
        from: this._from,
        to: Array.isArray(to) ? to.join(",") : to,
        subject,
      } as any;

      // Check content
      if (content.isHTML) emailOptions.html = content.content;
      else emailOptions.text = content.content;

      return this._transporter.sendMail(emailOptions);
    });
  }
}

export const emailService = new EmailService();
