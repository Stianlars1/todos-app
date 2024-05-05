import { UserDetailsResponse } from "@/app/actions/user/types";
import { ProfilePictureAvatar } from "@/components/profilePictureAvatar/profilePictureAvatar";
import { IconSettings } from "@/components/ui/icons/icons";
import { TaskBuddyLogo } from "../../../gridNavbar/assets/taskBuddyLogoSvg";
import "./css/gridSidebarFooter.css";
export const GridSidebarFooter = async ({
  userDetails,
}: {
  userDetails: UserDetailsResponse | null;
}) => {
  const full_name = userDetails ? `${userDetails.firstName}` : undefined;
  return (
    <>
      <div className="sidebar__footer">
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
      </div>
    </>
  );
};
