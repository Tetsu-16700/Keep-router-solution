import * as React from "react";
import Header from "../Header";
import Notes from "../Notes";
import SideBar from "../SideBar";
import styles from "./styles.module.css";
import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} from "../../services/notes";
import { useAuth } from "../../contexts/authContext";

function NotesApp({ username }) {
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = React.useState("notes");
  const [notes, setNotes] = React.useState([]);
  const [status, setStatus] = React.useState("idle"); // idle | loading | success | error

  React.useEffect(() => {
    setStatus("loading");
    getNotes(token)
      .then((body) => {
        setNotes(body.data);
        setStatus("success");
      })
      .catch((error) => console.log(error));
  }, [token]);

  const activeNotes = notes.filter((note) => !note.deleted);
  const deletedNotes = notes.filter((note) => note.deleted);

  const isTrash = currentPage === "trash";
  const currentNotes = isTrash ? deletedNotes : activeNotes;

  function onAddNote(noteData) {
    return createNote(noteData).then((body) => {
      const nextNotes = [...notes, body.data];
      setNotes(nextNotes);
    });
  }

  function onEditNote(id, updateDate) {
    return editNote(id, updateDate)
      .then((body) => {
        const nextNotes = notes.map((note) =>
          note.id === id ? body.data : note
        );
        setNotes(nextNotes);
      })
      .catch((error) => console.log(error));
  }

  function onDeleteNote(id) {
    return deleteNote(id)
      .then(() => {
        const nextNotes = notes.filter((note) => note.id !== id);
        setNotes(nextNotes);
      })
      .catch((error) => console.log(error));
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className={styles.container}>
      <Header username={username} className={styles.header} />
      <SideBar
        className={styles.aside}
        currentPage={currentPage}
        onPageChange={onPageChange}
        numOfActive={activeNotes.length}
        numOfTrash={deletedNotes.length}
        status={status}
      />
      <main className={styles.main}>
        <Notes
          isTrash={isTrash}
          notes={currentNotes}
          onAddNote={onAddNote}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
          status={status}
        />
      </main>
    </div>
  );
}

export default NotesApp;
