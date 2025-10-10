import styles from "./Navbar.module.css";
import backIcon from "../assets/go-back-btn.svg";
import editIcon from "../assets/edit-btn.svg";
import shareIcon from "../assets/share-btn.svg";

export default function Navbar({ navTitle }) {
  return (
    <nav className={styles.navBarContainer}>
      <div className="nav-item-left">
        <button onClick={console.log("Back button clicked")}>
          <img src={backIcon} alt="go-back-btn" width={20} height={20} />
        </button>
      </div>

      <div className="nav-item-middle">
        <h3>{navTitle}</h3>
      </div>

      <div className="nav-item-right">
        <button onClick={console.log("Edit button clicked")}>
          <img src={editIcon} alt="edit-btn" width={20} height={20} />
        </button>
        <button onClick={console.log("Share button clicked")}>
          <img src={shareIcon} alt="share-btn" width={20} height={20} />
        </button>
      </div>
    </nav>
  );
}
