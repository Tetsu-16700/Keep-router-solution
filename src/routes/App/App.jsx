import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import styles from "./styles.module.css";
import { createNote, getNotes } from "../../services/notes";
import { authProvider } from "../../auth";
import {
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getUser } from "../../services/users";

export async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const [username, notes] = await Promise.all([getUser(), getNotes()]);
  const activeNotes = notes.filter((note) => !note.deleted);
  const deletedNotes = notes.filter((note) => note.deleted);

  return { username, activeNotes, deletedNotes };
}

export async function action({ request }) {
  let formData = await request.formData();
  const noteData = Object.fromEntries(formData.entries());
  try {
    await createNote(noteData);
    return redirect("/");
  } catch (error) {
    return { error: error.message };
  }
}

function App() {
  const { username, activeNotes, deletedNotes } = useLoaderData();
  const actionData = useActionData();

  return (
    <div className={styles.container}>
      <Header username={username} className={styles.header} />
      <SideBar
        className={styles.aside}
        numOfActive={activeNotes.length}
        numOfTrash={deletedNotes.length}
      />
      <main className={styles.main}>
        <Outlet context={actionData?.error} />
      </main>
    </div>
  );
}

export default App;
