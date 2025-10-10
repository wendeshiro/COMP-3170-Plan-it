import styles from "./InputCard.module.css";
import addIcon from "../assets/add-day-plus-btn.svg";

<<<<<<< HEAD
export default function InputCard({
  cardTitle,
  children,
  showAddButton = true,
  style,
}) {
=======
export default function InputCard({ cardTitle, children, showAddButton = true, style }) {
>>>>>>> 0d9d98aaae75e2610b3f4ba522b41f3ad67f0bed
  return (
    <div className={styles.inputCardContainer} style={style}>
      <div>
        <p className={styles.cardTitle}>{cardTitle}</p>
        {children}
      </div>
      {showAddButton && (
        <button className={styles.addButton}>
          <img src={addIcon} alt="add-day-plus-btn" />
        </button>
      )}
    </div>
  );
}
