import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";
import styles from "./UpcomingPlan.module.css";
import CreatePlanPage from "./CreatePlanPage";
import PlanDetail from "./PlanDetail";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpcomingPlan() {
  const [rightView, setRightView] = useState("detail"); // 'detail' | 'create'
  const navigate = useNavigate();
  const location = useLocation();

  // If we arrived via navigation with a request to open the right view, honor it
  useEffect(() => {
    if (location && location.state && location.state.rightView) {
      setRightView(location.state.rightView);
      // clear the navigation state so refresh doesn't reapply
      try {
        navigate(location.pathname, { replace: true, state: {} });
      } catch (e) {
        // ignore
      }
    }
  }, [location, navigate]);

  const handleAddPlanClick = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(min-width: 768px)");
      if (mq.matches) {
        // desktop/tablet: show create in right column
        setRightView("create");
      } else {
        // small screens: navigate to the create page route
        navigate("/create");
      }
    } else {
      // fallback: navigate to create
      navigate("/create");
    }
  }, []);

  const handleSeeDetails = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(min-width: 768px)");
      if (mq.matches) {
        // desktop/tablet: show detail in right column
        setRightView("detail");
      } else {
        // small screens: navigate to detail route
        navigate("/detail");
      }
    } else {
      // fallback: navigate to detail
      navigate("/detail");
    }
  }, [navigate]);

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
        </div>
      </div>

      <div className={styles.addPlanButton}>
        <AddPlan onClick={handleAddPlanClick} />
      </div>

      <div className={styles.rightColumnLarge}>
        {rightView === "create" ? (
          <CreatePlanPage onClose={() => setRightView("detail")} />
        ) : (
          <PlanDetail />
        )}
      </div>
    </div>
  );
}
