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
  date: string;
  readingTime: string;
  excerpt: string;
  tag: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "live-chat-platform-ai-handoff",
    title: "Building a live chat platform with AI handoff",
    date: "Jun 2026",
    readingTime: "8 min read",
    tag: "AI",
    excerpt:
      "How to let an AI answer first, carry memory, and hand off to a human the instant it should.",
    body: [
      "The hardest part of an AI support desk isn't the answering — it's knowing when to stop answering. A confident-sounding wrong answer is worse than no answer at all.",
      "I built the handoff around a confidence gate. Every AI response carries a score; below a threshold, or on an explicit user request, the conversation is paged to a human agent with the full context attached.",
      "Conversation memory is scoped per user and persisted, so when a human takes over they inherit everything — no asking the customer to repeat themselves.",
      "The result is a system that feels fast and human at the same time: instant answers when the AI is sure, a real person when it isn't.",
    ],
  },
  {
    slug: "nextjs-monorepo-vps-pm2",
    title: "Deploying a Next.js monorepo on a VPS with PM2",
    date: "May 2026",
    readingTime: "6 min read",
    tag: "Infrastructure",
    excerpt:
      "A pragmatic deploy story — no Kubernetes, no drama, just PM2, a reverse proxy, and zero-downtime reloads.",
    body: [
      "Not every project needs Kubernetes. For a small monorepo, a single well-configured VPS with PM2 gets you most of the way with a fraction of the operational weight.",
      "I run each app as a PM2 process with a shared ecosystem file, front it with a reverse proxy for TLS and routing, and use PM2's graceful reload for zero-downtime deploys.",
      "The trick is treating the VPS like cattle anyway: everything is scripted, the ecosystem file is in version control, and a fresh box can be reproduced from scratch.",
    ],
  },
  {
    slug: "intent-routing-support-chatbots",
    title: "Intent routing for support chatbots",
    date: "Apr 2026",
    readingTime: "5 min read",
    tag: "AI",
    excerpt:
      "Why a thin intent classifier in front of your LLM makes support bots dramatically more reliable.",
    body: [
      "A single mega-prompt trying to do everything is fragile. The moment you add a classifier that routes a message to the right domain first, reliability jumps.",
      "Each intent gets its own focused context and tools. The LLM stops guessing which knowledge base applies and starts answering inside a narrow, well-defined scope.",
      "Routing also gives you a natural place to measure: you can see which intents the bot handles well and which ones consistently need a human.",
    ],
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
