"use client";
import { login } from "@/app/actions/auth/login";
import { GeistSans } from "geist/font/sans";
import { useFormState } from "react-dom";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { LoginButton } from "./components/LoginButton";
export const LoginForm = () => {
  const [state, dispatch] = useFormState(login, null);
  const errorMessage = state?.errorMessage
    ? getErrorMessage(state.errorMessage)
    : null;

  console.log("state", state);
  return (
    <form className="form" action={dispatch}>
      <div className="form__group">
        <label htmlFor="email">Email</label>
        <input
          className={GeistSans.className}
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="password">Password</label>
        <input
          className={GeistSans.className}
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <ErrorMessage
        errorMessage={errorMessage}
        isError={Boolean(state?.errorMessage)}
        margins={false}
      />
      <LoginButton />
    </form>
  );
};

const getErrorMessage = (errorMessage: string) => {
  console.log("errorMessage", errorMessage);
  switch (errorMessage) {
    case "Authentication failed: Bad credentials":
      return "Invalid email or password";
    case "fetch failed (VPN? Network issues?)":
      return "Network error. Please check your internet connection, firewall, or VPN.";
    default:
      return "An error occurred, please try again or come back another time. We're sorry for the inconvenience.";
  }
};
