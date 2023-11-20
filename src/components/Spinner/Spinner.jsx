import { Loader } from "react-feather";

import styles from "./styles.module.css";
import clsx from "clsx";

function Spinner({
  color = "black",
  size = 24,
  opacity = 0.5,
  speed = 1200,
  className,
}) {
  const classNames = clsx(styles.wrapper, className);

  return (
    <span
      className={classNames}
      style={{
        opacity,
        "--speed": `${speed}ms`,
        width: size,
        height: size,
      }}
    >
      <Loader color={color} size={size} />
    </span>
  );
}

export default Spinner;
