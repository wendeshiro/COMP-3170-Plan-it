import React, { useState } from "react";
import styles from "./PlanCard.module.css";
import member1 from "../assets/member1.jpeg";
import member2 from "../assets/member2.jpeg";
import member3 from "../assets/member3.jpeg";
import checkIcon from "../assets/check.svg";
import arrowIcon from "../assets/rightarrow.svg";

export default function PlanCard({ planName, planDate, onSeeDetails }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSeeDetailsClick = () => {
    if (typeof onSeeDetails === "function") {
      onSeeDetails();
      return;
    }
    // fallback behavior for existing apps
    alert("See details clicked!");
  };

  return (
    <div className={styles.planCard}>
      <div className={styles.textContents}>
        <h3>{planName}</h3>
        <p>{planDate}</p>
      </div>
      {/* <div className={styles.checkBox} onClick={handleCheckboxClick}>
        {isChecked && <img src={checkIcon} alt="check" />}
      </div> hide for milestone1*/}
      <div>
        <div className={styles.dynamicContents}>
          <img src={member1} alt="member1" />
          <img src={member2} alt="member2" />
          <img src={member3} alt="member3" />
        </div>
        <div className={styles.detailsSection}>
          <button className={styles.seeDetailsButton} onClick={handleSeeDetailsClick}>
            See details
          </button>
          <img src={arrowIcon} alt="arrow" />
        </div>
      </div>
    </div>
  );
}
