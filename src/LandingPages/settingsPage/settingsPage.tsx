import { getUserDetails } from "@/app/actions/user/userApi";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SettingsPageHero } from "./components/settingsPageHero/settingsPageHero";

export const SettingsPage = async () => {
  const userDetails = await getUserDetails();
  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className="settings-page">
        <SettingsPageHeader />

        <SettingsPageHero userDetails={userDetails.data} />
      </div>
    </Suspense>
  );
};

const SettingsPageHeader = async () => {
  const text = await getTranslations("SettingsPage.header");
  return (
    <h1 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
      {text("title")}
    </h1>
  );
};
