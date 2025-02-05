import Navigation from "../../components/Navigation/Navigation";
import styles from "./RootLayout.module.css";
import { Link, Outlet } from "react-router-dom";

export default function RootLayout(props) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Navigation />
      </div>
      <div className={styles.body}>
        {props.children}
        <Outlet />
      </div>
      <div className={styles.footer}>
        <h1> RootLayout Footer </h1>
      </div>
    </div>
  );
}
