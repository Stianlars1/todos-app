"use client";

import { updateUserSettings } from "@/app/actions/user/api";
import { LanguageType } from "@/app/actions/user/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useState } from "react";
import "./css/localeSwitcher.css";

type Props = {
  children: ReactNode;
  className?: string;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  className = "",
}: Props) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setIsPending(true);
    try {
      const nextLocale = event.target.value;
      const result = await updateUserSettings({
        language: nextLocale as LanguageType,
      });
      console.log("result", result);

      router.replace(
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        `/${nextLocale}`,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  return (
    <label
      aria-disabled={isPending}
      className={
        isPending
          ? `locale-switcher is-pending ${className}`
          : `locale-switcher ${className} `
      }
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
