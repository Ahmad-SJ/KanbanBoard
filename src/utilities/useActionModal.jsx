import { useState } from "react";
import SingleActionModal from "../components/SingleActionModal/SingleActionModal";

export default function useActionModal(label, action) {
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
    <SingleActionModal label={label} action={actionHandler} onCancel={hide} />
  );
  return { modal, show };
}
