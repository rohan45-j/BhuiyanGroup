import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { host, port, secure, user, pass, fromEmail, fromName, receiverEmail } = body;

    if (!host || !port || !user || !pass) {
      return NextResponse.json(
        { success: false, error: "SMTP Host, Port, Username and Password are required." },
        { status: 400 }
      );
    }

    const testRecipient = receiverEmail || user;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: host.trim(),
      port: Number(port) || 587,
      secure: Boolean(secure) || Number(port) === 465,
      auth: {
        user: user.trim(),
        pass: pass.trim(),
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
    });

    // Verify SMTP connection handshake
    await transporter.verify();

    // Send verification email
    const sender = `"${fromName || "Bhuiyan Group Engineering"}" <${fromEmail || user}>`;
    await transporter.sendMail({
      from: sender,
      to: testRecipient,
      subject: "✅ Bhuiyan Group SMTP Test Verification",
      text: `Hello,\n\nYour Bhuiyan Group SMTP email server configuration has been verified successfully!\n\nHost: ${host}\nPort: ${port}\nSecure SSL: ${Boolean(secure) || Number(port) === 465}\nTimestamp: ${new Date().toLocaleString()}\n\nInquiries submitted through the website will now be forwarded to your inbox.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <div style="background: #0F2557; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">Bhuiyan Group SMTP Connected</h2>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">Official Infrastructure Mail Verification</p>
          </div>
          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: #065f46; margin: 0; font-weight: 600; font-size: 14px;">
              ✓ Handshake and authentication completed successfully!
            </p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #334155;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600; width: 140px;">SMTP Host</td>
              <td style="padding: 10px 0; font-family: monospace;">${host}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600;">Port / SSL</td>
              <td style="padding: 10px 0; font-family: monospace;">${port} (${Boolean(secure) || Number(port) === 465 ? "SSL/TLS" : "STARTTLS"})</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600;">Sender Identity</td>
              <td style="padding: 10px 0;">${sender}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: 600;">Recipient Inbox</td>
              <td style="padding: 10px 0;">${testRecipient}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600;">Verified Time</td>
              <td style="padding: 10px 0;">${new Date().toUTCString()}</td>
            </tr>
          </table>
          <p style="color: #64748b; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            This is an automated verification email triggered from the Bhuiyan Group Admin Console.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Connection verified! Test email successfully sent to ${testRecipient}.`,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "SMTP Connection Error";
    console.error("SMTP Test Failure:", error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
