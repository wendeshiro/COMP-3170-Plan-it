import styles from "./DayPlanCard.module";

export default function DayPlanCard({ cardTitle }) {
    return (
        <div className={styles.dayPlanCardContainer}>
            <div>
                <p className={styles.cardTitle}>{cardTitle}</p>
            </div>
        </div>
    );
}
