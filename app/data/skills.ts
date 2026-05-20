import {
  IconServerBolt,
  IconBolt,
  IconRobot,
  IconApi,
  type Icon,
} from "@tabler/icons-react";

export type SkillGroup = {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: Icon;
  tools: string[];
  signal: string;
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    index: "G.01",
    title: "Backend Architecture",
    description:
      "Domain-driven services with clean module boundaries, strict typing, and observable runtime. I design for failure, not for the happy path.",
    icon: IconServerBolt,
    tools: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "Docker",
    ],
    signal: "p99 < 80ms",
  },
  {
    id: "realtime",
    index: "G.02",
    title: "Real-time Systems",
    description:
      "Event-driven, pub/sub, and stream-based architectures. Presence, live state, and collaborative UX without melting your servers.",
    icon: IconBolt,
    tools: [
      "WebSockets",
      "Socket.IO",
      "Redis Streams",
      "MQTT",
      "Kafka basics",
      "Server-Sent Events",
    ],
    signal: "10k concurrent",
  },
  {
    id: "automation",
    index: "G.03",
    title: "Automation & Bots",
    description:
      "Workflow engines, scheduled jobs, and bots that replace repetitive human cycles. Slack, Discord, GitHub, and webhook orchestration.",
    icon: IconRobot,
    tools: [
      "BullMQ",
      "Cron",
      "Slack Bot Kit",
      "Discord.js",
      "GitHub Actions",
      "Zapier alt",
    ],
    signal: "200+ flows live",
  },
  {
    id: "api",
    index: "G.04",
    title: "API Engineering",
    description:
      "REST, GraphQL, and tRPC APIs designed as a product. Versioning, contracts, auth, rate-limit, and SDKs that delight other developers.",
    icon: IconApi,
    tools: ["REST", "GraphQL", "tRPC", "OpenAPI", "OAuth2", "JWT", "Stripe"],
    signal: "100% typed",
  },
];
