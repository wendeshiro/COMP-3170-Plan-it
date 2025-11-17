import { useState, useEffect } from "react";
import styles from "./DayPlanCardEvent.module.css";
import eventDot from "../assets/event-dot.svg";

export default function DayPlanCardEvent({
  date,
  time,
  timeZone,
  location,
  note,
  isEditing = false, // new prop to toggle edit mode
  onChange = () => {}, // new prop to emit changes
}) {
  // Local state during editing to keep input controlled
  const [localTime, setLocalTime] = useState(time || "");
  const [localEvent, setLocalEvent] = useState(location || "");
  const [localNote, setLocalNote] = useState(note || "");

  // Keep local state in sync if parent props change (e.g., when entering edit mode)
  useEffect(() => {
    setLocalTime(time || "");
    setLocalEvent(location || "");
    setLocalNote(note || "");
  }, [time, location, note]);

  // Update state and notify parent on change
  const handleChange = (field, value) => {
    if (field === "time") setLocalTime(value);
    if (field === "location") setLocalEvent(value);
    if (field === "note") setLocalNote(value);

    onChange(field, value);
  };

  if (isEditing) {
    return (
      <div className={styles.eventContainer}>
        <div>
          <input
            className={styles.inputTime}
            type="time"
            value={localTime}
            onChange={(e) => handleChange("time", e.target.value)}
          />
          {timeZone && <span className={styles.timeZone}>{timeZone}</span>}
          {date && date.toString().trim() !== "" && (
            <p className={styles.eventDate}>{date}</p>
          )}
        </div>
        <div className={styles.eventDetails}>
          <input
            className={styles.inputEvent}
            type="text"
            value={localEvent}
            placeholder="Event"
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <input
            className={styles.inputNote}
            type="text"
            value={localNote}
            placeholder="Note"
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>
      </div>
    );
  }

  // Default display mode (non-editable)
  return (
    <div className={styles.eventContainer}>
      <div>
        <p className={styles.eventTime}>
          <img className={styles.eventDot} src={eventDot} alt="eventDot" />
          {time} {timeZone}
        </p>
        {date && date.toString().trim() !== "" && (
          <p className={styles.eventDate}>{date}</p>
        )}
      </div>
      <div className={styles.eventDetails}>
        <p className={styles.event}>{location}</p>
        <p className={styles.note}>{note}</p>
      </div>
    </div>
  );
}
