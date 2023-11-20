import * as React from "react";
import trashUrl from "../../assets/trash-2.svg";
import recoverUrl from "../../assets/recover.svg";
import styles from "./styles.module.css";
import ColorPicker from "../ColorPicker";
import Spinner from "../Spinner";

function Note({ note, onEditNote, onDeleteNote, isTrash }) {
  const [status, setStatus] = React.useState("idle");
  const isSubmitting = status === "submitting";

  return (
    <div className={styles.note} style={{ backgroundColor: note.color }}>
      <div className={styles.content}>
        <p className={styles.title}>{note.title}</p>
        <p className={styles.body}>{note.body}</p>
      </div>
      <div className={styles.footer}>
        <ColorPicker
          onChange={(e) => {
            setStatus("submitting");
            onEditNote(note.id, { color: e.target.value }).finally(() =>
              setStatus("idle")
            );
          }}
        />
        <button
          className={styles["action-button"]}
          onClick={() => {
            setStatus("submitting");
            isTrash
              ? onDeleteNote(note.id).then(() => setStatus("idle"))
              : onEditNote(note.id, { deleted: true }).finally(() =>
                  setStatus("idle")
                );
          }}
        >
          <img src={trashUrl} width="24" height="24" />
        </button>
        {isTrash && (
          <button
            className={styles["action-button"]}
            onClick={() => {
              setStatus("submitting");
              onEditNote(note.id, { deleted: false }).finally(() =>
                setStatus("idle")
              );
            }}
          >
            <img src={recoverUrl} width="24" height="24" />
          </button>
        )}
      </div>
      {isSubmitting && <Spinner className={styles.spinner} />}
    </div>
  );
}

export default Note;
