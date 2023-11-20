import styles from "./styles.module.css";
import { authProvider } from "../../auth";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

export async function action({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");
  let password = formData.get("password");

  try {
    await authProvider.login(username, password);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Codeable Keep</h1>
      <Form className={styles.form} method="POST">
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
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Entering..." : "Enter"}
        </button>
        {actionData?.error && (
          <p className={styles.error}>Invalid Credentials</p>
        )}
      </Form>
    </div>
  );
}

export default Login;
