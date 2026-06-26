import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set. Configure it in your environment variables.');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const NOTIFICATION_EMAIL = 'Decolow@icloud.com';
// Until a custom domain is verified with Resend, emails are sent from onboarding@resend.dev.
// Once the domain is set up, update this to your verified sender address.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Clutch Competitions <onboarding@resend.dev>';

export async function sendOrderNotification({
  customerName,
  customerEmail,
  competitionTitle,
  quantity,
  totalPence,
  orderId,
}: {
  customerName: string;
  customerEmail: string;
  competitionTitle: string;
  quantity: number;
  totalPence: number;
  orderId: string;
}) {
  const total = `£${(totalPence / 100).toFixed(2)}`;
  const resend = getResend();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject: `New Order: ${quantity} tickets for ${competitionTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">New Ticket Purchase</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280;">Order ID</td><td style="padding: 8px 0; font-weight: bold;">${orderId}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Customer</td><td style="padding: 8px 0; font-weight: bold;">${customerName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;">${customerEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Competition</td><td style="padding: 8px 0; font-weight: bold;">${competitionTitle}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Tickets</td><td style="padding: 8px 0; font-weight: bold;">${quantity}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Total</td><td style="padding: 8px 0; font-weight: bold; color: #10b981;">${total}</td></tr>
        </table>
      </div>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `Your Clutch Competitions order confirmation — ${competitionTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Order Confirmed!</h2>
        <p>Hi ${customerName},</p>
        <p>Thanks for your purchase! Here are your order details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280;">Competition</td><td style="padding: 8px 0; font-weight: bold;">${competitionTitle}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Tickets</td><td style="padding: 8px 0; font-weight: bold;">${quantity}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Total Paid</td><td style="padding: 8px 0; font-weight: bold; color: #10b981;">${total}</td></tr>
        </table>
        <p style="margin-top: 24px;">Good luck! You'll be notified if you're the winner.</p>
        <p style="color: #6b7280; font-size: 14px;">— Clutch Competitions</p>
      </div>
    `,
  });
}
