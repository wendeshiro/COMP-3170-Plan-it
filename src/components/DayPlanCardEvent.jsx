import styles from "./DayPlanCardEvent.module.css";
import eventDot from "../assets/event-dot.svg";

export default function DayPlanCardEvent({ date, time, timeZone, event, note }) {
  return (
    <div className={styles.eventContainer}>
      <div>
        <p className={styles.eventTime}>
          <img className={styles.eventDot} src={eventDot} alt="eventDot" />
          {time} {timeZone}
        </p>
        {date && date.toString().trim() !== "" && <p className={styles.eventDate}>{date}</p>}
      </div>
      <div className={styles.eventDetails}>
        <p className={styles.event}>{event}</p>
        <p className={styles.note}>{note}</p>
      </div>
    </div>
  );
}
