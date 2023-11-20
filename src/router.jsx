import { createBrowserRouter } from "react-router-dom";
import Login, { action as loginAction } from "./routes/Login";
import App, { action as rootAction, loader as rootLoader } from "./routes/App";
import Notes from "./routes/Notes";
import { action as noteAction } from "./routes/note";
import { action as logoutAction } from "./routes/logout";

export const router = createBrowserRouter([
  {
    id: "app",
    path: "/trash?",
    element: <App />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Notes />,
      },
    ],
  },
  {
    path: "/notes/:noteId",
    action: noteAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
]);
