import { UserDTO } from "@/app/actions/user/types";
import { ProfilePictureAvatar } from "@/components/profilePictureAvatar/profilePictureAvatar";
import { IconSettings } from "@/components/ui/icons/icons";
import { navLinks } from "@/content/content";
import { useLinkUrl } from "@/utils/urls";
import Link from "next/link";
import { TaskBuddyLogo } from "../../../gridNavbar/assets/taskBuddyLogoSvg";
import "./css/gridSidebarFooter.css";
export const GridSidebarFooter = async ({
  userDetails,
}: {
  userDetails: UserDTO | null;
}) => {
  const linkUrl = useLinkUrl(navLinks.SETTINGS.href);
  const full_name = userDetails ? `${userDetails.firstName}` : undefined;
  return (
    <>
      <Link href={linkUrl} className="sidebar__footer">
        <div className="sidebar__footer__wrapper">
          {userDetails?.profilePicture ? (
            <ProfilePictureAvatar
              alt="Profile picture avatar"
              width={25}
              height={25}
              url={userDetails.profilePicture}
            />
          ) : (
            <TaskBuddyLogo />
          )}
          <span className="link-text">{full_name}</span>
        </div>
        <IconSettings />
      </Link>
    </>
  );
};
