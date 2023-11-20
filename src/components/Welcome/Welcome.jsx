import * as React from "react";
import styles from "./styles.module.css";
import { useAuth } from "../../contexts/authContext";

function Welcome() {
  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [status, setStatus] = React.useState("idle");

  const isSubmitting = status === "submitting";

  async function handleSubmit(event) {
    event.preventDefault();
    setError(false);
    setStatus("submitting");

    try {
      await login(username, password);
    } catch (error) {
      setError(true);
      setStatus("idle");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Codeable Keep</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label htmlFor="username" className={styles.label}>
            username
          </label>
          <input
            id="username"
            type="text"
            placeholder="some-user"
            name="username"
            required
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="password" className={styles.label}>
            password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Entering..." : "Enter"}
        </button>
        {error && <p className={styles.error}>Invalid Credentials</p>}
      </form>
    </div>
  );
}

export default Welcome;
