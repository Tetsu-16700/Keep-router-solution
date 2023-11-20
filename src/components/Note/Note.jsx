import trashUrl from "../../assets/trash-2.svg";
import recoverUrl from "../../assets/recover.svg";
import styles from "./styles.module.css";
import ColorPicker from "../ColorPicker";
import Spinner from "../Spinner";
import { useFetcher } from "react-router-dom";

function Note({ note, isTrash }) {
  const fetcher = useFetcher();
  const isSubmitting = Boolean(fetcher.formMethod);

  return (
    <div className={styles.note} style={{ backgroundColor: note.color }}>
      <div className={styles.content}>
        <p className={styles.title}>{note.title}</p>
        <p className={styles.body}>{note.body}</p>
      </div>
      <div className={styles.footer}>
        <ColorPicker
          onChange={(event) => {
            fetcher.submit(
              { color: event.target.value },
              {
                method: "PATCH",
                action: `/notes/${note.id}`,
              }
            );
          }}
        />
        <fetcher.Form
          method={isTrash ? "DELETE" : "PATCH"}
          action={`/notes/${note.id}`}
        >
          {!isTrash && <input type="hidden" name="deleted" value="true" />}
          <button className={styles["action-button"]}>
            <img src={trashUrl} width="24" height="24" />
          </button>
        </fetcher.Form>
        {isTrash && (
          <fetcher.Form method="PATCH" action={`/notes/${note.id}`}>
            <button
              className={styles["action-button"]}
              name="deleted"
              value="false"
            >
              <img src={recoverUrl} width="24" height="24" />
            </button>
          </fetcher.Form>
        )}
      </div>
      {isSubmitting && <Spinner className={styles.spinner} />}
    </div>
  );
}

export default Note;
