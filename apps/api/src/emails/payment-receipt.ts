import { emailLayout, brandColors } from './base';

export interface PaymentReceiptProps {
  name: string;
  amount: string;
  date: string;
  invoiceId: string;
  planName?: string;
  downloadUrl?: string;
}

export function renderPaymentReceipt({
  name,
  amount,
  date,
  invoiceId,
  planName = 'IronWorks Gym Membership',
  downloadUrl,
}: PaymentReceiptProps): string {
  const content = `
    <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Payment Receipt</h1>
    <p style="font-size: 15px; color: ${brandColors.textMuted}; line-height: 1.6; margin: 0 0 24px 0;">
      Hi ${name}, thank you for your payment. Here are the details of your transaction:
    </p>

    <div style="background-color: ${brandColors.surface2}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid ${brandColors.border};">
      <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
        <tr>
          <td style="color: ${brandColors.textMuted};">Invoice Number:</td>
          <td align="right" style="font-family: monospace; font-weight: 700; color: #ffffff;">${invoiceId}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Description:</td>
          <td align="right" style="color: #ffffff;">${planName}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Date of Payment:</td>
          <td align="right" style="color: #ffffff;">${date}</td>
        </tr>
        <tr style="border-top: 1px solid ${brandColors.border};">
          <td style="color: ${brandColors.textMuted}; font-weight: 700; padding-top: 10px;">Amount Paid:</td>
          <td align="right" style="font-size: 18px; font-weight: 900; color: ${brandColors.green}; padding-top: 10px;">${amount}</td>
        </tr>
        <tr>
          <td style="color: ${brandColors.textMuted};">Status:</td>
          <td align="right" style="font-weight: 700; color: ${brandColors.green};">Paid in Full ✓</td>
        </tr>
      </table>
    </div>

    ${downloadUrl ? `
      <div style="text-align: center; margin: 28px 0;">
        <a href="${downloadUrl}" class="btn" style="display: inline-block; background-color: ${brandColors.surface2}; color: #ffffff; border: 1px solid ${brandColors.border}; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px;">Download PDF Invoice</a>
      </div>
    ` : ''}

    <p style="font-size: 12px; color: ${brandColors.textDim}; line-height: 1.5; margin: 20px 0 0 0;">
      VAT Reg: GB 492 8812 01 · IronWorks Gym (SPManchester Private Limited). Retain this receipt for personal records or wellness expense claims.
    </p>
  `;

  return emailLayout({
    title: `Payment Receipt ${invoiceId} — IronWorks Gym`,
    preheader: `Receipt for ${amount} paid on ${date}. Invoice: ${invoiceId}`,
    content,
  });
}
