import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";
import styles from "./UpcomingPlan.module.css";
import CreatePlanPage from "./CreatePlanPage";
import PlanDetail from "./PlanDetail";
import { useState, useCallback } from "react";

export default function UpcomingPlan() {
  const [rightView, setRightView] = useState("detail"); // 'detail' | 'create'

  const handleAddPlanClick = useCallback(() => {
    // Only switch to CreatePlanPage on screens >= 768px
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(min-width: 768px)");
      if (mq.matches) {
        setRightView("create");
      }
    }
  }, []);

  const handleSeeDetails = useCallback(() => {
    // Only switch to PlanDetail on screens >= 768px
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(min-width: 768px)");
      if (mq.matches) {
        setRightView("detail");
      }
    }
  }, []);

  return (
    <div className={styles.upcomingPlan}>
      <div className={styles.planItLogo}>
        <img src={logo} alt="Plan It Logo" />
      </div>

      <div className={styles.upcomingPlanContainer}>
        <div className={styles.dropdownSelect}>
          <div className={styles.dropdown}>
            <Dropdown />
          </div>
          <h3 className={styles.selectBtnText}>Select</h3>
        </div>

        <div className={styles.planCardsContainer}>
          <PlanCard planName="Our 1st Korea Trip" planDate="2025-10-05" onSeeDetails={handleSeeDetails} />
          <PlanCard planName="China Family Trip" planDate="2025-12-08" onSeeDetails={handleSeeDetails} />
        </div>
      </div>

      <div className={styles.addPlanButton}>
        <AddPlan onClick={handleAddPlanClick} />
      </div>

      <div className={styles.rightColumnLarge}>
        {rightView === "create" ? <CreatePlanPage /> : <PlanDetail />}
      </div>
    </div>
  );
}
