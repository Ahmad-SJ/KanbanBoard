import { useState } from "react";
import ConfirmDialogue from "../components/ConfirmDialogue/ConfirmDialogue";

export default function useConfirmDialogue(message, action) {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const actionHandler = (data) => {
    action(data);
    hide();
  };

  const modal = isVisible && (
    <ConfirmDialogue
      message={message}
      onConfirm={actionHandler}
      onCancel={hide}
    />
  );
  return { modal, show };
}
