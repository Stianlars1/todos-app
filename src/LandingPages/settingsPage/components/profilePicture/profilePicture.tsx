"use client";
import { Modal } from "@/components/modal/modal";
import { EditIcon } from "@/components/ui/icons/icons";
import Skeleton from "@/components/ui/skeleton/skeleton";
import Image from "next/image";
import { useState } from "react";
import { ChangeProfilePicture } from "./changeProfilePicture";
import styles from "./css/profilePicture.module.css";
export const ProfilePicture = ({
  profilePicture,
}: {
  profilePicture: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.profilePictureWrapper}>
        {!imageLoaded && (
          <Skeleton
            width={100}
            height={100}
            variant="pulse"
            style={{ borderRadius: "50%", animationDuration: "1s" }}
          />
        )}
        <Image
          className={styles.image}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: `${imageLoaded ? "transparent" : "lightGray"}`,
            cursor: "pointer",
            display: imageLoaded ? "block" : "none",
          }}
          width={100}
          height={100}
          src={profilePicture}
          alt="profile picture"
          onClick={() => setModalOpen(true)}
          priority={true}
          fetchPriority="high"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />

        <EditIcon className={styles.editIcon} />
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ChangeProfilePicture
            initialPicture={profilePicture}
            onSuccess={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};
