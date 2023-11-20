import * as React from "react";
import styles from "./styles.module.css";
import ColorPicker from "../ColorPicker";
import { Form, useNavigation, useOutletContext } from "react-router-dom";

const initialValues = {
  title: "",
  body: "",
  color: "#FFFFFF",
};

function NoteForm() {
  const [formData, setFormData] = React.useState(initialValues);
  const navigation = useNavigation();
  const error = useOutletContext();
  const isSubmitting = Boolean(navigation.formMethod);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  React.useEffect(() => {
    if (navigation.state === "idle" && !error) {
      setFormData(initialValues);
    }
  }, [navigation.state, error]);

  return (
    <Form
      method="POST"
      action="/"
      className={styles.form}
      style={{ backgroundColor: formData.color }}
    >
      <input type="hidden" name="color" value={formData.color} />
      <input
        type="text"
        name="title"
        placeholder="title"
        className={styles.title}
        aria-label="title"
        value={formData.title}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <textarea
        name="body"
        className={styles.body}
        placeholder="Your note..."
        aria-label="body"
        value={formData.body}
        onChange={handleChange}
        disabled={isSubmitting}
      ></textarea>
      <div className={styles.footer}>
        <ColorPicker name="color" onChange={handleChange} />
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Keeping it..." : "Keep it"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </Form>
  );
}

export default NoteForm;
