"use client";
import { login } from "@/app/actions/authentication";
import { GeistSans } from "geist/font/sans";
import { useFormState } from "react-dom";
import { LoginButton } from "./components/LoginButton";
export const LoginForm = () => {
  const [state, dispatch] = useFormState(login, null);

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
      <LoginButton />
    </form>
  );
};
