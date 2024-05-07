import "./css/form.css";
import { LoginForm } from "./loginForm";
import { SignUpForm } from "./signupForm";
export const FormCard = ({ variant }: { variant: "signup" | "login" }) => {
  const isLogin = variant === "login";

  return (
    <div className="form-card">
      <h1>{isLogin ? "Login" : "Sign up"}</h1>

      {isLogin ? <LoginForm /> : <SignUpForm />}

      {isLogin ? (
        <>
          <p className="switchPageStatement">
            Not a member yet?{" "}
            <a href="/signup" className="link">
              Sign up here
            </a>
            .
          </p>
          <p className="switchPageStatement">
            <a href="/forgot-password" className="link">
              Forgot password?
            </a>
          </p>
        </>
      ) : (
        <>
          <p className="switchPageStatement">
            Already have an account?{" "}
            <a href="/login" className="link">
              Log in here
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
};
