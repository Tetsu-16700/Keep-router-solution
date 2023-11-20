import * as React from "react";
import styles from "./styles.module.css";
import ColorPicker from "../ColorPicker";

const initialValues = {
  title: "",
  body: "",
  color: "#FFFFFF",
};

function NoteForm({ onAddNote }) {
  const [formData, setFormData] = React.useState(initialValues);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  const isSubmitting = status === "submitting";

  function handleSubmit(event) {
    event.preventDefault();

    setStatus("submitting");
    setError(null);
    onAddNote(formData)
      .then(() => {
        setStatus("idle");
        setFormData(initialValues);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setStatus("idle");
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      style={{ backgroundColor: formData.color }}
    >
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
    </form>
  );
}

export default NoteForm;
