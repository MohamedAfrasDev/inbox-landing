import nodemailer from "nodemailer"
import type { DetailsEntry, Source } from "@/lib/waitlist"

export type MailResult = { ok: true } | { ok: false }

type Config = {
  host: string
  port: number
  user: string
  pass: string
  from: string
  notify: string
}

function readConfig(): Config | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, WAITLIST_NOTIFY_EMAIL } =
    process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !WAITLIST_NOTIFY_EMAIL) {
    return null
  }
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM,
    notify: WAITLIST_NOTIFY_EMAIL,
  }
}

type Message = { to: string; subject: string; text: string; html: string }

// Returns false when mail cannot be sent. Without SMTP settings, development logs the
// message instead so the form still works locally; production reports failure.
async function send(message: Message): Promise<boolean> {
  const config = readConfig()
  if (!config) {
    if (process.env.NODE_ENV === "production") {
      console.error("Mail is not configured: set the SMTP_* and MAIL_FROM variables.")
      return false
    }
    console.info(`[mail disabled] to=${message.to} subject=${message.subject}\n${message.text}`)
    return true
  }
  try {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    })
    await transport.sendMail({ from: config.from, ...message })
    return true
  } catch (error) {
    console.error("Sending mail failed:", error)
    return false
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function notifyAddress(): string {
  return process.env.WAITLIST_NOTIFY_EMAIL ?? "waitlist@localhost"
}

// The only record of a sign-up until a database is added, so a failure here fails the join.
export async function sendSignupNotification(email: string, source: Source): Promise<MailResult> {
  const lines = [
    `New waitlist sign-up: ${email}`,
    `Source: ${source.utm_source ?? "none"}`,
    `Medium: ${source.utm_medium ?? "none"}`,
    `Campaign: ${source.utm_campaign ?? "none"}`,
    `Time: ${new Date().toISOString()}`,
  ]
  const ok = await send({
    to: notifyAddress(),
    subject: `Waitlist: ${email}`,
    text: lines.join("\n"),
    html: lines.map((l) => `<p>${escapeHtml(l)}</p>`).join(""),
  })
  return ok ? { ok: true } : { ok: false }
}

export async function sendDetailsNotification(
  email: string,
  details: DetailsEntry,
): Promise<MailResult> {
  const lines = [
    `Step 2 answers from ${email}`,
    `Sells: ${details.sells ?? "not answered"}`,
    `Messaged most on: ${details.channel ?? "not answered"}`,
    `WhatsApp: ${details.whatsapp ?? "not given"}`,
  ]
  const ok = await send({
    to: notifyAddress(),
    subject: `Waitlist details: ${email}`,
    text: lines.join("\n"),
    html: lines.map((l) => `<p>${escapeHtml(l)}</p>`).join(""),
  })
  return ok ? { ok: true } : { ok: false }
}

// Best effort: the person is already on the list, so this never fails the sign-up.
export async function sendWelcomeEmail(email: string): Promise<void> {
  const text = [
    "You are on the waitlist.",
    "",
    "We will email you when your spot opens. It is free to join and we never ask for a card.",
    "",
    "We use your email only for this waitlist.",
  ].join("\n")
  await send({
    to: email,
    subject: "You are on the waitlist",
    text,
    html: text
      .split("\n\n")
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join(""),
  })
}
