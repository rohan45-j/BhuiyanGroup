import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const inquiriesFilePath = path.join(process.cwd(), "src", "data", "inquiries.json");

function readInquiries() {
  try {
    if (!fs.existsSync(inquiriesFilePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(inquiriesFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to read inquiries:", error);
    return [];
  }
}

function writeInquiries(data: unknown[]) {
  try {
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to write inquiries:", error);
    return false;
  }
}

export async function GET() {
  const inquiries = readInquiries();
  return NextResponse.json(inquiries, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiries = readInquiries();

    const newInquiry = {
      id: "inq-" + Date.now(),
      name: body.name || "Anonymous Visitor",
      organization: body.organization || "",
      email: body.email || "",
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      concern: body.concern || "Bhuiyan Group Corporate",
      message: body.message || "",
      status: "unread",
      createdAt: new Date().toISOString(),
    };

    const updated = [newInquiry, ...inquiries];
    const success = writeInquiries(updated);

    if (!success) {
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    // Attempt SMTP Notification asynchronously if enabled
    try {
      const configPath = path.join(process.cwd(), "src", "data", "siteConfig.json");
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        if (config?.smtp?.enabled && config.smtp?.host && config.smtp?.user && config.smtp?.pass) {
          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.createTransport({
            host: config.smtp.host.trim(),
            port: Number(config.smtp.port) || 587,
            secure: Boolean(config.smtp.secure) || Number(config.smtp.port) === 465,
            auth: {
              user: config.smtp.user.trim(),
              pass: config.smtp.pass.trim(),
            },
            tls: { rejectUnauthorized: false },
          });

          const recipient = config.smtp.receiverEmail || config.general?.email || config.smtp.user;
          const sender = `"${config.smtp.fromName || "Bhuiyan Group Inquiries"}" <${config.smtp.fromEmail || config.smtp.user}>`;

          transporter.sendMail({
            from: sender,
            to: recipient,
            subject: `🔔 New Inquiry: ${newInquiry.subject} (${newInquiry.name})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <div style="background: #0F2557; color: white; padding: 14px 20px; border-radius: 6px; margin-bottom: 16px;">
                  <h3 style="margin: 0; font-size: 18px;">New Website Corporate Inquiry</h3>
                  <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">Received via Bhuiyan Group Portal</p>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr><td style="padding: 8px 0; font-weight: bold; width: 130px;">Name:</td><td>${newInquiry.name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Organization:</td><td>${newInquiry.organization || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${newInquiry.email}">${newInquiry.email}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${newInquiry.phone}">${newInquiry.phone}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Concern:</td><td>${newInquiry.concern}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td>${newInquiry.subject}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td style="background: #f8fafc; padding: 10px; border-radius: 4px;">${newInquiry.message || "No message provided."}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Date / Time:</td><td>${new Date().toLocaleString()}</td></tr>
                </table>
              </div>
            `,
          }).catch((err) => console.error("SMTP sending error:", err));
        }
      }
    } catch (e) {
      console.error("SMTP check failed:", e);
    }

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const inquiries = readInquiries();
    const updated = inquiries.map((item: { id: string; status: string }) => {
      if (item.id === id) {
        return { ...item, status: status || "read" };
      }
      return item;
    });

    writeInquiries(updated);
    return NextResponse.json({ success: true, inquiries: updated });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    const inquiries = readInquiries();
    const updated = inquiries.filter((item: { id: string }) => item.id !== id);
    writeInquiries(updated);
    return NextResponse.json({ success: true, inquiries: updated });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
