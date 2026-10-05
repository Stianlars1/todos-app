"use client";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";

// Static routes under /[locale]/(home). Any other segment there is a user-named dashboard.
const STATIC_HOME_ROUTES = ["settings", "today", "tags"];

// Drop query/hash (reset-password tokens) and collapse dashboard names into one bucket.
const redactUrl = (event: BeforeSendEvent): BeforeSendEvent => {
  const url = new URL(event.url);
  const [locale, segment, ...rest] = url.pathname.split("/").filter(Boolean);

  let path = url.pathname;
  if (
    routing.locales.includes(locale as (typeof routing.locales)[number]) &&
    segment &&
    !STATIC_HOME_ROUTES.includes(segment)
  ) {
    path = ["", locale, "[dashboard]", ...rest].join("/");
  }

  return { ...event, url: `${url.origin}${path}` };
};

export const AppAnalytics = () => <Analytics beforeSend={redactUrl} />;
