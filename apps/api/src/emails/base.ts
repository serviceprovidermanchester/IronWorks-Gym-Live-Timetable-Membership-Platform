/**
 * Base Email Layout & Styling Helpers
 * IronWorks Gym · SPManchester Private Limited
 */

export const brandColors = {
  bg: '#020617',
  surface: '#0f172a',
  surface2: '#1e293b',
  border: '#334155',
  brand: '#ff5500',
  brandLight: '#ff7733',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  green: '#22c55e',
  red: '#ef4444',
  amber: '#f59e0b',
};

export function emailLayout({
  title,
  preheader,
  content,
}: {
  title: string;
  preheader?: string;
  content: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: ${brandColors.bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${brandColors.text}; }
    table { border-collapse: collapse; }
    img { border: 0; display: block; outline: none; }
    .btn { display: inline-block; background-color: ${brandColors.brand}; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.05em; text-align: center; }
  </style>
</head>
<body style="background-color: ${brandColors.bg}; margin: 0; padding: 24px 0;">
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: ${brandColors.surface}; border-radius: 14px; border: 1px solid ${brandColors.border}; overflow: hidden; margin: 0 16px;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid ${brandColors.surface2};">
              <div style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.02em; text-transform: uppercase;">
                IRON<span style="color: ${brandColors.brand};">WORKS</span>
              </div>
              <div style="font-size: 11px; color: ${brandColors.textMuted}; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px;">
                Flagship Ancoats · Manchester
              </div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: ${brandColors.bg}; border-top: 1px solid ${brandColors.surface2}; text-align: center; font-size: 11px; color: ${brandColors.textDim}; line-height: 1.6;">
              <p style="margin: 0 0 8px 0;">
                IronWorks Gym · Flagship Ancoats, Manchester M4 6DE<br/>
                Open Daily: Mon–Fri 05:30–23:00 · Sat–Sun 07:00–21:00
              </p>
              <p style="margin: 0;">
                Built by SPManchester Private Limited · <a href="https://www.spmanchester.com" style="color: ${brandColors.brand}; text-decoration: none;">www.spmanchester.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
