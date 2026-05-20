import {
  IconBrandReact,
  IconBrandNodejs,
  IconApi,
  IconBrandJavascript,
  type Icon,
} from "@tabler/icons-react";

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  level: string;
  icon: Icon;
  accent: "cyan" | "electric" | "violet" | "white";
};

export const certificates: Certificate[] = [
  {
    id: "react-fe",
    name: "React (Frontend Developer)",
    issuer: "HackerRank",
    level: "Verified",
    icon: IconBrandReact,
    accent: "cyan",
  },
  {
    id: "node-int",
    name: "Node.js (Intermediate)",
    issuer: "HackerRank",
    level: "Intermediate",
    icon: IconBrandNodejs,
    accent: "electric",
  },
  {
    id: "rest-int",
    name: "REST API (Intermediate)",
    issuer: "HackerRank",
    level: "Intermediate",
    icon: IconApi,
    accent: "violet",
  },
  {
    id: "js-int",
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    level: "Intermediate",
    icon: IconBrandJavascript,
    accent: "white",
  },
];
