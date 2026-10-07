export function renderConfirmationEmailHtml(fullName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to ADYK Inspire</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border: 1px solid #222222; border-radius: 8px; overflow: hidden; max-width: 560px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 20px; border-bottom: 1px solid #1a1a1a;">
              <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a8a8a; margin-bottom: 8px;">
                ADYK • A MULTI-VENTURE TECHNOLOGY COMPANY
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                ADYK INSPIRE
              </h1>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 36px; line-height: 1.6; font-size: 15px; color: #cccccc;">
              <p style="margin-top: 0; font-size: 16px; color: #ffffff; font-weight: 500;">
                Hi ${fullName},
              </p>
              <p>
                Thank you for joining <strong>ADYK Inspire</strong>.
              </p>
              <p>
                We've received your registration successfully.
              </p>
              <p>
                ADYK Inspire is an open community for students, developers, creators, founders, entrepreneurs and technology enthusiasts to learn, build, share ideas and grow together.
              </p>
              <p>
                The ADYK team will review your submission and will be in touch with you when there is an opportunity to connect and collaborate.
              </p>
              
              <div style="margin: 32px 0; padding: 20px; background-color: #0f0f0f; border-left: 2px solid #ffffff; font-size: 13px; color: #ffffff; letter-spacing: 0.12em; text-transform: uppercase;">
                LEARN. BUILD. SHARE. INSPIRE.
              </div>

              <div style="margin-top: 36px; border-top: 1px solid #1a1a1a; padding-top: 24px; font-size: 13px; color: #8a8a8a;">
                <div style="color: #ffffff; font-weight: 600; margin-bottom: 4px;">ADYK</div>
                <div>A Multi-Venture Technology Company</div>
                <div style="margin-top: 12px;">
                  WhatsApp: <a href="https://wa.me/918870605699" style="color: #ffffff; text-decoration: underline;">+91 8870605699</a>
                </div>
                <div>
                  Email: <a href="mailto:adykcompany.in@gmail.com" style="color: #ffffff; text-decoration: underline;">adykcompany.in@gmail.com</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #000000; border-top: 1px solid #1a1a1a; text-align: center; font-size: 11px; color: #555555;">
              © 2026 ADYK. All rights reserved. • This is an automated confirmation of your join-list registration.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
