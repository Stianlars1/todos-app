import { SignupAnimation } from "@/content/lotties/lotties";
import styles from "./css/signupHalfPage.module.css";
export const SignupHalfPage = () => {
  return (
    <section
      className={`section first-section signup-animation ${styles.signupFirstSection3d}`}
    >
      <SignupAnimation />

      {/* <div className={styles.svgWrapper}>
        <div className={styles.svg}>
          <div className={styles.svgElements}>
            <SignUpNavbarSVG className={styles.navbar} />
            <SignUpSidebarSVG className={styles.sidebar} />
            <SignUpContentSVG className={styles.content} />
          </div>
        </div>
      </div> */}
    </section>
  );
};
