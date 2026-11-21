import { MetadataRoute } from "next";
import { companyData } from "@/data/companyData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bhuiyangroup.com.bd";
  const currentDate = new Date().toISOString();

  const concernRoutes = companyData.sisterConcerns.map((concern) => ({
    url: `${baseUrl}/sister-concerns/${concern.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sister-concerns`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...concernRoutes,
  ];
}
