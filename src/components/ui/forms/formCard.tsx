import "./css/form.css";
import { LoginForm } from "./loginForm";
import { SignUpForm } from "./signupForm";
import { Link } from "@/i18/navigation";
import { ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN, ROUTE_SIGNUP } from "@/utils/urls";

export const FormCard = ({ variant }: { variant: "signup" | "login" }) => {
  const isLogin = variant === "login";

  return (
    <div className="form-card">
      <h1>{isLogin ? "Sign in to TaskBuddy" : "Sign up to TaskBuddy"}</h1>

      {isLogin ? <LoginForm /> : <SignUpForm />}

      {isLogin ? (
        <>
          <p className="switchPageStatement">
            Not a member yet?{" "}
            <Link href={ROUTE_SIGNUP} className="link">
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
            <Link href={ROUTE_LOGIN} className="link">
              Log in here
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
};
