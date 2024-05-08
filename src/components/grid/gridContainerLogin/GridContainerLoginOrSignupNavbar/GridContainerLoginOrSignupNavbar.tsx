import Image from "next/image";
import "./css/login-or-signup-navbar.css";

export const GridContainerLoginOrSignupNavbar = () => {
  return (
    <nav className="login-or-signup-navbar">
      <Image
        alt="logo taskbuddy"
        src={"/taskbuddy-with-text-aside.png"}
        width={0}
        height={0}
        style={{ width: "auto", height: "55px" }}
        sizes="auto"
      />
    </nav>
  );
};
