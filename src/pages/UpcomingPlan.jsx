import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";
import styles from "./UpcomingPlan.module.css";
import CreatePlanPage from "./CreatePlanPage";
import PlanDetail from "./PlanDetail";
import { useState, useCallback, useMemo } from "react";
import { Button } from "../components/Button";

export default function UpcomingPlan() {
  // rightView values: 'empty' (default click prompt), 'create' (show create page), 'detail' (show plan details)
  const [rightView, setRightView] = useState("empty");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPlanIds, setSelectedPlanIds] = useState(new Set());

  // All plan data object - now as state so we can delete plans
  const [allPlans, setAllPlans] = useState([
    { id: 1, planName: "Our 1st Korea Trip", planDate: "2025-10-05 to 2025-10-15", daysCount: 11 },
    { id: 2, planName: "China Family Trip", planDate: "2025-12-08 to 2025-12-12", daysCount: 5 },
    { id: 3, planName: "Japan Family Trip", planDate: "2025-12-20 to 2025-12-26", daysCount: 7 },
  ]);

  // function to compare plan dates
  const compareDate = (planDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to 00:00:00 to compare dates only

    const plan = new Date(planDate);
    plan.setHours(0, 0, 0, 0);

    return plan.getTime() - today.getTime();
  };

  // filtered plans list
  const filteredPlans = useMemo(() => {
    if (selectedFilter === "all") {
      return allPlans;
    } else if (selectedFilter === "upcoming") {
      return allPlans.filter((plan) => compareDate(plan.planDate) >= 0);
    } else if (selectedFilter === "past") {
      return allPlans.filter((plan) => compareDate(plan.planDate) < 0);
    }
    return allPlans;
  }, [selectedFilter, allPlans]);

  const handleFilterChange = useCallback((filterType) => {
    setSelectedFilter(filterType);
  }, []);

  const handleAddPlanClick = useCallback(() => {
    setRightView("create");
  }, []);

  const handleSeeDetails = useCallback(() => {
    setRightView("detail");
  }, []);

  const handleSelectClick = useCallback(() => {
    setIsSelectMode((prev) => !prev);
    // Select mode off, reset selected plan ids
    if (isSelectMode) {
      setSelectedPlanIds(new Set());
    }
  }, [isSelectMode]);

  const handlePlanCheckChange = useCallback((planId, isChecked) => {
    setSelectedPlanIds((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(planId);
      } else {
        newSet.delete(planId);
      }
      return newSet;
    });
  }, []);

  const handleDeleteClick = useCallback(() => {
    if (selectedPlanIds.size === 0) {
      alert("Please select at least one plan to delete.");
      return;
    }

    // delete selected plans
    setAllPlans((prevPlans) => prevPlans.filter((plan) => !selectedPlanIds.has(plan.id)));

    // reset selected plan ids and turn off select mode
    setSelectedPlanIds(new Set());
    setIsSelectMode(false);
  }, [selectedPlanIds]);

  return (
    <div className={styles.upcomingPlan}>
      <div className={styles.planItLogo}>
        <img src={logo} alt="Plan It Logo" />
      </div>

      <div className={styles.upcomingPlanContainer}>
        <div className={styles.dropdownSelect}>
          <div className={styles.dropdown}>
            <Dropdown onFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
          </div>
          <button className={styles.selectButton} onClick={handleSelectClick}>
            {isSelectMode ? "Cancel" : "Select"}
          </button>
        </div>

        <div className={styles.planCardsContainer}>
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              planId={plan.id}
              planName={plan.planName}
              planDate={plan.planDate}
              daysCount={plan.daysCount}
              onSeeDetails={handleSeeDetails}
              selectMode={isSelectMode}
              isChecked={selectedPlanIds.has(plan.id)}
              onCheckChange={handlePlanCheckChange}
            />
          ))}
        </div>
        {isSelectMode && (
          <div className={styles.deleteButtonContainer}>
            <Button redLarge onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        )}
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
