import styles from "./InputCardInDetails.module.css";
import addIcon from "../assets/add-day-plus-btn.svg";

export default function InputCard({ cardTitle, children, showAddButton = true, style }) {
  return (
    <div className={styles.inputCardContainer} style={style}>
      <div>
        <p className={styles.cardTitle}>{cardTitle}</p>
        <div className={styles.childContent}>{children}</div>
      </div>
      {showAddButton && (
        <button className={styles.addButton}>
          <img src={addIcon} alt="add-day-plus-btn" />
        </button>
      )}
    </div>
  );
}

// style prop for details page card title resizing → style={{ "--input-label-size": "20px" }}