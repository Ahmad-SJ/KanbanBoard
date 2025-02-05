import styles from "./ContextMenu.module.css";
import { useState } from "react";
import OnClickOutside from "../../utilities/useClickOutside";

function ItemsList({ list }) {
  if (list === null) {
    return "";
  } else {
    return (
      <>
        {list.map((item, index) => (
          <div
            key={index}
            className={styles.contextMenuItem}
            onClick={item.action}
          >
            {item.label}
          </div>
        ))}
      </>
    );
  }
}

export default function ContextMenu({ menuItems, className, style }) {
  const [isVisible, setIsVisible] = useState(false);

  function toggleShowMenu() {
    setIsVisible((state) => !state);
  }

  function hideContextMenu() {
    setIsVisible(false);
  }

  return (
    <div className={`${styles.root} ${className}`} style={style}>
      <OnClickOutside action={hideContextMenu}>
        <div
          style={{
            position: "relative",
            width: "32px",
            height: "16px",
          }}
        >
          <button className={styles.menuButton} onClick={toggleShowMenu}>
            <span className={styles.menuButtonSpan}>...</span>
          </button>

          {isVisible && (
            <div className={styles.taskContextMenu} onClick={hideContextMenu}>
              <ItemsList list={menuItems} />
            </div>
          )}
        </div>
      </OnClickOutside>
    </div>
  );
}
