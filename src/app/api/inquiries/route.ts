import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function resolveDataPath(filename: string): string {
  const candidates = [
    path.join(process.cwd(), "src", "data", filename),
    path.join(process.cwd(), "bhuiyangroup-bd", "src", "data", filename),
    path.resolve(process.cwd(), "src/data", filename),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

import { getRuntimeInquiries, saveRuntimeInquiries } from "@/lib/runtimeConfig";

function readInquiries() {
  return getRuntimeInquiries();
}

function writeInquiries(data: unknown[]) {
  return saveRuntimeInquiries(data as any[]);
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

    // Attempt SMTP Notification if configured
    try {
      const configPath = resolveDataPath("siteConfig.json");
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        const hasCredentials = Boolean(
          config?.smtp?.host?.trim() &&
          config?.smtp?.user?.trim() &&
          config?.smtp?.pass?.trim()
        );

        if (hasCredentials) {
          const nodemailer = await import("nodemailer");
          const port = Number(config.smtp.port) || 587;
          const isSecure = Boolean(config.smtp.secure) || port === 465;

          const transporter = nodemailer.createTransport({
            host: config.smtp.host.trim(),
            port: port,
            secure: isSecure,
            auth: {
              user: config.smtp.user.trim(),
              pass: config.smtp.pass.trim(),
            },
            tls: { rejectUnauthorized: false },
            connectionTimeout: 12000,
            greetingTimeout: 12000,
          });

          const recipient = config.smtp.receiverEmail || config.general?.email || config.smtp.user;
          const sender = `"${config.smtp.fromName || "Bhuiyan Group Inquiries"}" <${config.smtp.fromEmail || config.smtp.user}>`;

          try {
            await transporter.sendMail({
              from: sender,
              to: recipient,
              replyTo: newInquiry.email || undefined,
              subject: `🔔 New Corporate Inquiry: ${newInquiry.subject} (${newInquiry.name})`,
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
                    <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td style="background: #f8fafc; padding: 10px; border-radius: 4px; white-space: pre-wrap;">${newInquiry.message || "No message provided."}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold;">Date / Time:</td><td>${new Date().toLocaleString()}</td></tr>
                  </table>
                </div>
              `,
            });
            console.log(`[SMTP] Successfully forwarded inquiry email to ${recipient}`);
          } catch (mailErr) {
            console.error("[SMTP] Error sending notification email:", mailErr);
          }
        } else {
          console.log("[SMTP] Automated forwarding skipped - SMTP credentials incomplete in siteConfig.json");
        }
      } else {
        console.warn(`[SMTP] configPath not found: ${configPath}`);
      }
    } catch (e) {
      console.error("[SMTP] Check failed:", e);
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
