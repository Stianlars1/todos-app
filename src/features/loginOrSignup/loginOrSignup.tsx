"use client";
import { FormCard } from "@/components/ui/forms/formCard";
import { useSearchParams } from "next/navigation";
import { SignUpSuccess } from "./components/signUpSuccess/signUpSuccess";
import "./css/loginOrSignup.css";
export const LoginOrSignupPage = ({
  variant,
}: {
  variant: "signup" | "login";
}) => {
  const searchParams = useSearchParams();
  const signUpSuccess = searchParams.get("signup") === "success";
  console.log("\n signup-success-on-login", signUpSuccess);

  return (
    <div className="login-or-signup">
      {signUpSuccess && <SignUpSuccess />}

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
