import { LoginOrSignupPage } from "@/LandingPages/loginOrSignup/loginOrSignup";
import { verifyAuthentication } from "@/app/actions/authentication";
import { getUserSettings } from "@/app/actions/user/userApi";
import { GridContainerLogin } from "@/components/grid/gridContainerLogin/gridContainerLogin";
import { redirect } from "next/navigation";

export default async function Login() {
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
      <GridContainerLogin>
        <LoginOrSignupPage variant="login" />
      </GridContainerLogin>
    </>
  );
}
