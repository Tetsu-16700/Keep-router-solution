import { useLocation } from "react-router-dom";
import NoteForm from "../../components/NoteForm";
import NoteList from "../../components/NoteList";
import styles from "./styles.module.css";

function Notes() {
  const location = useLocation();
  const isTrash = location.pathname.includes("trash");

  return (
    <div className={styles.container}>
      {!isTrash && <NoteForm />}

      <NoteList className={styles["note-list-container"]} />
    </div>
  );
}

export default Notes;
