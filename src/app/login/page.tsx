import { GridMain } from "@/components/grid/gridComponents/gridMain/gridMain";
import { LoginOrSignupPage } from "@/features/loginOrSignup/loginOrSignup";
import { redirect } from "next/navigation";
import { checkAuthentication } from "../lib/sessions";

export default async function Login() {
  const auth = await checkAuthentication();
  console.log("\n\n== LOGIN()\nauth", auth);

  if (auth) {
    return redirect("/");
  }
  return (
    <GridMain>
      <LoginOrSignupPage variant="login" />
    </GridMain>
  );
}
