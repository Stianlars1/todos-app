"use client";
import { FormCard } from "@/components/ui/forms/formCard";
import { useSearchParams } from "next/navigation";
import { LoginHalfPage } from "./components/loginHalfPage/loginHalfPage";
import { SignUpSuccess } from "./components/signUpSuccess/signUpSuccess";
import { SignupHalfPage } from "./components/signupHalfpage/signupHalfPage";
import "./css/loginOrSignup.css";
export const LoginOrSignupPage = ({
  variant,
}: {
  variant: "signup" | "login";
}) => {
  const searchParams = useSearchParams();
  const signUpSuccess = searchParams.get("signup") === "success";
  const isLoginPage = variant === "login";

  return (
    <div className="grid-container-login__main login-or-signup">
      {signUpSuccess && <SignUpSuccess />}
      {!signUpSuccess && isLoginPage && <LoginHalfPage />}
      {!signUpSuccess && !isLoginPage && <SignupHalfPage />}
      <section
        className={`forms-section section second-section ${
          signUpSuccess ? "signup-success-on-login" : ""
        }`}
      >
        <FormCard variant={variant} />
      </section>
    </div>
  );
};
