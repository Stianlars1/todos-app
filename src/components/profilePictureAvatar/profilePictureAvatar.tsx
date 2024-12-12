// import { getProfilePicture } from "@/app/actions/user/userApi";
import Image from "next/image";
import "./css/profilePictureAvatar.css";

export const ProfilePictureAvatar = async ({
  alt,
  width,
  height,
  url,
}: {
  alt: string;
  className?: string;
  width: number;
  height: number;
  url: string;
}) => {
  return (
    <Image
      className="profile-picture-avatar"
      src={url}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
