// Central sample data for the Nebula portfolio.
// Everything the site renders is sourced from here.

export const profile = {
  name: "Fuyad Hasan Fahim",
  initials: "FF",
  role: "Full Stack Developer",
  focus: "AI Integration · Internal Tools",
  location: "Dhaka, Bangladesh",
  email: "codewithfuyad@gmail.com",
  blurb:
    "I design and ship systems that think — live AI support, queue-based infrastructure, and multi-tenant platforms built to scale without breaking.",
  socials: [
    { label: "GitHub", href: "https://github.com/fuyadhasanfahim" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/codewithfuyad" },
    { label: "X / Twitter", href: "https://x.com/fuyad4dev" },
    { label: "Facebook", href: "https://www.facebook.com/fuyadhasanfahim" },
    { label: "Instagram", href: "https://www.instagram.com/codewithfuyad" },
    { label: "Email", href: "mailto:codewithfuyad@gmail.com" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;


// ============================================================
// Projects — generated from the real repositories on disk.
// Tier 1: featured case studies. Tier 2: selected live builds.
// ============================================================

export type FeaturedProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  metric?: { value: string; label: string };
  problem: string;
  approach: string;
  architecture: string;
  features: string[];
  result: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** cover accent used by the card UI */
  accent: "lime" | "violet" | "teal";
  featured: true;
};

export type SelectedBuild = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  complexity: number; // 1-10, used for ordering (desc)
  category?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "hr-management-system",
    title: "HR Management System",
    category: "Internal Tools",
    // TODO: confirm year. Built across 2024-2025 at WebBriks.
    year: "2024 – 2025",
    role: "Full Stack Developer",
    summary:
      "An ERP and HR platform for an agency: attendance, payroll, clients, invoicing, quotations, projects, and an AI-assisted support desk.",
    metric: {
      value: "50+",
      label: "data models across HR, finance and CRM",
    },
    problem:
      "WebBriks ran HR, finance, sales, and client delivery across spreadsheets and disconnected tools. There was no single system for attendance, payroll, invoicing, leads, or client support, and no shared source of truth across teams.",
    approach:
      "Built a monorepo platform with a shared Express and MongoDB backend serving several Next.js apps (auth, dashboard, support, public site). Modeled the business as roughly fifty Mongoose collections exposed through role-scoped REST routes, with real-time updates over Socket.io.",
    architecture:
      "Express and TypeScript API with Mongoose over MongoDB. Better Auth and JWT for authentication, Redis with BullMQ for background jobs, a transactional outbox collection for reliable payment events, AWS S3 (presigned uploads) and Cloudinary for files, Stripe and PayPal for billing, Puppeteer and react-pdf for documents, and Sentry plus pino for monitoring. Frontends are Next.js App Router apps using Redux Toolkit (RTK Query).",
    features: [
      "Attendance with shift assignments, shift-off dates, and event-level logs",
      "Payroll with salary history, adjustments, bank settings, and month locking",
      "Leave applications and balances, notices, and company policies",
      "Client, service, order, invoice, and quotation management with PDF export",
      "Profit distribution and transfers across shareholders, plus expense and wallet ledgers",
      "Leads, lead activity, meetings, and consultations",
      "Stripe and PayPal billing with a transactional outbox for reliable payment events",
      "AI chat (Google Gemini) and a live support desk with tickets and real-time messaging",
      "Excel and CSV import and export, audit logs, and email notifications",
    ],
    result:
      "One platform replaced the spreadsheet workflows for HR, payroll, finance, sales, and client support, with real-time updates and role-based access across internal teams.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Better Auth",
      "Socket.io",
      "Redis",
      "BullMQ",
      "AWS S3",
      "Cloudinary",
      "Stripe",
      "PayPal",
      "Google Gemini",
      "Redux Toolkit",
      "Sentry",
      "Tailwind CSS",
    ],
    accent: "lime",
    featured: true,
  },
  {
    slug: "webbriks",
    title: "WebBriks Platform",
    category: "Platform",
    // TODO: confirm year.
    year: "2024",
    role: "Backend Developer",
    summary:
      "The WebBriks corporate platform: a public site with a floating AI chat widget that hands visitors off to live human support agents in real time.",
    metric: { value: "Real-time", label: "AI to human chat handoff" },
    problem:
      "WebBriks needed its public website to capture and support visitors directly, with an AI assistant that could answer first and escalate to a human agent without losing context.",
    approach:
      "Built the public Next.js site with a floating chat widget backed by the shared Express and MongoDB server. Visitor sessions, guests, and messages are persisted, and Socket.io carries live messaging between visitors and a dedicated support agent app.",
    architecture:
      "Next.js (App Router) public site with Socket.io-client, GSAP and Lenis for motion, and Swiper. A separate Next.js support app for agents. Shared Express, TypeScript, and MongoDB backend with chat-session, chat-message, guest, ticket, and ai-conversation collections, Google Gemini for AI replies, and AWS S3 and Cloudinary for media.",
    features: [
      "Floating AI chat widget on the public site",
      "AI first-response using Google Gemini with conversation history",
      "Real-time visitor-to-agent handoff over Socket.io",
      "Dedicated support agent app with tickets and ticket messages",
      "Guest and session tracking for anonymous visitors",
      "Animated marketing site built with GSAP, Lenis, and Swiper",
    ],
    result:
      "Visitors get instant AI answers on the marketing site and can be escalated to a live agent in the same conversation, all on the shared WebBriks backend.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Google Gemini",
      "GSAP",
      "Lenis",
      "AWS S3",
      "Cloudinary",
      "Tailwind CSS",
    ],
    accent: "violet",
    featured: true,
  },
  {
    slug: "lead-portal",
    title: "Lead Portal",
    category: "Sales",
    // TODO: confirm year.
    year: "2025",
    role: "Full Stack Developer",
    summary:
      "A lead management and CRM tool for the WebBriks sales team: import, assign, and track leads, with cold-calling tasks and team analytics.",
    metric: { value: "Excel / CSV", label: "bulk lead import to pipeline" },
    problem:
      "The sales team tracked leads and cold-calling across spreadsheets, with no assignment, status tracking, or visibility into team performance.",
    approach:
      "Built a full-stack CRM with an Express and MongoDB backend and a Next.js dashboard. Leads import from Excel or CSV, get grouped and assigned, and move through status stages, while cold-calling tasks track team activity.",
    architecture:
      "Express, TypeScript, and MongoDB (Mongoose) API with JWT auth and refresh tokens, Socket.io notifications, node-cron jobs, and Excel and CSV parsing. Next.js App Router client with Redux Toolkit, redux-persist, and Recharts.",
    features: [
      "Lead import from Excel and CSV with color-coded groups",
      "Bulk assignment and status tracking (new, interested, call-back, on-board)",
      "Cold-calling task creation, assignment, and progress tracking",
      "Role-based access control and email team invitations",
      "Activity history with notes and due dates",
      "Real-time notifications over Socket.io and analytics dashboards",
    ],
    result:
      "Replaced spreadsheet lead tracking with a single assigned pipeline, task tracking, and per-member performance analytics.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Socket.io",
      "Redux Toolkit",
      "Recharts",
      "Tailwind CSS",
    ],
    accent: "teal",
    featured: true,
  },
  {
    slug: "client-portal",
    title: "Client Portal",
    category: "Internal Tools",
    // TODO: confirm year.
    year: "2025",
    role: "Full Stack Developer",
    summary:
      "A client-facing portal for orders, quotes, payments, and file delivery, with revisions, refunds, and a payment ledger.",
    metric: { value: "End-to-end", label: "order, payment and file delivery" },
    problem:
      "Clients had no single place to request quotes, pay, track revisions, and receive delivered files, and the team had no structured record of payments and refunds.",
    approach:
      "Built a Next.js portal on an Express and MongoDB backend that runs the full order lifecycle: quote, pending order, payment, revisions, delivery, and refunds, with files handled through S3 and WebDAV.",
    architecture:
      "Express, TypeScript, and MongoDB (Mongoose) API with NextAuth, Stripe and PayPal payments, AWS S3 and WebDAV (Nextcloud) storage, Cloudinary, Puppeteer and jsPDF for documents, and Socket.io. Next.js client with dnd-kit, react-pdf and pdf.js, and Recharts.",
    features: [
      "Quote requests, pending orders, and order tracking",
      "Stripe and PayPal payments with a payment ledger and refunds",
      "Revision requests and approval flow",
      "File delivery through AWS S3 and WebDAV (Nextcloud), with zip archives",
      "PDF generation and preview (jsPDF, Puppeteer, pdf.js)",
      "Drag-and-drop interfaces (dnd-kit) and real-time notifications",
    ],
    result:
      "Clients self-serve quotes, payments, revisions, and downloads in one portal, with a clean payment and refund record for the team.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "NextAuth",
      "Stripe",
      "PayPal",
      "AWS S3",
      "WebDAV",
      "Cloudinary",
      "Socket.io",
      "Tailwind CSS",
    ],
    accent: "lime",
    featured: true,
  },
  {
    slug: "backup-core",
    title: "Backup Core",
    category: "Infrastructure",
    // TODO: confirm year.
    year: "2025",
    role: "Backend Developer",
    summary:
      "An automated MongoDB backup engine with a monitoring dashboard, off-site cloud sync, failure alerts, and one-click restore.",
    // TODO: the brief described this as "queue-based". The actual engine is
    // cron-scheduled (node-cron + bash + rclone), not a job queue. Adjust if
    // you want to reframe it.
    metric: { value: "1-click", label: "restore from any snapshot" },
    problem:
      "MongoDB backups ran from ad-hoc cron with no monitoring, no off-site copy, and no easy restore, so failures went unnoticed until data was needed.",
    approach:
      "Built a backup service that runs scheduled dumps, compresses them, replicates off-site with rclone, records every run, and exposes a dashboard for monitoring and dynamic configuration without restarts.",
    architecture:
      "Node.js, Express, and TypeScript service with Prisma over SQLite for backup metadata and settings, node-cron scheduling, bash scripts for dump and compression, rclone for cloud sync to Nextcloud, Nodemailer for SMTP alerts, and Winston logging. Next.js dashboard with Recharts.",
    features: [
      "Scheduled MongoDB dumps with tar.gz compression",
      "Off-site sync to Nextcloud or any rclone target",
      "Dynamic connection, database, and location config from the dashboard, no restart",
      "Email alerts on backup or sync failure",
      "Disk usage analytics and storage snapshots",
      "Retention and auto-cleanup, plus one-click restore from any record",
    ],
    result:
      "Backups now run on a schedule with off-site copies, failures trigger immediate email alerts, and any snapshot restores in one click.",
    techStack: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "SQLite",
      "node-cron",
      "rclone",
      "Nodemailer",
      "Winston",
      "Next.js",
      "Recharts",
      "Tailwind CSS",
    ],
    accent: "teal",
    featured: true,
  },
  {
    slug: "draft-to-brand",
    title: "Draft to Brand",
    category: "Platform",
    // TODO: confirm year.
    year: "2025",
    role: "Full Stack Developer",
    summary:
      "A multi-tenant agency operating system with a public site and an admin dashboard: organizations, granular RBAC, a CRM pipeline, and email marketing automation.",
    metric: { value: "Multi-tenant", label: "orgs, RBAC, CRM and email automation" },
    problem:
      "Agencies need one system to run multiple client organizations with isolated data, fine-grained permissions, a sales pipeline, and outbound email, instead of stitching together separate tools.",
    approach:
      "Built a public marketing site and an admin dashboard over a single Postgres schema. Modeled organizations, branches, departments, teams, and members with a full role and permission system, plus a CRM and an email marketing engine with campaigns and drip sequences.",
    architecture:
      "Next.js App Router for both the public client and the admin dashboard. Prisma over Postgres (Neon serverless adapter), Better Auth for sessions and accounts, Resend for transactional and campaign email, TanStack Table, react-hook-form, and Zod. Granular RBAC via Role, Permission, RolePermission, and per-user overrides, with audit logging.",
    features: [
      "Multi-tenant organizations with branches, departments, teams, and members",
      "Granular role and permission system with per-user overrides and audit logs",
      "CRM with companies, contacts, tags, pipelines, stages, leads, and lead activity",
      "Email marketing with campaigns, recipients, events, and multi-step drip sequences",
      "Suppression list and email delivery logging",
      "Invitations and email verification via Resend",
    ],
    result:
      "A single platform runs multiple agency organizations with isolated data, fine-grained access control, a CRM pipeline, and automated email sequences.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "Better Auth",
      "Resend",
      "TanStack Table",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "Tailwind CSS",
    ],
    liveUrl: "https://draft-to-brand.vercel.app/",
    accent: "violet",
    featured: true,
  },
];

