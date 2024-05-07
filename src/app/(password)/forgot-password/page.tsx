import { ForgotPasswordCommonContainer } from "@/LandingPages/forgotPassword/forgotPasswordCommonContainer";
import { verifyAuthentication } from "@/app/actions/authentication";
import { getUserSettings } from "@/app/actions/user/userApi";
import { GridContainerPassword } from "@/components/grid/gridContainerPassword/gridContainerPassword";
import { redirect } from "next/navigation";

export default async function ForgotPassword() {
  const isAuthenticated = await verifyAuthentication();

  if (isAuthenticated) {
    const userSettings = await getUserSettings();
    if (userSettings.data?.language) {
      const locale = userSettings.data.language;
      return redirect(`/${locale}`);
    }
    redirect("/");
  }

  return (
    <>
      <GridContainerPassword>
        <ForgotPasswordCommonContainer variant="forgot-password" />
      </GridContainerPassword>
    </>
  );
}
