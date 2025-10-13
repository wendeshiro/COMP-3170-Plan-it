import styles from "./DayPlanCard.module.css";

export default function DayPlanCard({ cardTitle, weatherIcon, weather, children }) {
  return (
    <div className={styles.dayPlanCardContainer}>
      <div className={styles.dayPlanCardContent}>
        <p className={styles.cardTitle}>{cardTitle}</p>
        <p className={styles.weather}>
          {weatherIcon} {weather}
        </p>
        {children}
      </div>
    </div>
  );
}
