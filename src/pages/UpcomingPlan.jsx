import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";
import styles from "./UpcomingPlan.module.css";
import CreatePlanPage from "./CreatePlanPage";
import PlanDetail from "./PlanDetail";

export default function UpcomingPlan() {
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
          <PlanCard planName="Our 1st Korea Trip" planDate="2025-10-05" />
          <PlanCard planName="China Family Trip" planDate="2025-12-08" />
        </div>
      </div>

      <div className={styles.addPlanButton}>
        <AddPlan />
      </div>

      <div className={styles.rightColumnLarge}>
        {/* <CreatePlanPage /> */}
        <PlanDetail />
      </div>
    </div>
  );
}
