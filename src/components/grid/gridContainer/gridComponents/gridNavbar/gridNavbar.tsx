import { HamburgerMenu } from "@/components/hamburger/hamburger";
import { LocaleSwitcher } from "@/components/languageSwitcher/localeSwitcher";
import { LogoutButton } from "@/components/ui/buttons/logout/logoutButton";
import { DOMAIN_NAME, SUB_URL } from "@/utils/constants";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { TaskBuddyLogo } from "./assets/taskBuddyLogoSvg";
import "./css/gridNavbar.css";
import { Search } from "./Search/Search";
export const GridNavbar = async () => {
  const text = await getTranslations("Buttons.logout");

  return (
    <div className="grid-container__navbar grid-navbar">
      <Link href={SUB_URL} className="grid-navbar__logo">
        <TaskBuddyLogo />
        <span className="grid-navbar__logo__logo-text">{DOMAIN_NAME}</span>
      </Link>

      <Search />

      <div className="grid-navbar__right-side-wrapper">
        <LocaleSwitcher />
        <LogoutButton
          buttonLoadingTitle={text("loadingTitle")}
          buttonTitle={text("title")}
          className="grid-navbar__right-side-wrapper__logout-button"
        />
        <HamburgerMenu className="grid-navbar__right-side-wrapper__hamburger-menu" />
      </div>
    </div>
  );
};
