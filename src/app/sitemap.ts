import type { MetadataRoute } from "next";

const baseUrl = "https://fuyadhasanfahim.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "about", "experience", "projects", "contact", "blog", "privacy-policy", "terms-and-conditions"].map((path) => ({
    url: path ? `${baseUrl}/${path}` : `${baseUrl}/`,
    lastModified,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7
  }));
}
