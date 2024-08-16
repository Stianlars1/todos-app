import { GoodbyeImage } from "./components/goodbyeImage";
import { GoodbyeNavbar } from "./components/goodbyeNavbar";
import styles from "./css/goodbyePage.module.css";
export const GoodbyePage = async () => {
  // deleted account goodbye page

  return (
    <>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <div className={styles.navImageWrapper}>
            <GoodbyeNavbar className={styles.navImage} />
          </div>
          <div className={styles.navText}>TaskBuddy</div>
        </nav>
        <header className={styles.header}>
          <div className={styles.imageWrapper}>
            <GoodbyeImage className={styles.svg} />
          </div>
          <h1>We&apos;re sorry to see you go!</h1>
        </header>
        <div className={styles.hero}>
          <div className={styles.section}>
            <p>
              Your TaskBuddy account has been successfully deleted. We&apos;re
              sorry to see you leave, but we respect your decision.
            </p>
          </div>
          <div className={styles.section}>
            <p>
              All your tasks and data have been <strong>permanently</strong>{" "}
              deleted from our servers.
            </p>
          </div>

          <div className={styles.section}>
            <p>
              If you ever change your mind,{" "}
              <strong>we&apos;re always here to welcome you back.</strong> Your
              productivity journey with TaskBuddy doesn&apos;t have to end here.
              Should you need any assistance or have any feedback, please
              don&apos;t hesitate to reach out. We would love to hear from you.
            </p>
          </div>

          <div className={styles.section}>
            <p className={styles.mutedText}>
              Warm regards,
              <br />
              The TaskBuddy Team
            </p>
          </div>

          <div className={styles.section}>
            <p className={styles.mutedText}>
              Visit us:{" "}
              <a href="https://taskbuddy.dev">https://taskbuddy.dev</a>
            </p>
          </div>

          <div className={styles.section}>
            <div>
              <p className={styles.mutedText}>
                Thank you for using TaskBuddy to manage your tasks. We hope to
                see you again in the future.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
