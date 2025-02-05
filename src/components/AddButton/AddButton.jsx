import styles from "./AddButton.module.css";

export default function AddButton(props) {
  function onClickHandler() {
    props.onClick();
  }

  return (
    <button onClick={onClickHandler} className={styles.trigger_button}>
      +
    </button>
  );
}
