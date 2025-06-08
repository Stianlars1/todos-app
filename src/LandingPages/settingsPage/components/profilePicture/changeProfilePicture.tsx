import { uploadProfilePicture } from "@/app/actions/user/api";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import { CustomInput } from "@/components/form/components/customInput/customInput";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@stianlarsen/react-ui-kit";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";

const IMAGE_ACCEPTORS = ".png, .jpg, .jpeg, .gif, .bmp, .webp";
export const ChangeProfilePicture = ({
  initialPicture,
  onSuccess,
}: {
  initialPicture: string;
  onSuccess: () => void;
}) => {
  // The form action handler
  const [state, dispatch] = useActionState(uploadProfilePicture, undefined);

  // The initial profile picture the user already have
  const [imageSaved, setImageSaved] = useState(false);
  const [newSavedImage, setNewSavedImage] = useState<string | null>(null);

  // states
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //

  const imageFileSource = imageFile ? URL.createObjectURL(imageFile) : null;

  // handlers
  const handleImageChange = (e: any) => {
    setImageSaved(false);
    setNewSavedImage(null);
    if (e.target.files) setImageFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob: any) => {
        if (blob) {
          const file = new File([blob], "profilePicture.png", {
            type: "image/png",
          });
          setImageFile(file);
          if (inputRef.current) {
            setImageSaved(true);
            const newImage = URL.createObjectURL(file);
            setNewSavedImage(newImage);
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            inputRef.current.files = dataTransfer.files;
          }
        }
      }, "image/png");
    }
  };

  // effects
  useEffect(() => {
    if (state?.isSuccess) {
      toast.success("Profile picture uploaded successfully!", "bottomRight");
      cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
      onSuccess && onSuccess();
    } else if (state?.isError) {
      console.error("Error uploading profile picture:", state.error);
    }
  }, [state?.isSuccess]);

  return (
    <>
      <div style={{ padding: "1rem" }}>
        {imageFileSource && !imageSaved ? (
          <Cropper
            src={imageFileSource}
            style={{ height: 250, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides
            cropBoxResizable
            cropBoxMovable
            viewMode={1}
            onInitialized={(instance) => setCropper(instance)}
            maxLength={250}
            width={250}
          />
        ) : imageSaved && newSavedImage ? (
          <>
            <Image
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `${imageLoaded ? "transparent" : "lightGray"}`,
              }}
              width={100}
              height={100}
              src={newSavedImage}
              alt="profile picture"
              sizes="250px"
              priority
              fetchPriority="high"
              loading="eager"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <>
            {!imageLoaded && (
              <Skeleton
                width={250}
                height={250}
                variant="skimmer"
                style={{ borderRadius: "50%", animationDuration: "1.4s" }}
              />
            )}
            <Image
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `${imageLoaded ? "transparent" : "lightGray"}`,
                display: imageLoaded ? "block" : "none",
              }}
              width={100}
              height={100}
              src={initialPicture}
              alt="profile picture"
              sizes="250px"
              priority
              fetchPriority="high"
              loading="eager"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </>
        )}

        <CustomForm action={dispatch}>
          <CustomInput
            ref={inputRef}
            type="file"
            onChange={handleImageChange}
            accept={IMAGE_ACCEPTORS}
            name="profilePicture"
            id="profilePicture"
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1.2rem",
            }}
          >
            {!imageSaved && !newSavedImage && imageFile && (
              <Button variant="secondary" type="button" onClick={handleSave}>
                Preview
              </Button>
            )}

            {imageSaved && newSavedImage && (
              <Button variant="primary" type="submit">
                Upload
              </Button>
            )}

            <Button type="button" onClick={() => onSuccess && onSuccess()}>
              Cancel
            </Button>
          </div>
        </CustomForm>
      </div>
    </>
  );
};
