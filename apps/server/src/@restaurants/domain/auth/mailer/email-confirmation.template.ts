interface EmailConfirmationTemplateData {
  name: string
  confirmationUrl: string
}

export class EmailConfirmationTemplate {
  static render({ name, confirmationUrl }: EmailConfirmationTemplateData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.5;
              color: #333;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
            }
            .title {
              color: #4a5568;
              margin-bottom: 20px;
            }
            .link {
              color: #4a5568;
              text-decoration: underline;
              font-weight: 500;
            }
            .footer {
              margin-top: 30px;
              color: #718096;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="title">Welcome, ${name}!</h1>
            <p>Please confirm your email address by clicking the link below:</p>
            <p>
              <a href="${confirmationUrl}" class="link">Confirm Email Address</a>
            </p>
            <p style="color: #718096; font-size: 14px;">
              If you didn't create this account, you can safely ignore this email.
            </p>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
}
