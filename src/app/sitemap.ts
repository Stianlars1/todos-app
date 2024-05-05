import { BASE_URL } from "@/utils/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/settings"].map(
    (route) => ({
      url: `${BASE_URL}/${route}`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "monthly",
    })
  );

  return [...staticRoutes];
}
