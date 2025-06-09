import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { verifySession } from "@/lib/dal";

// export default getRequestConfig(async ({ requestLocale }) => {
//   // Typically corresponds to the `[locale]` segment
//   const requested = await requestLocale;
//   const locale = hasLocale(routing.locales, requested)
//     ? requested
//     : routing.defaultLocale;
//
//   const chosenMessages = await import(`../../messages/${locale}.json`);
//   console.log("requested", requested);
//   console.log("locale", locale);
//   console.log(
//     "hasLocale(routing.locales, requested)",
//     hasLocale(routing.locales, requested),
//   );
//   console.log("chosenMessages", chosenMessages);
//   console.log("locale", locale);
//   return {
//     locale,
//     messages: chosenMessages,
//   };
// });

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const { user } = await verifySession();

  const locale2 = user?.locale || locale;
  const messagesByLocale = (await import(`../../messages/${locale2}.json`))
    .default;
  return {
    locale: locale2,
    messages: messagesByLocale,
  };
});