// Sorted by complexity, most complex first.
export const selectedBuilds: SelectedBuild[] = [
  {
    slug: "an-nisa",
    title: "An-Nisa",
    category: "E-commerce",
    description:
      "A full e-commerce platform with admin analytics, PDF invoicing, and AI features. Built on Next.js with Better Auth and Prisma over Postgres, it covers products, orders, order items, invoices, expenses, and customer profiles, with Google Gemini powering AI-assisted content and react-pdf generating invoices.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Redux Toolkit",
      "TanStack Query",
      "Google Gemini",
      "react-pdf",
      "Recharts",
      "Tailwind CSS",
    ],
    liveUrl: "https://an-nisa.vercel.app/",
    complexity: 9,
  },
  {
    slug: "travelora",
    title: "Travelora",
    category: "Travel",
    description:
      "A travel booking site built on Next.js with Prisma over Neon serverless Postgres. It uses TanStack Query for data, Zustand for state, WebSockets for live updates, Resend and react-email for transactional mail, and react-hook-form with Zod for validated booking flows.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "TanStack Query",
      "Zustand",
      "Resend",
      "WebSockets",
      "Zod",
      "Framer Motion",
    ],
    liveUrl: "https://travelora-eight.vercel.app/",
    complexity: 7,
  },
  {
    slug: "bull-oak",
    title: "Bull-Oak",
    category: "Brand",
    description:
      "A brand site for Signature Buffalo, a maker of handcrafted leather wallets. Built with React, Vite, and Tailwind v4, with Motion for animation and a small Express backend that proxies Google Gemini for an AI product assistant.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Motion",
      "Express",
      "Google Gemini",
    ],
    liveUrl: "https://bull-oak.vercel.app/",
    complexity: 5,
  },
  {
    slug: "pizza-times",
    title: "Pizza Times",
    category: "Restaurant",
    description:
      "A Bangladeshi fusion pizza restaurant site with an animated menu, built with React, Vite, and Tailwind v4. Motion handles transitions and a small Express backend proxies Google Gemini for an AI assistant.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Motion",
      "Express",
      "Google Gemini",
    ],
    liveUrl: "https://pizza-times.vercel.app/",
    complexity: 4,
  },
  {
    slug: "fine-dining-restaurant",
    title: "Fine Dining Restaurant",
    category: "Restaurant",
    description:
      "A premium restaurant website with smooth page transitions, a custom menu showcase, gallery, and reservation UI. Built with React 19, Vite, and Tailwind v4, Framer Motion for motion, and an Express backend using the Google Gemini API.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Express",
      "Google Gemini",
    ],
    liveUrl: "https://fine-dining-restaurant-three.vercel.app/",
    complexity: 4,
  },
  {
    slug: "seo-nahi",
    title: "SEO Nahi",
    category: "Marketing",
    description:
      "A digital marketer's personal site built on Next.js with Radix UI primitives, Motion, and next-themes for dark mode. It includes a validated contact form (react-hook-form, Zod, Nodemailer) and a before-and-after comparison slider.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Radix UI",
      "Motion",
      "next-themes",
      "Nodemailer",
      "Zod",
      "Tailwind CSS",
    ],
    liveUrl: "https://seo-nahi.vercel.app/",
    complexity: 4,
  },
  {
    slug: "doctor-portfolio",
    title: "Doctor Portfolio",
    category: "Portfolio",
    description:
      "A single-page medical portfolio for a cardiologist, with animated sections, a filterable awards grid, a career timeline, a testimonials carousel, and an appointment booking form. Built with React 19, Vite, and Tailwind v4, Motion, and an Express plus Gemini backend.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Motion",
      "Express",
      "Google Gemini",
    ],
    liveUrl: "https://doctor-portfolio-website-five.vercel.app/",
    complexity: 3,
  },
  {
    slug: "portfolio-ashaduzzaman",
    title: "Ashaduzzaman Portfolio",
    category: "Portfolio",
    description:
      "A personal portfolio site built on Next.js with Radix UI, Motion, and next-themes, including a validated contact form (react-hook-form, Zod, Nodemailer) and a before-and-after comparison slider.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Radix UI",
      "Motion",
      "next-themes",
      "Nodemailer",
      "Zod",
      "Tailwind CSS",
    ],
    liveUrl: "https://portfolio-ashaduzzaman.vercel.app/",
    complexity: 3,
  },
];


