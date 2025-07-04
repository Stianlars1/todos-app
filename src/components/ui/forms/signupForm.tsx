"use client";
import { signUp } from "@/app/actions/auth/signUp";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { SignUpButton } from "@/components/ui/forms/components/signupButton";

import { FormError } from "./components/formError/formError";
import { ReCaptcha } from "next-recaptcha-v3";
import { useActionState, useEffect, useRef, useState } from "react";

export const SignUpForm = () => {
  const [state, dispatch] = useActionState(signUp, null);
  const recaptchaRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string>("");
  const [recaptchaKey, setRecaptchaKey] = useState<string>("");
  useEffect(() => {
    if (token && recaptchaRef.current) {
      recaptchaRef.current.value = token;
    }
  }, [token]);

  const handleOnFocus = () => {
    // make the recaptcha re-render by key
    setRecaptchaKey(Date.now().toString());
  };
  return (
    <>
      {state && state.errors && (
        <FormError
          style={{ listStyleType: "none", margin: "0" }}
          errorArray={Object.entries(state.errors).map(([, value]) =>
            value.join(", "),
          )}
        />
      )}
      <CustomForm action={dispatch}>
        <FormContentWrapper>
          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="firstname">First Name</CustomInputLabel>
            <CustomInput
              type="text"
              id="firstname"
              name="firstname"
              width="100%"
              placeholder="Enter your first name.."
              required
              onFocus={handleOnFocus}
            />
            <FormError errorArray={state?.errors?.firstName} />
          </CustomInputLabelWrapper>
          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="lastname">Last Name</CustomInputLabel>
            <CustomInput
              type="text"
              id="lastname"
              name="lastname"
              width="100%"
              placeholder="Enter your last name.."
              required
              onFocus={handleOnFocus}
            />
            <FormError errorArray={state?.errors?.lastName} />
          </CustomInputLabelWrapper>
          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="email">Email address</CustomInputLabel>
            <CustomInput
              type="email"
              id="email"
              name="email"
              width="100%"
              placeholder="Enter your email address.."
              required
              onFocus={handleOnFocus}
            />
            <FormError errorArray={state?.errors?.email} />
          </CustomInputLabelWrapper>
          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="password">Password</CustomInputLabel>
            <CustomInput
              type="password"
              id="password"
              name="password"
              width="100%"
              placeholder="Enter a password.."
              required
              onFocus={handleOnFocus}
            />
            <FormError errorArray={state?.errors?.password} />
          </CustomInputLabelWrapper>

          <input
            ref={recaptchaRef}
            key={token}
            readOnly
            aria-hidden
            style={{ display: "none" }}
            value={token}
            id={"recaptcha"}
            name={"recaptcha"}
          />
        </FormContentWrapper>
        <ReCaptcha
          key={recaptchaKey}
          onValidate={setToken}
          action="signup_page"
        />

        <SignUpButton disabled={!!state?.errorMessage || !!state?.errors} />
      </CustomForm>
    </>
  );
};
