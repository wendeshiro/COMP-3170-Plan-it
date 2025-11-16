import { useState } from "react";
import styles from "./InputCard.module.css";
import addIcon from "../assets/add-day-plus-btn.svg";
import removeIcon from "../assets/day-minus-btn.svg";
import Input from "./Input";

export default function InputCard({
  cardTitle,
  showAddButton = true,
  style,
  initialEntries = 1,
  dateValue = "",
}) {
  const [entries, setEntries] = useState(Array.from({ length: initialEntries }));

  function handleAdd() {
    setEntries((s) => [...s, undefined]);
  }

  function handleRemove() {
    setEntries((s) => {
      if (s.length <= 1) return s;
      return s.slice(0, -1);
    });
  }

  return (
    <div className={styles.inputCardContainer} style={style}>
      <div>
        <p className={styles.cardTitle}>{cardTitle}</p>
        <div className={styles.childContent}>
          {entries.map((_, idx) => (
            <div key={idx} className={styles.locationEntry}>
              <Input title={`Location ${String(idx + 1).padStart(2, "0")}`} />
              <Input title={`Date`} type="date" value={dateValue} readOnly />
              <Input title={`Start Time`} type="time" />
              <Input title={`Note`} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cardButtons}>
        {entries.length > 1 && (
          <button className={styles.removeButton} onClick={handleRemove}>
            <img src={removeIcon} alt="remove-location-btn" />
          </button>
        )}
        {showAddButton && (
          <button className={styles.addButton} onClick={handleAdd}>
            <img src={addIcon} alt="add-day-plus-btn" />
          </button>
        )}
      </div>
    </div>
  );
}

// style prop for details page card title resizing → style={{ "--input-label-size": "20px" }}
