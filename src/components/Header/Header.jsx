import clsx from "clsx";
import styles from "./styles.module.css";
import { useFetcher } from "react-router-dom";

function Header({ username, className }) {
  const fetcher = useFetcher();
  const headerClassNames = clsx(className, styles.container);
  const isSubmitting = fetcher.state === "submitting";

  return (
    <header className={headerClassNames}>
      <div className={styles.message}>
        Welcome to Codeable Keep{" "}
        <span className={styles.username}>{username}</span>
      </div>
      <fetcher.Form method="POST" action="logout">
        <button className={styles.button} disabled={isSubmitting}>
          Exit
        </button>
      </fetcher.Form>
    </header>
  );
}

export default Header;
