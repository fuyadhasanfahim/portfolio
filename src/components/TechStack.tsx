"use client";

import type { Icon } from "@tabler/icons-react";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFramerMotion,
  IconBrandNodejs,
  IconServer2,
  IconDatabase,
  IconBrandMongodb,
  IconBrandPrisma,
  IconBolt,
  IconShieldLock,
  IconKey,
  IconBrandDocker,
  IconStack2,
  IconPlugConnected,
  IconRobot,
  IconCircleCheck,
  IconBrandRedux,
  IconBrandStripe,
  IconBrandPaypal,
  IconSparkles,
  IconBrain,
} from "@tabler/icons-react";
import { techGroups } from "@/lib/data";
import { RevealGroup, RevealItem } from "./motion/Reveal";

const ICONS: Record<string, Icon> = {
  "Next.js": IconBrandNextjs,
  React: IconBrandReact,
  TypeScript: IconBrandTypescript,
  "Tailwind CSS": IconBrandTailwind,
  "Framer Motion": IconBrandFramerMotion,
  "Node.js": IconBrandNodejs,
  Express: IconServer2,
  PostgreSQL: IconDatabase,
  MongoDB: IconBrandMongodb,
  Prisma: IconBrandPrisma,
  Neon: IconBolt,
  Redis: IconDatabase,
  "Better Auth": IconShieldLock,
  NextAuth: IconShieldLock,
  JWT: IconKey,
  Docker: IconBrandDocker,
  BullMQ: IconStack2,
  "Socket.io": IconPlugConnected,
  Puppeteer: IconRobot,
  Zod: IconCircleCheck,
  Redux: IconBrandRedux,
  Stripe: IconBrandStripe,
  PayPal: IconBrandPaypal,
  "Google Gemini": IconSparkles,
  "AI / LLM APIs": IconBrain,
};

export default function TechStack() {
  return (
    <RevealGroup className="space-y-10" stagger={0.06}>
      {techGroups.map((group) => (
        <RevealItem key={group.category}>
          <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:gap-8">
            <h3 className="text-xs uppercase tracking-[0.18em] text-muted/70 sm:pt-2.5">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((tech) => {
                const Ico = ICONS[tech] ?? IconStack2;
                return (
                  <span
                    key={tech}
                    className="glass group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-acc/60 hover:text-ink hover:shadow-[0_0_24px_-10px_var(--acc-glow)]"
                  >
                    <Ico
                      size={16}
                      stroke={1.6}
                      className="text-muted transition-colors duration-300 group-hover:text-acc"
                    />
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
