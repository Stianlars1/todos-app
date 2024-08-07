import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import usePlatform from "@/hooks/usePlatform";
import styles from "./css/character.module.css";
export const SearchShortcut = ({
  hide,
  className = "",
}: {
  hide: boolean;
  className: string;
}) => {
  const platform = usePlatform();
  const { isMobile } = useBrowserInfo();

  if (hide || isMobile) {
    return null;
  }

  return (
    <div className={className}>
      {platform === "mac" && (
        <>
          <ShortCut character="⌘" /> {"+"} <ShortCut character="K" />
        </>
      )}
      {platform === "windows" && (
        <>
          <ShortCut character="Ctrl" /> {"+"} <ShortCut character="K" />
        </>
      )}
    </div>
  );
};

const ShortCut = ({ character }: { character: string }) => {
  return <span className={`${styles.character} shortcut `}>{character}</span>;
};
