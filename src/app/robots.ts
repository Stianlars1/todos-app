import { MetadataRoute } from "next";
import { BASE_URL } from "@/utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about-us",
          "/learn-more",
          "/contact",
          "/sign-in",
          "/sign-up",
          "/forgot-password",
        ],
        disallow: [
          "/api/",
          "/*?*",
          "/settings",
          "/dashboard/*",
          "/today",
          "/tags",
          "/logout",
          "/goodbye",
          "/reset-password",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/about-us", "/learn-more", "/contact"],
        disallow: [
          "/api/",
          "/settings",
          "/dashboard/*",
          "/today",
          "/tags",
          "/logout",
          "/goodbye",
          "/reset-password",
          "/*?*",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
