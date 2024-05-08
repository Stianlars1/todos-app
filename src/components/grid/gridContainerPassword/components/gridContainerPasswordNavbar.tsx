import { BASE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export const GridContainerPasswordNavbar = async () => {
  return (
    <nav className="grid-container-password__navbar">
      <Link href={BASE_URL}>
        <Image
          src={"/taskbuddy-with-text-aside.png"}
          alt="taskbuddy logo"
          width={0}
          height={50}
          sizes="auto"
          style={{ width: "auto", height: "50px" }} // optional
        />
      </Link>
    </nav>
  );
};
