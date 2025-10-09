import styles from './PlanShareModal.module.css';

import shareIcon from '../assets/share.svg';
import closeIcon from '../assets/close.svg';
import exportIcon from '../assets/export.svg';

export default function PlanShareModal() {
  return (
    <div className={styles.planShareModal}>
      <img className={styles.close} src={closeIcon} alt="close" />
      <div className={styles.contents}>
        <div className={styles.share}>
          <img src={shareIcon} alt="share" />
          <p>Share to friends</p>
        </div>
        <div className={styles.export}>
          <img src={exportIcon} alt="export" />
          <p>Export to pdf</p>
        </div>
      </div>
    </div>
  );
}
