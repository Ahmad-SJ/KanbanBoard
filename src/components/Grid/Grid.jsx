import styles from "./Grid.module.css";

export default function Grid(props) {
  return (
    <div id="Grid" className={`${styles.root} ${props.className}`}>
      {props.children}
    </div>
  );
}
