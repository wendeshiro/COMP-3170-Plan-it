import styles from './Navbar.module.css';
import backIcon from '../assets/go-back-btn.svg';
import editIcon from '../assets/edit-btn.svg';
import shareIcon from '../assets/share-btn.svg';

export default function Navbar({
  navTitle,
  onShareClick,
  onEditClick,
  onBackClick,
}) {
  return (
    <nav className={styles.navBarContainer}>
      <div className={styles.navItemLeft}>
        <button onClick={onBackClick}>
          <img src={backIcon} alt="go-back-btn" width={20} height={20} />
        </button>
      </div>

      <div className="nav-item-middle">
        <h3>{navTitle}</h3>
      </div>
      {/*Note: Title will need to read the current page name and alter accordingly*/}

      <div className="nav-item-right">
        <button onClick={onEditClick}>
          <img src={editIcon} alt="edit-btn" width={20} height={20} />
        </button>
        <button onClick={onShareClick} className={styles.shareBtn}>
          <img src={shareIcon} alt="share-btn" width={20} height={20} />
        </button>
      </div>

      {/*Note: Buttons will need to become showable props for later toggleable page use. Also will need a link value. Maybe a visual hover indicator other than just cursor?*/}
    </nav>
  );
}
