// import { getProfilePicture } from "@/app/actions/user/userApi";
import Image from "next/image";
import { CSSProperties } from "react";
import "./css/profilePictureAvatar.css";
export const ProfilePictureAvatar = async ({
  alt,
  className,
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
  const widthAndHeight: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };

  //   const imageUrl = await getProfilePicture();

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
