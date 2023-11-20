import clsx from "clsx";
import Spinner from "../Spinner";

import bracesUrl from "../../assets/braces.svg";
import trashUrl from "../../assets/trash.svg";
import styles from "./styles.module.css";

function SideBar({
  className,
  currentPage,
  onPageChange,
  numOfActive,
  numOfTrash,
  status,
}) {
  const containerClassNames = clsx(className, styles.container);

  function getListItemClasses(page) {
    return clsx(styles["list-item"], {
      [styles.active]: currentPage === page,
    });
  }

  const isLoading = status === "loading";

  return (
    <aside className={containerClassNames}>
      <ul className={styles.list}>
        <li
          onClick={() => onPageChange("notes")}
          className={getListItemClasses("notes")}
        >
          <img src={bracesUrl} alt="" />
          Notes
          {isLoading ? <Spinner size={18} /> : <div>({numOfActive})</div>}
        </li>
        <li
          onClick={() => onPageChange("trash")}
          className={getListItemClasses("trash")}
        >
          <img src={trashUrl} alt="" />
          Trash
          {isLoading ? <Spinner size={18} /> : <div>({numOfTrash})</div>}
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
