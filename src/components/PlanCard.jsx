import React from "react";
import styles from "./PlanCard.module.css";
import member1 from "../assets/member1.jpeg";
import member2 from "../assets/member2.jpeg";
import member3 from "../assets/member3.jpeg";
import checkIcon from "../assets/check.svg";
import arrowIcon from "../assets/rightarrow.svg";

export default function PlanCard({
  planId,
  planName,
  planDate,
  daysCount,
  onSeeDetails,
  selectMode = false,
  isChecked = false,
  onCheckChange,
}) {
  const handleCheckboxClick = () => {
    if (onCheckChange && planId) {
      onCheckChange(planId, !isChecked);
    }
  };

  const handleSeeDetailsClick = () => {
    if (selectMode) {
      // when in select mode, toggle checkbox
      handleCheckboxClick();
      return;
    }
    if (typeof onSeeDetails === "function") {
      onSeeDetails(planId);
      return;
    }
    // fallback behavior for existing apps
    alert("See details clicked!");
  };

  return (
    <div className={styles.planCard} onClick={handleSeeDetailsClick} role="button">
      <div className={styles.textContents}>
        <h3>{planName}</h3>
        <p>{planDate}</p>
      </div>
      {selectMode && (
        <div className={styles.checkBox} onClick={handleCheckboxClick}>
          {isChecked && <img src={checkIcon} alt="check" />}
        </div>
      )}
      <div>
        {/* <div className={styles.dynamicContents}>
          <img src={member1} alt="member1" />
          <img src={member2} alt="member2" />
          <img src={member3} alt="member3" />
        </div> */}
        <div className={styles.daysCount}>{daysCount} Days</div>
        <div
          className={styles.detailsSection}
          onClick={handleSeeDetailsClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSeeDetailsClick();
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <button className={styles.seeDetailsButton}>See details</button>
          <img src={arrowIcon} alt="arrow" />
        </div>
      </div>
    </div>
  );
}
