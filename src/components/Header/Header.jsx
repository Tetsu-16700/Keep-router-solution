import clsx from "clsx";
import styles from "./styles.module.css";
import { useAuth } from "../../contexts/authContext";

function Header({ username, className }) {
  const { logout } = useAuth();
  const headerClassNames = clsx(className, styles.container);

  return (
    <header className={headerClassNames}>
      <div className={styles.message}>
        Welcome to Codeable Keep{" "}
        <span className={styles.username}>{username}</span>
      </div>
      <button onClick={logout} className={styles.button}>
        Exit
      </button>
    </header>
  );
}

export default Header;
