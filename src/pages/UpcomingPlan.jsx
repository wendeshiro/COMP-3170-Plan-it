import "./UpcomingPlan.css";
import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";

const UpcomingPlan = () => {
  return (
    <div className="upcoming-plan">
      <div className="plan-it-logo">
        <img
          src={logo}
          alt="Plan It Logo"
        />
      </div>

      <div className="dropdown-select">
        <div className="dropdown">
          <Dropdown />
        </div>
        <h3 className="select-btn-text">Select</h3>
      </div>

      <div className="plan-cards-container">
        <div className="plan-cards">
          <PlanCard
            planName="Our 1st Korea Trip"
            planDate="2025-10-05"
          />

          <PlanCard
            planName="China Family Trip"
            planDate="2025-12-08"
          />
        </div>
      </div>

      <div className="add-plan-button"></div>
      <AddPlan />
    </div>
  );
};

export default UpcomingPlan;
