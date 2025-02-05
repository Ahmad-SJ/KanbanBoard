import styles from "./ConfirmDialogue.module.css";
import Modal from "../Modal/Modal";

export default function ConfirmDialogue({ message, onConfirm, onCancel }) {
  function confirmHandler() {
    onConfirm();
  }

  function cancelHandler() {
    onCancel();
  }

  return (
    <Modal>
      <div className={styles.root}>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <button onClick={confirmHandler} className={styles.button}>
            Confirm
          </button>
          <button onClick={cancelHandler} className={styles.button}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
