export type TimelineItem = {
  id: string;
  kind: "career" | "education";
  title: string;
  org: string;
  period: string;
  location?: string;
  description: string;
  tags?: string[];
};

export const timeline: TimelineItem[] = [
  {
    id: "wb",
    kind: "career",
    title: "Full Stack Developer",
    org: "Web Briks LLC",
    period: "Oct 2024 — Present",
    location: "Remote",
    description:
      "Lead engineer on internal SaaS platforms and client products. Architecting backend systems, real-time pipelines, and developer tooling that compounds over time.",
    tags: ["SaaS", "Backend", "Real-time", "Automation"],
  },
  {
    id: "ggc",
    kind: "education",
    title: "Bachelor — Political Science",
    org: "Gaibandha Government College",
    period: "Ongoing",
    description:
      "Pursuing a parallel academic track while shipping production software full-time.",
  },
  {
    id: "gac",
    kind: "education",
    title: "HSC",
    org: "Gaibandha Adarsha College",
    period: "Completed",
    description:
      "Higher Secondary Certificate. Built first software projects during this period.",
  },
  {
    id: "abb",
    kind: "education",
    title: "Secondary",
    org: "Amar Bangla Bidyapith",
    period: "Completed",
    description: "Secondary education foundation in mathematics and science.",
  },
  {
    id: "ausns",
    kind: "education",
    title: "Primary",
    org: "Ahammad Uddin Shah Shishu Niketan School and College",
    period: "Completed",
    description:
      "Where the obsession with how systems work first started.",
  },
];
