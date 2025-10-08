import { Button } from "./Button";
import styles from "./DeleteModal.module.css";

export default function DeleteModal() {
    return (
        <div className={styles.delete_modal}>
            <div className={styles.delete_text}>
                <h2 className={styles.delete_title}>Are you sure?</h2>
                <h4 className={styles.delete_desc}>
                    This process can not be undone.
                </h4>
            </div>
            <div className={styles.delete_buttons}>
                <Button whiteSmall>Cancel</Button>
                <Button redSmall>Delete</Button>
            </div>
        </div>
    );
}
