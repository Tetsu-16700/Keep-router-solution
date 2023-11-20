import clsx from "clsx";
import Spinner from "../Spinner";

import bracesUrl from "../../assets/braces.svg";
import trashUrl from "../../assets/trash.svg";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

function SideBar({ className, numOfActive, numOfTrash }) {
  const containerClassNames = clsx(className, styles.container);

  const isLoading = false;

  return (
    <aside className={containerClassNames}>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(styles["list-item"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src={bracesUrl} alt="" />
            Notes
            {isLoading ? <Spinner size={18} /> : <div>({numOfActive})</div>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trash"
            className={({ isActive }) =>
              clsx(styles["list-item"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src={trashUrl} alt="" />
            Trash
            {isLoading ? <Spinner size={18} /> : <div>({numOfTrash})</div>}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
