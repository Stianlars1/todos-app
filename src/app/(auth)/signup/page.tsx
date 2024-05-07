import { LoginOrSignupPage } from "@/LandingPages/loginOrSignup/loginOrSignup";
import { GridContainerLogin } from "@/components/grid/gridContainerLogin/gridContainerLogin";
import { redirect } from "next/navigation";
import { verifyAuthentication } from "../../actions/authentication";

export default async function Signup() {
  const isAuthenticated = await verifyAuthentication();

  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <GridContainerLogin>
      <LoginOrSignupPage variant="signup" />
    </GridContainerLogin>
  );
}
