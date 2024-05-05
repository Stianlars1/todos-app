"use client";
import { SuccessAnimation } from "@/content/lotties/lotties";
import { useSearchParams } from "next/navigation";

export const SignUpSuccess = () => {
  const searchParams = useSearchParams();
  const signUpSuccess = searchParams.get("signup");

  if (signUpSuccess !== "success") {
    return;
  }
  return (
    <section className="section first-section">
      <SuccessAnimation />
      {/* <p>
        Congratulations! You&apos;ve just become a member. Please log in to
        start organizing your tasks.
      </p> */}
    </section>
  );
};
