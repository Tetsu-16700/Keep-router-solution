import NoteForm from "../NoteForm";
import NoteList from "../NoteList";
import Spinner from "../Spinner";
import styles from "./styles.module.css";

function Notes({
  notes,
  isTrash,
  onAddNote,
  onEditNote,
  onDeleteNote,
  status,
}) {
  return (
    <div className={styles.container}>
      {!isTrash && <NoteForm onAddNote={onAddNote} />}

      {status === "loading" && <Spinner />}
      {status === "success" && (
        <NoteList
          className={styles["note-list-container"]}
          notes={notes}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
          isTrash={isTrash}
        />
      )}
    </div>
  );
}

export default Notes;
