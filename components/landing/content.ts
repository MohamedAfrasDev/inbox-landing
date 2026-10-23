export const PRODUCT_NAME = "Inbox"

export const painPoints = [
  "A buyer asked for the price at 9pm. You saw it the next afternoon.",
  "You've typed the same delivery and stock answer again and again this week.",
  "You said “I’ll check and tell you.” Then you never did.",
  "Your teammate thought you replied. You thought they did.",
  "Customers write in Sinhala, Tamil, English, or all three in one message.",
]

export const features = [
  {
    icon: "list",
    title: "Know who to reply to first",
    body: "Stop opening chats one by one. Buyers ready to order and overdue follow-ups rise to the top.",
  },
  {
    icon: "inbox",
    title: "Everything in one place",
    body: "WhatsApp and Instagram in a single inbox, so nothing gets lost between apps.",
  },
  {
    icon: "tags",
    title: "Spot orders, not noise",
    body: "Every chat is labelled automatically: price question, delivery, ready to order, repeat customer, spam.",
  },
  {
    icon: "pen",
    title: "Reply in seconds, in your voice",
    body: "Get a draft that sounds like you. Edit it if you like, then send. Nothing goes out without your tap.",
  },
  {
    icon: "languages",
    title: "Works the way Sri Lanka chats",
    body: "Sinhala, Tamil, English and mixed-language messages are handled.",
  },
  {
    icon: "bell",
    title: "Never drop a follow-up",
    body: "Chats that still need action stay visible until you’ve dealt with them.",
  },
] as const

export const steps = [
  { title: "Connect", body: "Link your WhatsApp and Instagram business accounts." },
  { title: "See", body: "All your chats arrive in one inbox." },
  { title: "Focus", body: "Start with the labelled conversations that need you now." },
  { title: "Approve", body: "Review the drafted reply, edit if you like, and send." },
]

export const audiences = [
  "Instagram clothing shops",
  "Gift and custom-order sellers",
  "Beauty and skincare sellers",
  "Home-based brands",
  "Small teams sharing one number",
]

export const faqs = [
  {
    q: `What is ${PRODUCT_NAME}?`,
    a: "One inbox for your WhatsApp and Instagram chats. It shows you who to reply to first, labels every chat, and drafts replies in your style.",
  },
  {
    q: "Will it send messages without asking me?",
    a: "No. You approve every message before it goes out.",
  },
  {
    q: "Which channels will it work with?",
    a: "WhatsApp and Instagram first.",
  },
  {
    q: "Does it understand Sinhala and Tamil?",
    a: "Yes, along with English and mixed-language messages.",
  },
  {
    q: "Who is it for?",
    a: "Sellers and small teams who take orders through chat.",
  },
  {
    q: "Why join the waitlist now?",
    a: "Early members get first access and priority setup, and help decide what we build first.",
  },
]
