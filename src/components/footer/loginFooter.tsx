import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";
import "./css/footer.css";

export const LoginFooter = () => {
  return (
    <>
      <footer className="grid-container-login__footer">
        <Copyright />

        <div className="social-links">
          <Link
            href="https://stianlarsen.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Stian Larsen's personal portfolio website"
          >
            <Image
              src={"/stian-bitmoji.png"}
              width={24}
              height={24}
              alt="Bitmoji of stian larsen"
            />
            <span>Stian Larsen</span>
          </Link>
          <Link
            href="https://github.com/stianlars1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Stian Larsen's GitHub profile"
          >
            <FaGithub />
            <span>/stianlars1</span>
          </Link>
          <Link
            href="https://instagram.com/stianlarsen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Stian Larsen's Instagram profile"
          >
            <FaInstagram />
            <span>stianlarsen</span>
          </Link>
          <Link
            href="mailto:stian.larsen@mac.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send an email to Stian Larsen"
          >
            <FaEnvelope />
            <span>stian.larsen@mac.com</span>
          </Link>
        </div>
      </footer>
    </>
  );
};

const Copyright = () => {
  const yearEstablished = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <p>
      ©{" "}
      {yearEstablished !== currentYear
        ? `${yearEstablished} - ${currentYear}`
        : currentYear}{" "}
      Stian Larsen. All rights reserved.
    </p>
  );
};
