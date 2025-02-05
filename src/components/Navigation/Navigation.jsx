import styles from "./Navigation.module.css";

import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className={styles.root}>
      <Link to={"/"} className={styles.link}>
        Home
      </Link>
      <Link to={"/workspaces"} className={styles.link}>
        Workspaces
      </Link>
    </div>
  );
}
