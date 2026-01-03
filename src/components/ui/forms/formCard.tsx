import "./css/form.scss";
import { LoginForm } from "./loginForm";
import { SignUpForm } from "./signupForm";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "@/utils/urls";
import Link from "next/link";

export const FormCard = ({ variant }: { variant: "signup" | "signIn" }) => {
  const isLogin = variant === "signIn";

  return (
    <div className="form-card">
      <h1>{isLogin ? "Sign in to TaskBuddy" : "Sign up to TaskBuddy"}</h1>

      {isLogin ? <LoginForm /> : <SignUpForm />}

      {isLogin ? (
        <>
          <p className="switchPageStatement">
            Not a member yet?{" "}
            <Link href={ROUTE_SIGN_UP} className="link">
              Sign up here
            </Link>
            .
          </p>
          <p className="switchPageStatement">
            <Link href={ROUTE_FORGOT_PASSWORD} className="link">
              Forgot password?
            </Link>
          </p>
        </>
      ) : (
        <>
          <p className="switchPageStatement">
            Already have an account?{" "}
            <Link href={ROUTE_SIGN_IN} className="link">
              Log in here
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
};
