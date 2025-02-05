import styles from "./Card.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import useActionModal from "../../utilities/useActionModal";
import { boardsActions } from "../../store/slices/boards";

export default function Card({
  title = "placeholder title",
  className = "",
  style = "",
  onClick = null,
}) {
  function onClickHandler() {
    onClick?.();
  }
  return (
    <div className={`${styles.root} ${className} ${style}`}>
      <div className={styles.title} onClick={onClickHandler}>
        <div style={{ fontSize: "1.3rem" }}>&#128279;</div> {title}
      </div>
    </div>
  );
}
