import styles from "./styles/notFound.module.scss";
import { Link } from "@/i18/navigation";
import { ROUTE_ROOT } from "@/utils/urls";

export default async function NotFound() {
  return (
    <>
      <div className={styles.notFound}>
        <h1 className={styles.title}>Not Found</h1>

        <p className={styles.paragraph}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <p className={styles.paragraph}>
          You can go back to the previous page by clicking{" "}
          <Link prefetch href={ROUTE_ROOT}>
            here
          </Link>
        </p>
      </div>
    </>
  );
}
