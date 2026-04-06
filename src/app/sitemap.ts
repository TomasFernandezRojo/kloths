import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kloths.com.ar";

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
    {
      url: `${baseUrl}/carrito`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
