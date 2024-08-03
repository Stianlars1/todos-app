import { locales } from "@/i18n";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./localeSwitcherselect";

export const LocaleSwitcher = ({ className = "" }: { className?: string }) => {
  const text = useTranslations("Navbar.LocaleSwitcher");

  const locale = useLocale();

  return (
    <LocaleSwitcherSelect className={className} defaultValue={locale}>
      {locales.map((cur) => (
        <option
          key={cur}
          value={cur}
          className="locale-switcher__select-wrapper__option"
        >
          {cur === "en" ? "🇺🇸" : "🇳🇴"}{" "}
          {text("language", { locale: cur === "en" ? "English" : "Norwegian" })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
};
