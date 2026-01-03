import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getBasicUser } from "@/app/actions/user/getBasicUser";

// export default getRequestConfig(async ({ requestLocale }) => {
//   // Typically corresponds to the `[locale]` segment
//   const requested = await requestLocale;
//   const locale = hasLocale(routing.locales, requested)
//     ? requested
//     : routing.defaultLocale;
//
//   const chosenMessages = await import(`../../messages/${locale}.json`);
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
  const user = await getBasicUser();

  const locale2 = user && user.locale ? user.locale : locale;
  const messagesByLocale = (await import(`../../messages/${locale2}.json`))
    .default;
  return {
    locale: locale2,
    messages: messagesByLocale,
  };
});
