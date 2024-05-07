"use client";

import { updateUserSettings } from "@/app/actions/user/api";
import { LanguageType } from "@/app/actions/user/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useState } from "react";
import "./css/localeSwitcher.css";
type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  async function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setIsPending(true);
    try {
      const nextLocale = event.target.value;
      await updateUserSettings({ language: nextLocale as LanguageType });

      router.replace(
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        `/${nextLocale}`
      );
    } catch (e) {
      console.log("errrr", e);
      return null;
    }
  }

  return (
    <label
      aria-disabled={isPending}
      className={isPending ? "locale-switcher is-pending" : "locale-switcher "}
    >
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6 locale-switcher__select-wrapper"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
