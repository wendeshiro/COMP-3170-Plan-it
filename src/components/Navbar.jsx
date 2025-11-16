import styles from "./Navbar.module.css";
import backIcon from "../assets/go-back-btn.svg";
import editIcon from "../assets/edit-btn.svg";
import shareIcon from "../assets/share-btn.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  navTitle,
  onShareClick,
  onEditClick,
  onBackClick,
  showActions = true,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof onBackClick === "function") return onBackClick();
    // default: go back one history entry
    navigate(-1);
  };

  return (
    <nav className={styles.navBarContainer}  id="nav-for-pdf">
      <div className={styles.navItemLeft}>
        <button onClick={handleBack}>
          <img src={backIcon} alt="go-back-btn" width={20} height={20} />
        </button>
      </div>

      <div className="nav-item-middle">
        <h3>{navTitle}</h3>
      </div>
      {/*Note: Title will need to read the current page name and alter accordingly*/}

      <div className="nav-item-right">
        <button
          onClick={onEditClick}
          style={{
            visibility: showActions ? "visible" : "hidden",
            pointerEvents: showActions ? "auto" : "none",
          }}
          aria-hidden={!showActions}
          tabIndex={showActions ? 0 : -1}
        >
          <img src={editIcon} alt="edit-btn" width={20} height={20} />
        </button>
        <button
          onClick={onShareClick}
          className={styles.shareBtn}
          style={{
            visibility: showActions ? "visible" : "hidden",
            pointerEvents: showActions ? "auto" : "none",
          }}
          aria-hidden={!showActions}
          tabIndex={showActions ? 0 : -1}
        >
          <img src={shareIcon} alt="share-btn" width={20} height={20} />
        </button>
      </div>

      {/*Note: Buttons will need to become showable props for later toggleable page use. Also will need a link value. Maybe a visual hover indicator other than just cursor?*/}
    </nav>
  );
}
