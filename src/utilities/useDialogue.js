import { useState } from "react";

export default function useDialogues(initalState) {
  const [dialogues, setDialogues] = useState(initalState);
  const [dialogueValue, setDialogueValue] = useState({});
  const [openedDialogue, setOpenedDialogue] = useState("");

  function openDialogue({ dialogue, input }) {
    const _dialogues = { ...dialogues };
    _dialogues[dialogue] = true;
    setDialogues(_dialogues);
    setDialogueValue(input);
    setOpenedDialogue(dialogue);
  }

  function closeDialogue(name) {
    const tmp = structuredClone(dialogues);
    if (name) {
      tmp[name] = false;
    } else {
      tmp[openedDialogue] = false;
    }

    setDialogues(tmp);
    setOpenedDialogue("");
  }

  return {
    dialogues: dialogues,
    dialogueValue: dialogueValue,
    openDialogue: openDialogue,
    closeDialogue: closeDialogue,
    setDialogueValue: setDialogueValue,
  };
}

// How to use
// const { dialogues, dialogueValue, openDialogue, closeDialogue } = useDialogues({
//   add: false,
//   edit: false,
//   delete: false,
// });

//onClick(() => openDialogue({dialogue: "edit", input: data}))
