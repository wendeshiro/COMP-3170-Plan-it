import styles from "./TopHeader.module.css";
import logo from "../assets/plan-it_logo.png";
import PageNavBar from "./PageNavBar";
import AddPlan from "./AddPlan";

export default function TopHeader({ location, onAddPlan, addPlanDisabled }) {
  return (
    <div className={styles.topHeader}>
      <div className={styles.planItLogo}>
        <img src={logo} alt="Plan It Logo" />
      </div>
      <PageNavBar className={styles.pageNavBar} location={location} />
      <div className={styles.addPlanButton}>
        <AddPlan onClick={onAddPlan} disabled={addPlanDisabled} />
      </div>
    </div>
  );
}
