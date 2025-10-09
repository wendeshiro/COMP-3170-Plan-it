import styles from "./Input.module.css";

function toCamelCase(str) {
  if (!str) return "";
  const cleaned = str.replace(/[^a-zA-Z0-9\s]+/g, " ").trim();
  if (!cleaned) return "";
  const parts = cleaned.split(/\s+/);
  return parts
    .map((p, i) =>
      i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
    )
    .join("");
}

export default function Input({ title, type = "text", showDollar = false }) {
  const id = toCamelCase(title);

  return (
    <div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor={id}>
          {title}
        </label>
        <div className={styles.inputWrapper}>
          {showDollar && <span className={styles.dollarSign}>$</span>}
          <input className={styles.input} type={type} id={id} name={id} />
        </div>
      </div>
    </div>
  );
}
