import styles from "./DetailsItem.module.css";

export default function DetailsItem({ title, content }) {
  return (
    <div>
      <div className={styles.itemContainer}>
        <p className={styles.label}>{title}</p>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
}
