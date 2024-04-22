import { GridMain } from "@/components/grid/gridComponents/gridMain/gridMain";
import { LoginOrSignupPage } from "@/features/loginOrSignup/loginOrSignup";
import { checkAuthentication } from "../lib/sessions";

export default async function Login() {
  const auth = await checkAuthentication();

  if (auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return (
    <GridMain>
      <LoginOrSignupPage variant="signup" />
    </GridMain>
  );
}
