import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";
import styles from "./UpcomingPlan.module.css";
import CreatePlanPage from "./CreatePlanPage";
import PlanDetail from "./PlanDetail";
import { useState, useCallback } from "react";

export default function UpcomingPlan() {
  // rightView values: 'empty' (default click prompt), 'create' (show create page), 'detail' (show plan details)
  const [rightView, setRightView] = useState("empty");
  const handleAddPlanClick = useCallback(() => {
    setRightView("create");
  }, []);

  const handleSeeDetails = useCallback(() => {
    setRightView("detail");
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
        </div>

        <div className={styles.planCardsContainer}>
          <PlanCard
            planName="Our 1st Korea Trip"
            planDate="2025-10-05"
            onSeeDetails={handleSeeDetails}
          />
          <PlanCard
            planName="China Family Trip"
            planDate="2025-12-08"
            onSeeDetails={handleSeeDetails}
          />
          <PlanCard
            planName="China Family Trip"
            planDate="2025-12-08"
            onSeeDetails={handleSeeDetails}
          />
        </div>
      </div>

      <div className={styles.addPlanButton}>
        <AddPlan onClick={handleAddPlanClick} />
      </div>

      <div className={styles.rightColumnLarge}>
        {rightView === "create" ? (
          <CreatePlanPage onClose={() => setRightView("empty")} />
        ) : rightView === "detail" ? (
          <PlanDetail onClose={() => setRightView("empty")} />
        ) : (
          <div className={styles.clickPrompt}>Click a plan to see details</div>
        )}
      </div>
    </div>
  );
}
