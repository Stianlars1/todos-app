import { LoginOrSignupPage } from "@/LandingPages/loginOrSignup/loginOrSignup";
import { getUserSettings } from "@/app/actions/user/userApi";
import { GridContainerLogin } from "@/components/grid/gridContainerLogin/gridContainerLogin";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";

export default async function Login() {
  const { isAuth } = await verifySession();
  if (isAuth) {
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