export const stats = [
  { value: 3, suffix: "+", label: "Years building" },
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 99, suffix: "%", label: "Uptime focus" },
  { value: 14, suffix: "", label: "Production platforms" },
] as const;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readMinutes: number;
  publishedAt: string; // ISO date, e.g. "2026-06-12"
  content: string; // markdown body
};

/**
 * Format an ISO post date as "Jun 2026" for editorial display.
 * Pinned to UTC so server and client render the same string.
 */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const posts: Post[] = [
  {
    slug: "live-chat-platform-ai-handoff",
    title: "Building a live chat platform with AI handoff",
    excerpt:
      "A confidence score under 0.6 pages a human, and the agent inherits the full transcript instead of starting cold.",
    category: "AI",
    tags: ["LLM", "Support", "Realtime", "Architecture"],
    readMinutes: 8,
    publishedAt: "2026-06-12",
    content: `The hardest part of an AI support desk is not the answering. It is knowing when to stop answering. A confident wrong answer costs more trust than saying nothing, so the whole system is built around one number: a confidence score attached to every AI reply.

## The confidence gate

Each model response comes back with a score between 0 and 1. Below 0.6, or when the user types something like "talk to a person", the conversation is flagged for handoff. The gate runs server side, never in the browser, so a user cannot skip it by editing a request.

\`\`\`ts
function shouldHandoff(reply: AiReply, message: string): boolean {
  if (reply.confidence < 0.6) return true;
  if (/human|agent|real person|speak to someone/i.test(message)) return true;
  return false;
}
\`\`\`

The threshold is not magic. I started at 0.5, watched a week of transcripts, and moved it to 0.6 because the band between 0.5 and 0.6 was where most of the polite-but-wrong answers lived.

## Inheriting context

When the gate trips, the agent does not start from zero. The conversation, the customer record, and a short AI-written summary of what has happened so far all land in the agent console at once. The customer never repeats themselves, which is the single thing people hate most about support.

Memory is scoped per user and persisted in Postgres, keyed by conversation id. The AI reads the last N turns plus a rolling summary, so a long thread does not blow the context window. When a human replies, their messages are written to the same table with an \`author\` of \`agent\`, so the history stays in one place.

## Presence and routing

A conversation that needs a human goes into a queue, not a void. Online agents are tracked over a WebSocket connection, and the queue assigns the waiting conversation to whoever has the fewest active threads. If no one is online, the customer gets an honest message and the thread is held for the next agent who logs in.

## What it feels like

The result is a desk that answers instantly when the model is sure and routes to a person the moment it is not. Customers get speed without the usual cost of a bot that bluffs. Agents get context instead of a cold open. The score is doing the quiet work in the middle, and tuning that one number moved satisfaction more than any prompt change I tried.`,
  },
  {
    slug: "nextjs-monorepo-vps-pm2",
    title: "Deploying a Next.js monorepo on a VPS with PM2",
    excerpt:
      "Three Next.js apps on one box, each a named PM2 process, with graceful reloads that drop zero requests.",
    category: "DevOps",
    tags: ["Next.js", "PM2", "Nginx", "Deployment"],
    readMinutes: 7,
    publishedAt: "2026-05-20",
    content: `Three Next.js apps, one 4 GB VPS, and a deploy that takes about forty seconds. No Kubernetes, no managed platform bill, just PM2 and a reverse proxy. For a monorepo this size that tradeoff is the right one, and here is how it fits together.

## One ecosystem file

PM2 reads a single ecosystem file checked into the repo. Each app is a named process bound to its own port, and the file is the source of truth for how the box runs.

\`\`\`js
module.exports = {
  apps: [
    { name: "web", cwd: "apps/web", script: "npm", args: "start", env: { PORT: 3000 } },
    { name: "admin", cwd: "apps/admin", script: "npm", args: "start", env: { PORT: 3001 } },
    { name: "api", cwd: "apps/api", script: "npm", args: "start", env: { PORT: 3002 } },
  ],
};
\`\`\`

Because the file is versioned, a fresh box reaches the same state with \`pm2 start ecosystem.config.js\`. Nothing lives only in someone's shell history.

## The reverse proxy

Nginx terminates TLS and routes by hostname to the right port. The apps never speak HTTPS themselves, which keeps their config simple and means certificate renewal is one concern in one place.

\`\`\`nginx
server {
  server_name app.fuyad.dev;
  location / { proxy_pass http://127.0.0.1:3000; }
}
\`\`\`

## Zero-downtime reloads

The part people get wrong is restarting. \`pm2 restart\` kills the process and drops in-flight requests. \`pm2 reload\` starts a new instance, waits for it to come up, then retires the old one. With Next.js running in cluster mode the swap is invisible to anyone mid-request.

The deploy script pulls, installs, builds each app, then reloads:

\`\`\`bash
git pull --ff-only
npm ci
npm run build --workspaces
pm2 reload ecosystem.config.js
\`\`\`

## Treating the box like cattle

The VPS is a single server, but I still treat it as disposable. The Nginx config, the ecosystem file, and the deploy script all live in the repo. \`pm2 save\` plus the startup hook means the apps come back after a reboot. If the provider lost the machine tomorrow, a new one would be serving traffic inside fifteen minutes from version control alone.

This setup will not autoscale, and that is fine. It serves real traffic, it deploys without dropped requests, and it costs less than a coffee subscription. When one of these apps genuinely outgrows the box, it gets its own. Until then, the simple thing keeps winning.`,
  },
  {
    slug: "intent-routing-support-chatbots",
    title: "Intent routing for support chatbots",
    excerpt:
      "A small classifier in front of the model picks one of six domains, and reliability jumps because the prompt stops guessing.",
    category: "AI",
    tags: ["LLM", "Classification", "Support", "Prompting"],
    readMinutes: 6,
    publishedAt: "2026-04-28",
    content: `One mega-prompt trying to handle billing, bug reports, refunds, and account questions at once is fragile. Splitting it behind a classifier that picks a single domain first took our wrong-tool rate from roughly one in five down to under one in twenty. The model stopped guessing which knowledge applied and started answering inside a narrow scope.

## The router is cheap

The classifier does not need to be the expensive model. A small, fast model with a tight prompt returns one label. That label decides which system prompt, which tools, and which knowledge base the main model sees next.

\`\`\`ts
const intent = await classify(message); // "billing" | "bug" | "account" | ...
const route = routes[intent] ?? routes.fallback;
const reply = await answer(message, route.systemPrompt, route.tools);
\`\`\`

Keeping the router separate means I can swap the answering model without retraining anything, and the classifier can run on a model that costs a fraction as much.

## Narrow scope, better answers

Each route carries only the context it needs. The billing route knows about plans and invoices and has a tool to look up a subscription. It does not carry refund policy or API docs. That smaller surface is exactly why the answers improve. The model is not choosing between six knowledge bases mid-sentence, it is working inside one.

## A fallback that admits ignorance

There is always a fallback route for messages that do not fit. Instead of forcing a label, the fallback asks a clarifying question or offers a human. Forcing every message into the nearest bucket is how you get confident answers to questions nobody asked.

## Routing gives you measurement

The quiet benefit is data. Because every conversation is tagged with an intent, I can see which domains the bot handles well and which ones land on a human nine times out of ten. That tells me where to write better docs, where the product is confusing, and where the bot should not be trying at all.

\`\`\`sql
SELECT intent, count(*) AS total,
       avg(case when handed_off then 1 else 0 end) AS handoff_rate
FROM conversations
GROUP BY intent
ORDER BY handoff_rate DESC;
\`\`\`

When the refund intent showed a 70 percent handoff rate, that was not a prompt problem. The refund flow itself was unclear, and fixing the product did more than any wording could. The router turned a vague sense that "the bot is bad at refunds" into a number I could act on.`,
  },
  {
    slug: "persisting-ai-conversations-schema-session-lifecycle",
    title: "Persisting AI conversations: schema and session lifecycle",
    excerpt:
      "Messages are immutable rows, a rolling summary caps the context window, and a session closes after thirty idle minutes.",
    category: "Backend",
    tags: ["PostgreSQL", "LLM", "Schema", "Sessions"],
    readMinutes: 7,
    publishedAt: "2026-04-02",
    content: `An AI chat that forgets everything on refresh feels broken, and one that replays a thousand messages into every prompt gets slow and expensive. The fix is a schema where messages are immutable rows and a rolling summary carries the older context. Here is the shape that has held up in production.

## Three tables

A conversation belongs to a user. A message belongs to a conversation. A summary is a single cached row per conversation that gets rewritten as the thread grows.

\`\`\`sql
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'active',
  last_activity_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id),
  author text NOT NULL, -- 'user' | 'assistant' | 'agent'
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
\`\`\`

Messages are never updated or deleted in normal flow. They are an append-only log, which makes the history trivial to reason about and safe to cache.

## Capping the context window

Replaying every message is the obvious approach and the wrong one. Past a threshold, say twenty messages, I summarize everything older than the last ten turns into the summary row, then send the model the summary plus the recent tail.

\`\`\`ts
const recent = messages.slice(-10);
const context = summary
  ? [{ role: "system", content: summary }, ...recent]
  : recent;
\`\`\`

The summary is regenerated in the background after each assistant reply, so the next request already has it. Token cost stays roughly flat no matter how long the thread runs.

## The session lifecycle

A conversation is active while messages keep arriving. A background job marks it \`idle\` after thirty minutes of silence and \`closed\` after a day. Closing matters for two reasons: it stops the summary job from touching dead threads, and it gives analytics a clean boundary for what counts as one session.

\`\`\`ts
UPDATE conversations SET status = 'idle'
WHERE status = 'active' AND last_activity_at < now() - interval '30 minutes';
\`\`\`

A reopened conversation simply flips back to active on the next message, with its full history and summary intact.

## Why immutability pays off

Because messages never change, the summary can be cached without invalidation headaches, the transcript can be handed to a human agent verbatim, and an audit of what the AI actually said is just a query. Every feature I added later, handoff context, analytics, replaying a thread for debugging, came almost for free because the underlying log never lies and never mutates.`,
  },
  {
    slug: "rate-limiting-express-api-practical",
    title: "Rate limiting an Express API the practical way",
    excerpt:
      "A Redis token bucket keyed by API key, with limit headers on every response and a Retry-After when you say no.",
    category: "Backend",
    tags: ["Express", "Redis", "API", "Node"],
    readMinutes: 6,
    publishedAt: "2026-03-10",
    content: `In-memory rate limiting breaks the moment you run two instances, because each process counts on its own and a client gets double the limit. Moving the counter to Redis fixes that, and a token bucket gives clients a burst allowance without letting them hammer you forever. Here is the version I actually ship.

## Why a token bucket

A fixed window resets all at once, so everyone slams the API at the top of the minute. A token bucket refills gradually: each key gets a bucket of tokens, every request spends one, and tokens drip back at a steady rate. Clients get smooth throughput and a small burst, which is what real usage looks like.

## The Redis script

The check has to be atomic, or two concurrent requests both read the same count and both pass. A small Lua script runs the read, refill, and decrement as one operation inside Redis.

\`\`\`lua
local tokens = tonumber(redis.call("get", KEYS[1]) or ARGV[1])
local refill = (ARGV[2] - (redis.call("get", KEYS[2]) or ARGV[2])) * ARGV[3]
tokens = math.min(ARGV[1], tokens + refill)
if tokens < 1 then return -1 end
redis.call("set", KEYS[1], tokens - 1)
return tokens - 1
\`\`\`

Keying by API key rather than IP is the important call. IPs are shared behind corporate proxies and mobile carriers, so an IP limit punishes the wrong people. The API key is the actual unit of accountability.

## Tell the client what is happening

A 429 with no information is hostile. Every response carries the limit, the remaining tokens, and on rejection a \`Retry-After\` so a well-behaved client backs off instead of retrying in a tight loop.

\`\`\`ts
res.set("X-RateLimit-Limit", String(max));
res.set("X-RateLimit-Remaining", String(remaining));
if (remaining < 0) {
  res.set("Retry-After", String(retrySeconds));
  return res.status(429).json({ error: "rate_limited" });
}
\`\`\`

## Different limits for different routes

A login endpoint and a read endpoint should not share a budget. The middleware takes the bucket size and refill rate as arguments, so auth routes get a tight limit while cheap reads get a generous one. One middleware, configured per route, covers the whole API.

The result holds up across instances, refills smoothly, and treats clients like partners by telling them exactly where they stand. It is maybe forty lines of real code, and it has never been the thing that fell over under load.`,
  },
  {
    slug: "bullmq-production-retries-backoff-dead-letter",
    title: "BullMQ in production: retries, backoff, and dead-letter queues",
    excerpt:
      "Exponential backoff for transient failures, a poison-message guard, and a failed set you actually watch.",
    category: "Infrastructure",
    tags: ["BullMQ", "Redis", "Queues", "Node"],
    readMinutes: 8,
    publishedAt: "2026-02-14",
    content: `A backup job that hit a flaky S3 endpoint used to fail the whole run. Now it retries three times with growing gaps, and if it still fails it lands in a dead-letter set that pages me instead of vanishing. BullMQ makes that easy once you configure it deliberately rather than accepting the defaults.

## Backoff, not hammering

The default of retrying immediately is the worst option for a transient failure, because the thing you are retrying is usually still busy. Exponential backoff spaces the attempts out, giving the downstream service room to recover.

\`\`\`ts
await queue.add("backup", data, {
  attempts: 3,
  backoff: { type: "exponential", delay: 5000 },
});
\`\`\`

Three attempts at 5s, 10s, 20s covers nearly every blip I see in practice, from a momentary network drop to a brief upstream restart.

## Idempotent jobs or nothing

Retries only help if running a job twice is safe. A job that charges a card or sends an email needs an idempotency key, so the second attempt recognizes the work is already done and skips it. I learned this the unglamorous way, with two of the same notification in a tester's inbox.

\`\`\`ts
const already = await redis.set(\`job:\${job.id}:done\`, "1", "NX", "EX", 86400);
if (!already) return; // a prior attempt finished this
\`\`\`

## The dead-letter set

When all attempts fail, the job sits in BullMQ's failed set. That set is not a graveyard, it is a worklist. A \`failed\` listener writes an alert, and the failed jobs stay inspectable so I can read the exact payload and stack that broke.

\`\`\`ts
worker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err: err.message }, "job dead-lettered");
  alerts.page("backup job failed after retries", job?.data);
});
\`\`\`

## Watch the queue, not just the app

The failure mode that bit me hardest was not a crash, it was a queue quietly backing up while everything looked green. Now a small check reports queue depth and the age of the oldest waiting job. A growing backlog is the earliest signal that a worker is stuck or starved.

\`\`\`ts
const waiting = await queue.getWaitingCount();
const oldest = await queue.getWaiting(0, 0);
\`\`\`

## Concurrency with intent

Workers default to one job at a time. Bumping concurrency speeds throughput, but only up to what the downstream can take. For the backup worker I cap it low on purpose, because twenty parallel uploads to the same bucket just trade one bottleneck for another. The retries, the dead-letter alerts, and the depth metric together mean a failure is loud and recoverable instead of silent and lost.`,
  },
  {
    slug: "betterauth-sso-httponly-cookies-subdomains",
    title: "BetterAuth SSO with httpOnly cookies across subdomains",
    excerpt:
      "One login at app.fuyad.dev carries to admin.fuyad.dev through a cookie scoped to the parent domain.",
    category: "Backend",
    tags: ["BetterAuth", "Cookies", "Auth", "Security"],
    readMinutes: 7,
    publishedAt: "2026-01-22",
    content: `A user who logs in at app.fuyad.dev should already be authenticated when they open admin.fuyad.dev. The whole trick is a session cookie scoped to the parent domain, marked httpOnly so no script can read it. BetterAuth handles the session, but the cookie attributes are where single sign-on across subdomains is won or lost.

## Scope the cookie to the parent

A cookie set without a domain is bound to the exact host that set it, so app and admin would each get their own session. Setting the domain to \`.fuyad.dev\` makes the browser send it to every subdomain.

\`\`\`ts
export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: { enabled: true, domain: ".fuyad.dev" },
    cookies: { sessionToken: { attributes: { httpOnly: true, secure: true, sameSite: "lax" } } },
  },
});
\`\`\`

\`httpOnly\` keeps the token out of JavaScript entirely, which closes the door on a whole class of token theft through XSS. \`secure\` means it only travels over HTTPS. \`sameSite: lax\` is the sweet spot here, since all the subdomains share a site.

## One source of truth for sessions

Every subdomain validates against the same session store. The session id in the cookie is looked up server side on each request, so there is no token to forge and no per-app session to drift out of sync. Logging out anywhere deletes the session row, and the next request on any subdomain finds nothing and redirects to login.

\`\`\`ts
const session = await auth.api.getSession({ headers: req.headers });
if (!session) return redirect("/login");
\`\`\`

## SameSite and the cross-site case

Lax works because app and admin are the same site under one registrable domain. If I ever needed the session to ride along on a genuinely cross-site request, that would mean \`sameSite: none\` plus \`secure\`, and a careful look at CSRF. I avoid that until something actually requires it, because none is a much wider door.

## Local development without HTTPS pain

\`secure\` cookies do not set over plain http, which makes local multi-subdomain testing annoying. I map \`app.localhost\` and \`admin.localhost\` in hosts and run a local TLS proxy so the cookie behaves exactly as it will in production. Testing SSO against \`localhost:3000\` and \`localhost:3001\` would prove nothing, because those are different origins on the same host, not subdomains.

The payoff is the experience users expect without thinking about it: log in once, move between the public app and the admin tools freely, and have a single logout end everything. The cookie attributes are four lines, but getting those four lines right is the entire feature.`,
  },
  {
    slug: "fixing-nextjs-build-heap-oom-node-options",
    title: "Fixing Next.js build heap OOM (NODE_OPTIONS deep-dive)",
    excerpt:
      "A build that died at 1.6 GB on a 2 GB box, traced to the default V8 heap cap and fixed without buying more RAM.",
    category: "DevOps",
    tags: ["Next.js", "Node", "V8", "Build"],
    readMinutes: 6,
    publishedAt: "2025-12-15",
    content: `The build worked on my laptop and died on the VPS with "JavaScript heap out of memory". The box had 2 GB of RAM free, so this was not a hardware problem. It was V8 capping its old-space heap well below the memory the machine actually had, and the fix is one environment variable, applied with some care.

## The default heap ceiling

Node does not use all available memory by default. The V8 old-space limit sits around 2 GB regardless of how much RAM the host has, and on smaller machines the effective ceiling is lower. A large Next.js build, especially one with many pages and heavy static analysis, walks right into it.

\`\`\`bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
\`\`\`

That raises the old-space cap to 4096 MB. The number is in megabytes, and it should sit below the machine's real free memory with headroom, because V8 also uses memory outside old space.

## Do not set it blindly

Setting 4096 on a 2 GB box is worse than the original problem, because now the process tries to grow past physical memory and the kernel OOM-killer steps in, which is harder to diagnose than a clean V8 error. On a 2 GB box I set 1536, accept that builds are tighter, and look at reducing the build's footprint instead of pretending there is RAM that is not there.

## Where to put it

The variable belongs in the build environment, not committed into \`next.config\`. In CI it goes in the pipeline env. On the VPS it lives in the deploy script next to the build command, so it applies only during the build and not to the running server, which has very different memory needs.

\`\`\`bash
export NODE_OPTIONS="--max-old-space-size=3072"
npm run build
unset NODE_OPTIONS
\`\`\`

## Treat OOM as a symptom

Raising the cap is the fast fix, but a build that needs 4 GB is often telling you something. In one case the real culprit was a data file being imported into hundreds of pages and held in memory all at once. Splitting that data and loading it per-route dropped peak heap by half, and the flag became unnecessary. The variable buys you room, but it is worth asking why you needed the room before you reach for it.

The short version: the heap limit is a V8 default, not your machine's limit. Raise it to fit the host with headroom, set it only for the build step, and check whether the build's memory appetite is reasonable before you assume the answer is always more.`,
  },
  {
    slug: "multi-tenant-schema-prisma-postgres",
    title: "Designing a multi-tenant schema with Prisma and PostgreSQL",
    excerpt:
      "A shared schema with a tenant_id on every row, enforced by row-level security so a missing filter cannot leak data.",
    category: "Architecture",
    tags: ["Prisma", "PostgreSQL", "Multi-tenant", "RLS"],
    readMinutes: 8,
    publishedAt: "2025-11-18",
    content: `The scariest bug in a multi-tenant app is one tenant seeing another tenant's data, and it usually comes from a single query that forgot its tenant filter. A shared schema with \`tenant_id\` on every row plus Postgres row-level security turns that forgotten filter from a data leak into a query that simply returns nothing.

## Shared schema, tenant column

Of the three common models, database per tenant, schema per tenant, and shared schema with a tenant column, the shared column scales best for a lot of small tenants and keeps migrations sane. Every tenant-owned table carries the same column.

\`\`\`prisma
model Invoice {
  id        String   @id @default(uuid())
  tenantId  String
  amount    Int
  createdAt DateTime @default(now())
  @@index([tenantId])
}
\`\`\`

The index on \`tenantId\` is not optional. Almost every query filters on it, so it is the most important index in the database.

## Defense in depth with RLS

Application-level filtering is the first line, but humans forget. Row-level security is the backstop that does not. A policy on each table restricts rows to the current tenant, set per connection.

\`\`\`sql
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Invoice"
  USING ("tenantId" = current_setting('app.tenant_id'));
\`\`\`

Now a query that forgets its \`where tenantId\` clause returns only the current tenant's rows anyway, because the database itself refuses to hand over the others.

## Setting the tenant per request

The connection needs to know which tenant it is serving. At the start of each request I resolve the tenant from the session and set it as a session variable that the RLS policy reads.

\`\`\`ts
await prisma.$executeRaw\`SELECT set_config('app.tenant_id', \${tenantId}, true)\`;
\`\`\`

The \`true\` makes it local to the transaction, so it cannot leak into the next request that reuses the pooled connection. That detail matters with a connection pool, because a value left set on a shared connection is exactly how cross-tenant bugs sneak back in.

## The tradeoffs you accept

A shared schema means a heavy tenant can affect neighbors, and a schema migration touches everyone at once. I accept those because the operational simplicity is worth it for this shape of product. When a single tenant genuinely outgrows the shared model, the tenant column makes extracting them into their own database a mechanical job rather than a rewrite.

The combination is what makes it safe: the column makes isolation possible, the index makes it fast, and RLS makes it the default that holds even when the application code slips. I sleep better knowing the last line of defense lives in the database, not in my memory of which queries need a filter.`,
  },
  {
    slug: "s3-attachments-signed-uploads-cleanup",
    title: "S3 attachments done right: signed uploads and cleanup",
    excerpt:
      "Browsers upload straight to S3 with a presigned URL, and a nightly sweep deletes objects no row points to.",
    category: "Backend",
    tags: ["S3", "Uploads", "Node", "Storage"],
    readMinutes: 7,
    publishedAt: "2025-10-21",
    content: `Routing a 40 MB file upload through your API server is a waste of bandwidth and a memory risk. The browser should send the bytes straight to S3, and the API should only ever touch a short signed URL. Done right, that also leaves you with the orphan problem, which a nightly sweep handles.

## Presigned uploads

The API generates a presigned PUT URL scoped to one object key, with a short expiry and a content-type constraint. The browser uploads directly to S3 with that URL. Your server never holds the file.

\`\`\`ts
const key = \`uploads/\${userId}/\${crypto.randomUUID()}\`;
const url = await getSignedUrl(s3, new PutObjectCommand({
  Bucket: BUCKET, Key: key, ContentType: contentType,
}), { expiresIn: 300 });
\`\`\`

The five-minute expiry is deliberate. The URL is enough to upload one object and then it is dead, so a leaked URL is not a standing liability.

## Record the key, then confirm

The flow has two steps. First the client asks for a URL and the server writes a pending attachment row. After the upload succeeds, the client calls back to mark it confirmed. An attachment that never gets confirmed is an orphan waiting to be cleaned up.

\`\`\`ts
// 1. POST /attachments -> { url, key }, status: 'pending'
// 2. client PUTs to S3
// 3. POST /attachments/confirm { key } -> status: 'ready'
\`\`\`

## Validate on the server, not the client

Content-type from the browser is a hint, not a guarantee. After confirm, I check the actual object metadata and size against what was claimed, and reject anything that does not match. A client that says \`image/png\` and uploads a 2 GB blob should not get a ready row.

## The cleanup sweep

Orphans accumulate from abandoned uploads, failed confirms, and deleted records whose files were missed. A nightly job lists keys with no matching ready row and deletes them, but only objects older than a day, so an in-progress upload is never swept out from under a user.

\`\`\`ts
for (const obj of await listAll(BUCKET, "uploads/")) {
  const known = await db.attachment.findFirst({ where: { key: obj.Key, status: "ready" } });
  if (!known && ageInHours(obj.LastModified) > 24) {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: obj.Key }));
  }
}
\`\`\`

## Deletes go through the same door

When a record is deleted, its S3 object is deleted in the same operation, inside a transaction-like flow where the row goes first and the object follows. If the object delete fails, the nightly sweep catches it later, because the row is already gone and the key is now an orphan by definition. The database is the source of truth, S3 follows it, and the sweep reconciles the gap. That is what keeps storage honest and the bill from quietly climbing.`,
  },
  {
    slug: "websocket-live-sessions-socketio-presence-reconnects",
    title: "WebSocket live sessions with Socket.io: presence and reconnects",
    excerpt:
      "Presence keyed by user with a reference count, plus a Redis adapter so two server instances share one room.",
    category: "Infrastructure",
    tags: ["Socket.io", "WebSockets", "Redis", "Realtime"],
    readMinutes: 8,
    publishedAt: "2025-09-16",
    content: `A user with two tabs open is one person, not two, and closing one tab should not show them as offline. Getting presence right means counting connections per user, not per socket. Add a Redis adapter so it works across server instances, and reconnects stop being a source of ghost users.

## Count sockets, report users

Presence is a map from user id to a set of their socket ids. A user is online while that set is non-empty. Two tabs add two sockets, closing one leaves them online, closing both marks them away.

\`\`\`ts
io.on("connection", (socket) => {
  const uid = socket.data.userId;
  add(uid, socket.id);
  if (size(uid) === 1) broadcast("presence", { uid, status: "online" });

  socket.on("disconnect", () => {
    remove(uid, socket.id);
    if (size(uid) === 0) broadcast("presence", { uid, status: "offline" });
  });
});
\`\`\`

Reporting per socket instead of per user is the classic bug, where a user flickers offline every time they open a second tab.

## One room across two instances

Socket.io's default adapter keeps rooms in the memory of a single process. Run two instances behind a load balancer and a message emitted on instance A never reaches a client connected to instance B. The Redis adapter fixes that by publishing emits over Redis so every instance delivers them.

\`\`\`ts
import { createAdapter } from "@socket.io/redis-adapter";
io.adapter(createAdapter(pubClient, subClient));
\`\`\`

With the adapter in place, a chat message or a presence change reaches every relevant client regardless of which instance they happen to be pinned to.

## Sticky sessions still matter

The Redis adapter shares messages, but the initial handshake and any long-polling fallback still need the client to keep hitting the same instance. The load balancer needs sticky sessions for that, otherwise the upgrade from polling to WebSocket can land on the wrong box and fail. The adapter and stickiness solve different halves of the same problem.

## Reconnects without duplicates

A flaky network drops and restores the connection constantly. Socket.io reconnects automatically, but the server has to treat a reconnect as the same user resuming, not a new arrival. Because presence is keyed by user id from the authenticated session rather than the socket, a reconnect cleanly replaces the old socket id with the new one.

\`\`\`ts
socket.on("disconnect", (reason) => {
  if (reason === "transport close") scheduleAway(uid, 5000);
});
\`\`\`

A short grace period before marking someone away absorbs the typical one or two second blip, so a subway tunnel does not light up the room with leave and join noise. Count per user, share state through Redis, keep sessions sticky, and forgive brief drops. Those four together are the difference between a presence indicator people trust and one they learn to ignore.`,
  },
  {
    slug: "server-actions-vs-api-routes",
    title: "Server Actions vs API routes: when to use which",
    excerpt:
      "Server Actions for form mutations that return to the same UI, route handlers for anything a third party calls.",
    category: "Frontend",
    tags: ["Next.js", "Server Actions", "API", "React"],
    readMinutes: 6,
    publishedAt: "2025-08-12",
    content: `Both can write to your database, so the question is not which is more powerful. It is who calls it. Server Actions are for mutations driven by your own UI. Route handlers are for anything with a stable URL that something outside your app talks to. Pick by the caller and the choice gets simple.

## Server Actions for your own forms

A form that creates a record and re-renders the same page is the ideal Server Action. There is no endpoint to design, no fetch to write, and the mutation can revalidate the affected data in the same call.

\`\`\`ts
async function createProject(formData: FormData) {
  "use server";
  await db.project.create({ data: { name: formData.get("name") as string } });
  revalidatePath("/projects");
}
\`\`\`

The form posts directly to the action, the page revalidates, and the new project appears. No JSON, no client fetch, no separate loading endpoint.

## Route handlers for stable contracts

The moment something outside your app needs to call it, you want a URL. Webhooks from Stripe, a mobile client, a cron service, another backend, all of these need an addressable endpoint with a documented shape and its own auth.

\`\`\`ts
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const event = verify(await req.text(), sig);
  // ...
  return Response.json({ received: true });
}
\`\`\`

A Server Action has no public URL you would want a third party depending on, so this work belongs in a route handler every time.

## The grey area

Internal data fetching from a client component is the case people overthink. If a client component needs to load data on an interaction, a route handler it fetches is clear and cacheable. If it is a mutation tied to a form, the action is less code. I lean on actions for writes and route handlers for reads that the client triggers itself.

## Security applies to both

Neither is safe by default. A Server Action is a POST endpoint that anyone can invoke once they find it, so it needs the same auth and validation as a route handler. Treating an action as trusted because it lives in your component file is a real mistake. Both check the session, both validate input, both authorize the specific operation.

\`\`\`ts
const session = await auth();
if (!session) throw new Error("unauthorized");
\`\`\`

The clean rule that has not failed me: if my own UI triggers a write and stays on the page, Server Action. If a URL is part of the contract, route handler. Everything else is a judgment call you can make on code size, and either way you still write the auth.`,
  },
  {
    slug: "streaming-llm-responses-react-ui",
    title: "Streaming LLM responses to a React UI",
    excerpt:
      "Tokens arrive over a ReadableStream and append to state, so the answer types out instead of landing as a wall.",
    category: "Frontend",
    tags: ["React", "LLM", "Streaming", "Next.js"],
    readMinutes: 7,
    publishedAt: "2025-07-08",
    content: `A model that takes eight seconds to answer feels broken if the screen sits blank, and instant if the words start appearing in one. Same latency, completely different experience. The fix is streaming the tokens as they generate and appending them to React state, so the answer types itself out.

## Stream from the server

The route handler returns a ReadableStream instead of a finished string. As the model emits tokens, they are enqueued and flushed to the client immediately.

\`\`\`ts
export async function POST(req: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of model.stream(prompt)) {
        controller.enqueue(new TextEncoder().encode(chunk));
      }
      controller.close();
    },
  });
  return new Response(stream);
}
\`\`\`

The first token can reach the browser in a few hundred milliseconds even when the full answer takes many seconds, and that first token is what kills the feeling of waiting.

## Read and append on the client

The client reads the stream chunk by chunk and appends each piece to state. React re-renders on every append, so the text grows in place.

\`\`\`ts
const res = await fetch("/api/chat", { method: "POST", body });
const reader = res.body!.getReader();
const decoder = new TextDecoder();
let text = "";
for (;;) {
  const { done, value } = await reader.read();
  if (done) break;
  text += decoder.decode(value, { stream: true });
  setMessage(text);
}
\`\`\`

\`decoder.decode(value, { stream: true })\` matters because a multibyte character can be split across two chunks, and decoding each chunk in isolation would garble it.

## Let the user stop

A streaming request the user cannot cancel is a bad citizen. An AbortController wired to a stop button cancels the fetch, and the server should notice the disconnect and stop spending tokens on an answer nobody is reading.

\`\`\`ts
const controller = new AbortController();
fetch("/api/chat", { signal: controller.signal, /* ... */ });
// stop button: controller.abort();
\`\`\`

## Handle the failure mid-stream

A stream can die halfway through, leaving a half-finished sentence. The client needs to catch a read error and show that the response was interrupted rather than pretending the partial text is complete. I keep the partial content and mark it as incomplete, so the user sees what arrived and knows it was cut off.

The whole pattern is a server that flushes tokens, a client that appends them, a way to cancel, and honest handling when it breaks. None of it is exotic, and together it turns a slow model into an interface that feels alive while it thinks.`,
  },
  {
    slug: "caching-dashboard-redis-revalidation",
    title: "Caching strategy for a dashboard: Redis and revalidation",
    excerpt:
      "Expensive aggregates cached in Redis with a short TTL, and a targeted bust on write so numbers stay current.",
    category: "Infrastructure",
    tags: ["Redis", "Caching", "Next.js", "Performance"],
    readMinutes: 7,
    publishedAt: "2025-05-27",
    content: `A dashboard that runs the same heavy aggregate query on every page load will fall over the moment a few people open it at once. Those numbers do not change second to second, so caching them in Redis with a short TTL took one panel from a 900 ms query to a 4 ms lookup. The trick is busting the cache precisely when the underlying data actually changes.

## Cache the expensive shape

The candidates are the queries that are costly and tolerant of being a little stale. Monthly revenue, active user counts, and rollups across large tables fit perfectly. They take real work to compute and nobody needs them accurate to the millisecond.

\`\`\`ts
async function getRevenue(tenantId: string) {
  const key = \`dash:revenue:\${tenantId}\`;
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);
  const data = await computeRevenue(tenantId); // the slow query
  await redis.set(key, JSON.stringify(data), "EX", 300);
  return data;
}
\`\`\`

A five-minute TTL means the worst-case staleness is five minutes, and the database runs the heavy query at most twelve times an hour per tenant no matter how many people are looking.

## TTL alone is not enough

A pure TTL means a brand new invoice does not show up for up to five minutes, which looks broken to the person who just created it. So writes that affect a cached value delete that key, and the next read recomputes it. TTL is the safety net for staleness you did not predict, the targeted bust is for the changes you did.

\`\`\`ts
async function createInvoice(input: InvoiceInput) {
  const invoice = await db.invoice.create({ data: input });
  await redis.del(\`dash:revenue:\${input.tenantId}\`);
  return invoice;
}
\`\`\`

## Key by what varies

The cache key carries every dimension the value depends on, the tenant, the metric, and the time range if there is one. Get this wrong and one tenant sees another tenant's numbers out of the cache, which is worse than no cache at all. The key is part of the correctness, not just a label.

## Pair it with Next revalidation

For data rendered on the server, Next's own caching layers on top. A page can cache its render and revalidate on a tag, while Redis caches the raw aggregate underneath. A write busts the Redis key and calls \`revalidateTag\`, so both layers refresh together.

\`\`\`ts
revalidateTag(\`revenue-\${tenantId}\`);
\`\`\`

## Never cache the empty error

The bug that taught me a lesson was caching a failed query result, so a transient database hiccup served zeros for five minutes. Now the cache only ever stores a successful, validated result, and a failure falls through to recompute next time. Cache the good answer, bust it on write, key it by every variable, and never let a five-minute TTL immortalize a mistake.`,
  },
  {
    slug: "figma-to-code-mcp-workflow",
    title: "From Figma to code: a reliable MCP workflow",
    excerpt:
      "Pulling design context through MCP turns a screenshot guessing game into exact tokens, spacing, and variants.",
    category: "Frontend",
    tags: ["Figma", "MCP", "Design", "Workflow"],
    readMinutes: 6,
    publishedAt: "2025-04-15",
    content: `Building a component from a screenshot is a guessing game about spacing, color, and the states you cannot see. Pulling the design through an MCP connection instead gives the exact tokens, the real pixel values, and the variants that are not visible in a single frame. The workflow turns "looks about right" into "matches the source".

## Read context, do not eyeball

The MCP server exposes the design's actual data, not an image of it. Instead of estimating a gap at "around 16px", I get the real value, the named color token, and the font definition straight from the file.

\`\`\`ts
// via the design MCP
const ctx = await getDesignContext(nodeId);
// ctx.spacing, ctx.color tokens, ctx.typography, ctx.variants
\`\`\`

That difference compounds. A screenshot hides the disabled state, the hover treatment, and the focus ring. The structured context lists every variant, so the component I build is complete on the first pass rather than discovered through review comments.

## Map tokens to your system

The design's tokens rarely match your code's names exactly, so the one-time job is a mapping. Figma's \`primary/500\` maps to your \`--acc\`, its spacing scale maps to your Tailwind steps. Once that table exists, every pull translates cleanly into the system you already have.

\`\`\`ts
const tokenMap = {
  "primary/500": "var(--acc)",
  "surface/raised": "var(--bg-2)",
  "space/4": "1rem",
};
\`\`\`

## Build to the variants, not the frame

Because the context lists all states, the component is structured around them from the start. A button comes back with default, hover, disabled, and loading, so the props are obvious and nothing is bolted on later when someone notices the loading state was never built.

## Keep a human in the loop

The workflow gets you a faithful first version, not a finished one. Pixel-faithful is not the same as correct, because the design might miss an edge case your real data hits, like a name long enough to wrap or a number wide enough to overflow. I treat the generated component as a strong draft and still test it against actual content.

## Where it pays off most

The biggest win is on a design system with many small components. Pulling each one through MCP keeps them consistent with the source and with each other, instead of fifteen slightly different interpretations of the same spacing scale. The connection does the tedious, error-prone measuring, and that frees the attention for the parts that actually need judgment, the interaction details and the awkward real-world content the static frame never showed.`,
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    role: "Backend Developer",
    company: "WebBriks",
    period: "Oct 2024 — Present",
    current: true,
    description:
      "Building internal tools and AI-powered support systems for production teams.",
    highlights: [
      "Shipped a live AI support desk with conversation memory and human handoff",
      "Designed a queue-based backup engine with retries and monitoring",
      "Owned backend architecture for multi-tenant internal platforms",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 — Present",
    current: true,
    description:
      "Partnering with founders and agencies to design, build, and ship production systems end to end.",
    highlights: [
      "Built CRMs, lead portals, and multi-tenant agency platforms",
      "Took products from blank repo to deployed and monitored",
      "Brought photography and videography into product storytelling",
    ],
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What kind of projects do you take on?",
    a: "Full stack web apps with real backends: internal tools, dashboards, CRMs, multi-tenant platforms, and AI features like live support and intent routing. I lean toward systems that need to hold up in production, not throwaway demos.",
  },
  {
    q: "What is your typical timeline and availability?",
    a: "It depends on scope. A focused feature or landing build can take one to two weeks, while a full platform runs over a few months. I am currently open to both freelance and full-time work, and I will give you an honest estimate before we start.",
  },
  {
    q: "Do you work with existing codebases or only new builds?",
    a: "Both. I am comfortable joining an existing codebase to add features, fix issues, or refactor, and I am just as happy taking a project from an empty repo to deployed and monitored.",
  },
  {
    q: "How do you handle pricing and contracts?",
    a: "Fixed price for well-defined scope, hourly or weekly for ongoing work. Everything is agreed in writing up front, including scope, milestones, and what counts as done, so there are no surprises on either side.",
  },
  {
    q: "Which time zones do you work across?",
    a: "I am based in Dhaka, Bangladesh (GMT+6) and regularly work with clients in Europe and North America. I keep flexible hours for calls and stay responsive over async channels through the day.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. I can stay on for bug fixes, monitoring, and iteration after launch, either as a retainer or on demand. I also leave projects documented enough that another developer can pick them up.",
  },
];

// Grouped capability stack (rendered as glass chips with Tabler icons).
export type TechGroup = { category: string; items: string[] };

export const techGroups: TechGroup[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Neon", "Redis"],
  },
  {
    category: "Auth",
    items: ["Better Auth", "NextAuth", "JWT"],
  },
  {
    category: "Infra & Tools",
    items: ["Docker", "BullMQ", "Socket.io", "Puppeteer", "Zod", "Redux"],
  },
  {
    category: "Payments",
    items: ["Stripe", "PayPal"],
  },
  {
    category: "AI",
    items: ["Google Gemini", "AI / LLM APIs"],
  },
];
