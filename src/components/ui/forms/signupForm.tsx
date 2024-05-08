"use client";
import { signup } from "@/app/actions/auth/signup";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { SignUpButton } from "@/components/ui/forms/components/signupButton";
import { useFormState } from "react-dom";
import { FormError } from "./components/formError/formError";
export const SignUpForm = () => {
  const [state, dispatch] = useFormState(signup, null);
  console.log("== SignUpForm\nstate", state);
  return (
    <>
      {state?.error?.additional && (
        <FormError
          style={{ listStyleType: "none", margin: "0" }}
          errorArray={[state.error.additional]}
        />
      )}
      {state?.errorMessage && (
        <FormError
          style={{ listStyleType: "none", margin: "0" }}
          errorArray={[state.errorMessage]}
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
            />
            <FormError errorArray={state?.errors?.password} />
          </CustomInputLabelWrapper>
        </FormContentWrapper>
        <SignUpButton />
      </CustomForm>
    </>
  );
};
