import { RegistrationRecord } from "@/types/registration";

export function renderAdminEmailHtml(reg: Partial<RegistrationRecord>): string {
  const createdDate = reg.createdAt ? new Date(reg.createdAt).toUTCString() : new Date().toUTCString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New ADYK Inspire Registration</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border: 1px solid #262626; border-radius: 8px; overflow: hidden; max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; border-bottom: 1px solid #1f1f1f;">
              <div style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a8a8a; margin-bottom: 4px;">
                ADYK • A Multi-Venture Technology Company
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">
                New ADYK Inspire Registration
              </h1>
              <div style="font-size: 12px; color: #666666; margin-top: 6px;">
                Registration ID: <span style="font-family: monospace; color: #ededed;">${reg.id || "Pending"}</span>
              </div>
            </td>
          </tr>

          <!-- Content Details -->
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; width: 160px; vertical-align: top;">Full Name:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; font-weight: 500; vertical-align: top;">${reg.fullName || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Email:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;"><a href="mailto:${reg.email}" style="color: #ffffff; text-decoration: underline;">${reg.email || "N/A"}</a></td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">WhatsApp:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;"><a href="https://wa.me/${(reg.whatsapp || "").replace(/[^\d]/g, "")}" style="color: #ffffff; text-decoration: underline;">${reg.whatsapp || "N/A"}</a></td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Location:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;">${reg.location || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Age Group:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;">${reg.ageGroup || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Role:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; font-weight: 500; vertical-align: top;">${reg.role || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Interests:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;">${(reg.interests || []).join(", ") || "None"}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Has Idea:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; font-weight: 600; vertical-align: top;">${reg.hasIdea || "N/A"}</td>
                </tr>
                ${
                  reg.ideaDescription
                    ? `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Idea Description:</td>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #ededed; line-height: 1.5; background-color: #121212; padding: 12px; border-radius: 4px; border: 1px solid #222222; vertical-align: top;">${reg.ideaDescription}</td>
                </tr>`
                    : ""
                }
                ${
                  reg.explorationDescription
                    ? `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Exploration Interest:</td>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #ededed; line-height: 1.5; background-color: #121212; padding: 12px; border-radius: 4px; border: 1px solid #222222; vertical-align: top;">${reg.explorationDescription}</td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Looking For:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;">${(reg.lookingFor || []).join(", ") || "None specified"}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Contact Preference:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;">${reg.contactPreference || "Either"}</td>
                </tr>
                ${
                  reg.linkedin
                    ? `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">LinkedIn:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;"><a href="${reg.linkedin}" style="color: #ffffff; text-decoration: underline;">${reg.linkedin}</a></td>
                </tr>`
                    : ""
                }
                ${
                  reg.github
                    ? `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">GitHub / Portfolio:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;"><a href="${reg.github}" style="color: #ffffff; text-decoration: underline;">${reg.github}</a></td>
                </tr>`
                    : ""
                }
                ${
                  reg.website
                    ? `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Website:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; vertical-align: top;"><a href="${reg.website}" style="color: #ffffff; text-decoration: underline;">${reg.website}</a></td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #8a8a8a; vertical-align: top;">Submitted At:</td>
                  <td style="padding-bottom: 16px; font-size: 13px; color: #666666; vertical-align: top;">${createdDate}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #000000; border-top: 1px solid #1f1f1f; text-align: center;">
              <div style="font-size: 12px; color: #666666; letter-spacing: 0.1em; text-transform: uppercase;">
                LEARN • BUILD • SHARE • INSPIRE
              </div>
              <div style="font-size: 11px; color: #444444; margin-top: 8px;">
                ADYK Inspire Automated System • Primary contact: +91 8870605699
              </div>
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
