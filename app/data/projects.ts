export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  status: "Live" | "In Production" | "Active" | "Internal";
  year: string;
  summary: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  accent: "cyan" | "electric" | "violet";
};

export const projects: Project[] = [
  {
    id: "backup-core",
    index: "01",
    name: "Backup Core",
    category: "Infrastructure SaaS",
    status: "Live",
    year: "2025",
    accent: "cyan",
    summary:
      "Multi-tenant backup orchestration platform with scheduled snapshots, encrypted off-site storage, and one-click restore.",
    description:
      "Designed the entire control plane: tenant isolation, queueing, retention policies, and a hardened agent that streams encrypted backups to remote object storage. Built a real-time dashboard with audit logs, alerting, and forecasted storage cost.",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "S3-compatible",
      "Docker",
    ],
    metrics: [
      { label: "Tenants", value: "120+" },
      { label: "Avg restore", value: "< 4 min" },
      { label: "Uptime", value: "99.98%" },
    ],
    highlights: [
      "Zero-trust agent with end-to-end encryption (AES-256-GCM)",
      "Job queue handling 10k+ scheduled snapshots / day",
      "Cost forecasting engine with anomaly detection",
    ],
  },
  {
    id: "hr-management-saas",
    index: "02",
    name: "HR Management SaaS",
    category: "B2B SaaS",
    status: "In Production",
    year: "2025",
    accent: "electric",
    summary:
      "End-to-end HRIS — payroll, leave, attendance, and performance — built for scale-up companies.",
    description:
      "Architected the org graph, role-based access, and workflow engine. Shipped employee self-service, payroll runs with country-specific tax modules, and a manager dashboard with org-wide analytics.",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "tRPC",
      "Tailwind",
      "Stripe",
    ],
    metrics: [
      { label: "Companies", value: "30+" },
      { label: "Employees managed", value: "8k+" },
      { label: "Onboarding", value: "< 10 min" },
    ],
    highlights: [
      "Country-aware payroll engine with audit trail",
      "Approval workflow engine with conditional routing",
      "Real-time presence + attendance via WebSockets",
    ],
  },
  {
    id: "dev-hr-management",
    index: "03",
    name: "Dev HR Management",
    category: "Internal Tooling",
    status: "Active",
    year: "2025",
    accent: "violet",
    summary:
      "Developer-centric HR system — sprint OKRs, ticket-linked time tracking, and engineering payroll.",
    description:
      "Built the system used internally by Web Briks engineering: GitHub-linked time tracking, sprint health dashboards, contributor scoring, and automated payouts based on shipped work.",
    stack: [
      "Next.js",
      "Node.js",
      "GraphQL",
      "MongoDB",
      "GitHub API",
      "Slack Bot",
    ],
    metrics: [
      { label: "Engineers", value: "40+" },
      { label: "PRs scored / wk", value: "200+" },
      { label: "Payroll runs", value: "Auto" },
    ],
    highlights: [
      "GitHub PR + Linear scoring engine",
      "Slack-first approvals and standups",
      "Automated invoicing for contractors",
    ],
  },
  {
    id: "client-portal",
    index: "04",
    name: "Client Portal",
    category: "Agency Platform",
    status: "Live",
    year: "2024",
    accent: "cyan",
    summary:
      "White-labeled client portal with project rooms, milestone billing, and live status.",
    description:
      "A single source of truth for client engagements: scoped workspaces, file rooms, signed contracts, milestone-based Stripe billing, and live status feeds piped from internal tools.",
    stack: [
      "Next.js",
      "Stripe",
      "PostgreSQL",
      "S3",
      "WebSockets",
      "DocuSign API",
    ],
    metrics: [
      { label: "Active clients", value: "60+" },
      { label: "Auto-invoiced", value: "$1.2M+" },
      { label: "Time-to-onboard", value: "< 1 day" },
    ],
    highlights: [
      "Milestone-based Stripe metered billing",
      "Embedded contract signing flow",
      "Per-client white-label theming",
    ],
  },
  {
    id: "cattle-firm-dashboard",
    index: "05",
    name: "Cattle Firm Dashboard",
    category: "AgriTech Operations",
    status: "Live",
    year: "2024",
    accent: "electric",
    summary:
      "IoT-aware dashboard for cattle operations — health, feed, breeding, and yield analytics.",
    description:
      "Real-time operations console for a multi-site cattle farm. Aggregates sensor data, vet records, and feed cycles. Produces breeding plans, yield forecasts, and exportable compliance reports.",
    stack: [
      "Next.js",
      "Node.js",
      "TimescaleDB",
      "MQTT",
      "Recharts",
      "Tailwind",
    ],
    metrics: [
      { label: "Animals tracked", value: "2,400+" },
      { label: "Sensors", value: "180+" },
      { label: "Feed savings", value: "18%" },
    ],
    highlights: [
      "Time-series ingestion via MQTT bridge",
      "Predictive breeding scheduler",
      "Offline-first field operator app",
    ],
  },
];
