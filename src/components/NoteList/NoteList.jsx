import clsx from "clsx";
import styles from "./styles.module.css";
import Note from "../Note/Note";

function NoteList({ className, notes, onDeleteNote, onEditNote, isTrash }) {
  const containerClassNames = clsx(className, styles.container);

  if (notes.length === 0) {
    return <p className={styles.empty}>No notes</p>;
  }

  return (
    <div className={containerClassNames}>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
          isTrash={isTrash}
        />
      ))}
    </div>
  );
}

export default NoteList;
