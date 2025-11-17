import styles from "./DetailsItem.module.css";

export default function DetailsItem({ title, content }) {
  return (
    <div>
      <div className={styles.itemContainer}>
        <p className={styles.label}>{title}</p>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
