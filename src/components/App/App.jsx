import * as React from "react";
import NotesApp from "../NotesApp";
import Welcome from "../Welcome";
import styles from "./styles.module.css";
import { useAuth } from "../../contexts/authContext";
import { URL_BASE } from "../../constants";

function App() {
  const [username, setUsername] = React.useState("");
  const { token } = useAuth();

  React.useEffect(() => {
    if (!token) return;

    const url = URL_BASE + "/user";
    const options = { headers: { Authorization: `bearer ${token}` } };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((body) => {
        setUsername(body.data);
      });
  }, [token]);

  return (
    <div className={styles.container}>
      {token ? <NotesApp username={username} /> : <Welcome />}
    </div>
  );
}

export default App;
