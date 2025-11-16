import logo from "../assets/plan-it_logo.png";
import PlanCard from "../components/PlanCard";
import AddPlan from "../components/AddPlan";
import Dropdown from "../components/Dropdown";
import styles from "./UpcomingPlan.module.css";
import CreatePlanPage from "./CreatePlanPage";
import PlanDetail from "./PlanDetail";
import { useState, useCallback, useMemo } from "react";
import { Button } from "../components/Button";
import { getPlans, deletePlansByIds } from "../data/storage";

export default function UpcomingPlan() {
  // rightView values: 'empty' (default click prompt), 'create' (show create page), 'detail' (show plan details)
  const [rightView, setRightView] = useState("empty");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPlanIds, setSelectedPlanIds] = useState(new Set());
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // All plan data object - now as state so we can delete plans
  const [allPlans, setAllPlans] = useState(() => getPlans());

  // function to compare plan dates
  const compareDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to 00:00:00 to compare dates only

    const plan = new Date(dateStr);
    plan.setHours(0, 0, 0, 0);

    return plan.getTime() - today.getTime();
  };

  // filtered plans list
  const filteredPlans = useMemo(() => {
    if (selectedFilter === "all") {
      return allPlans;
    } else if (selectedFilter === "upcoming") {
      return allPlans.filter((plan) => compareDate(plan.startDate) >= 0);
    } else if (selectedFilter === "past") {
      return allPlans.filter((plan) => compareDate(plan.startDate) < 0);
    }
    return allPlans;
  }, [selectedFilter, allPlans]);

  const handleFilterChange = useCallback((filterType) => {
    setSelectedFilter(filterType);
  }, []);

  const handleAddPlanClick = useCallback(() => {
    setRightView("create");
  }, []);

  const handleSeeDetails = useCallback((planId) => {
    setSelectedPlanId(planId);
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
    const next = deletePlansByIds(selectedPlanIds);
    setAllPlans(next);

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
              planName={plan.name}
              planDate={`${plan.startDate}${plan.endDate ? ` to ${plan.endDate}` : ""}`}
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

      {rightView !== "create" && (
        <div className={styles.addPlanButton}>
          <AddPlan onClick={handleAddPlanClick} />
        </div>
      )}

      <div className={styles.rightColumnLarge}>
        {rightView === "create" ? (
          <CreatePlanPage
            onClose={() => setRightView("empty")}
            onSaved={(plan) => {
              setAllPlans((prev) => [plan, ...prev]);
            }}
          />
        ) : rightView === "detail" ? (
          <PlanDetail planId={selectedPlanId} onClose={() => setRightView("empty")} />
        ) : (
          <div className={styles.clickPrompt}>
            Click a plan card on the left to view its details.
          </div>
        )}
      </div>
    </div>
  );
}
