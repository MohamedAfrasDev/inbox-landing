export const PRODUCT_NAME = "Inbox"

export const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Control", href: "#control" },
  { label: "FAQ", href: "#faq" },
]

export const problemPoints = [
  { icon: "layers", text: "Enquiries land in three apps." },
  { icon: "filter", text: "Spam and jokes look the same as buyers." },
  { icon: "clock", text: "A late reply is a lost sale." },
] as const

export const jobs = [
  {
    title: "Everything in one place",
    body: "Messenger, Instagram and WhatsApp chats land in one inbox. The same customer on two apps shows up as one person, so you see their whole history.",
    caption: "All channels, one list",
    alt: "The inbox chat list with a small channel badge on each customer.",
    crop: { x: 120, y: 285, w: 580, h: 520 },
  },
  {
    title: "Know who to answer first",
    body: "Chats are ranked by buying signal. Ready to buy comes first, general questions next, and jokes are moved aside, not deleted. It tells you why each chat is ranked where it is.",
    caption: "Ranked by buying signal",
    alt: "Inbox filters and two chats tagged Ready to buy and From ad.",
    crop: { x: 130, y: 180, w: 565, h: 415 },
  },
  {
    title: "Replies that sound like you",
    body: "It learns from how you already answer and drafts the next reply for you to send or edit. At the start it asks you to hold more conversations first, so it can learn your style before drafting.",
    caption: "Drafts in your style",
    alt: "A suggested reply with Use, Edit and Regenerate buttons.",
    crop: { x: 810, y: 500, w: 800, h: 460 },
  },
]

export const controlPoints = [
  {
    icon: "eye",
    text: "Mark each detail Public or Private. Cost price stays private, and the assistant never receives it.",
  },
  {
    icon: "moon",
    text: "Turn autopilot on only after hours, or only on one app.",
  },
  {
    icon: "flask",
    text: "Test it yourself first. Ask it questions and see exactly what it would answer.",
  },
] as const

export const steps = [
  {
    title: "Connect your apps.",
    body: "Messenger and Instagram first. WhatsApp has extra steps, and we walk you through them.",
  },
  {
    title: "Add what customers ask about.",
    body: "Upload your product list or paste a sheet. Mark which details are public and which are private.",
  },
  {
    title: "Test it, then switch it on.",
    body: "Ask it questions yourself. When you are happy, turn on autopilot for after hours only.",
  },
]

export const limits = [
  "It does not take orders or payments.",
  "It does not confirm stock or promise a discount. It hands those to you.",
  "It does not pretend to be you. Customers are told it is an AI assistant.",
  "It does not reply to everything. When it is unsure, it holds the customer and tells you.",
  "It cannot draft in your voice on day one. It needs your past chats first.",
]

export const faqs = [
  {
    q: "Can it take orders?",
    a: "No. It answers common questions, holds the customer and hands over to you.",
  },
  {
    q: "Will it share my cost price?",
    a: "Only fields you mark Public are ever given to it. Private fields are not sent.",
  },
  {
    q: "Does it work with my WhatsApp number?",
    a: "Maybe. WhatsApp needs a business account and some numbers cannot be moved. We tell you before you start.",
  },
  {
    q: "How much does it cost?",
    a: "Not decided yet. People on the waitlist see the price before paying anything.",
  },
  {
    q: "Does it understand Sinhala and Tamil?",
    a: "We are still settling exactly what version 1 supports. We will tell you the full list before you connect anything.",
  },
  {
    q: "What happens to my customers' chats?",
    a: "We are finalising the privacy settings. Before you connect an app we will tell you what is stored, for how long, and who can see it.",
  },
]
