import styles from "./SingleActionModal.module.css";
import Modal from "../Modal/Modal";
import { useState, useRef } from "react";

export default function SingleActionModal({ label, action, onCancel }) {
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();

  function actionHandler() {
    const text = inputRef.current.value;
    if (text !== null && text !== "") {
      action(text);
    } else {
      setIsValid(false);
    }
  }

  function cancelHandler() {
    onCancel();
  }

  return (
    <Modal>
      <div className={styles.root}>
        <div className={styles.input_div}>
          <label htmlFor="textInput"> {label} </label>
          <input id={"textInput"} type="text" ref={inputRef} />
          {!isValid && (
            <span style={{ color: "red" }}>
              {label} field cannot be empty.{" "}
            </span>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={actionHandler} className={styles.button}>
            Submit
          </button>
          <button onClick={cancelHandler} className={styles.button}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
