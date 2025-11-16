import { useState, useEffect } from "react";
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
  onChange,
}) {
  const [entries, setEntries] = useState(Array.from({ length: initialEntries }));
  const [values, setValues] = useState(
    Array.from({ length: initialEntries }, () => ({
      location: "",
      date: dateValue || "",
      time: "",
      note: "",
    }))
  );

  // Emit whenever values change (post-render) to avoid setState during render warnings.
  useEffect(() => {
    emit(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  function emit(nextVals) {
    if (typeof onChange === "function") {
      // provide a shallow copy to parent
      onChange(nextVals.map((v) => ({ ...v })));
    }
  }

  function handleAdd() {
    setEntries((s) => [...s, undefined]);
    setValues((s) => {
      const next = [...s, { location: "", date: dateValue || "", time: "", note: "" }];
      return next;
    });
  }

  function handleRemove() {
    setEntries((s) => {
      if (s.length <= 1) return s;
      return s.slice(0, -1);
    });
    setValues((s) => {
      if (s.length <= 1) return s;
      const next = s.slice(0, -1);
      return next;
    });
  }

  return (
    <div className={styles.inputCardContainer} style={style}>
      <div>
        <p className={styles.cardTitle}>{cardTitle}</p>
        <div className={styles.childContent}>
          {entries.map((_, idx) => (
            <div key={idx} className={styles.locationEntry}>
              <Input
                title={`Location ${String(idx + 1).padStart(2, "0")}`}
                value={values[idx]?.location || ""}
                required
                onChange={(e) => {
                  const val = e.target.value;
                  setValues((s) => {
                    const next = s.slice();
                    next[idx] = { ...next[idx], location: val };
                    return next;
                  });
                }}
              />
              <Input title={`Date`} type="date" value={dateValue} readOnly required />
              <Input
                title={`Start Time`}
                type="time"
                value={values[idx]?.time || ""}
                required
                onChange={(e) => {
                  const val = e.target.value;
                  setValues((s) => {
                    const next = s.slice();
                    next[idx] = { ...next[idx], time: val };
                    return next;
                  });
                }}
              />
              <Input
                title={`Note`}
                value={values[idx]?.note || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setValues((s) => {
                    const next = s.slice();
                    next[idx] = { ...next[idx], note: val };
                    return next;
                  });
                }}
              />
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
