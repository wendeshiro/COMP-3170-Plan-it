import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import InputCardInDetails from "../components/InputCardInDetails";
import DetailsItem from "../components/DetailsItem";
import InputCard from "../components/InputCard";
import { Button } from "../components/Button";
import styles from "./PlanDetail.module.css";
import { getPlanById } from "../data/storage";
import Navbar from "../components/Navbar";
import DayPlanCard from "../components/DayPlanCard";
import DayPlanCardEvent from "../components/DayPlanCardEvent";
import PlanShareModal from "../components/PlanShareModal";

export default function PlanDetail({ planId, onClose, onEdit } = {}) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const navigate = useNavigate();

  // Reload plan when planId or refreshCount changes
  const plan = useMemo(() => {
    if (!planId) return null;
    return getPlanById(planId);
  }, [planId, refreshCount]);

  // Listen to custom 'localstorage' event to trigger refresh state
  useEffect(() => {
    const onStorageChange = () => {
      setRefreshCount((c) => c + 1);
    };
    window.addEventListener("localstorage", onStorageChange);

    return () => {
      window.removeEventListener("localstorage", onStorageChange);
    };
  }, []);

  // Navigate to EditPlanPage on edit button click

  const handleShareClick = () => setIsShareModalOpen(true);
  const handleCloseModal = () => setIsShareModalOpen(false);
  const handleEditClick = () => {
    // Prefer parent-provided onEdit handler (used by UpcomingPlan to swap views).
    if (typeof onEdit === "function") {
      onEdit();
      return;
    }
    if (!planId) return;
    navigate(`/edit-plan/${planId}`);
  };

  const handleBackClick = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }
    try {
      navigate(-1);
    } catch (e) {
      navigate("/");
    }
  };

  // Editing is handled by the dedicated EditPlanPage; PlanDetail only views data

  return (
    <div>
      <div id="pdf-target">
        <Navbar
          navTitle="Details"
          onShareClick={handleShareClick}
          onEditClick={handleEditClick}
          onBackClick={handleBackClick}
        />
        <div className={styles.planDetail}>
          {!plan && (
            <InputCardInDetails
              cardTitle="Plan Details"
              showAddButton={false}
              style={{ "--input-label-size": "20px" }}
            >
              <DetailsItem title="Date Range" content="-" />
              <DetailsItem title="Total Days" content="-" />
              <DetailsItem title="Destination" content="-" />
              <DetailsItem title="Budget" content="$0" />
            </InputCardInDetails>
          )}

          {/* Display Mode (not editing) */}
          {plan && (
            <>
              <InputCardInDetails
                cardTitle={plan.name}
                showAddButton={false}
                style={{ "--input-label-size": "20px" }}
              >
                <DetailsItem
                  title="Date Range"
                  content={`${plan.startDate.replaceAll(
                    "-",
                    "/"
                  )} - ${plan.endDate.replaceAll("-", "/")}`}
                />
                <DetailsItem
                  title="Total Days"
                  content={String(plan.daysCount)}
                />
                <DetailsItem
                  title="Destination"
                  content={plan.destination || "-"}
                />
                <DetailsItem
                  title="Budget"
                  content={`$${Number(plan.budget || 0)}`}
                />
              </InputCardInDetails>
              {plan.days && plan.days.length > 0 ? (
                plan.days.map((day, idx) => (
                  <DayPlanCard
                    key={day.date || idx}
                    cardTitle={`Day ${String(idx + 1).padStart(2, "0")} - ${
                      day.date
                    }`}
                  >
                    {(day.events && day.events.length > 0
                      ? day.events
                      : [{ time: "", location: "No events", note: "" }]
                    ).map((ev, i) => (
                      <DayPlanCardEvent
                        key={i}
                        time={ev.time || ""}
                        location={ev.location || ""}
                        note={ev.note || ""}
                      />
                    ))}
                  </DayPlanCard>
                ))
              ) : (
                <DayPlanCard cardTitle="No days yet">
                  <DayPlanCardEvent
                    time=""
                    location="Add events when editing"
                  />
                </DayPlanCard>
              )}
            </>
          )}

          {/* Editing is done on the dedicated EditPlanPage */}
        </div>
      </div>

      {isShareModalOpen && (
        <div
          id="overlay"
          className={styles.modalOverlay}
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PlanShareModal plan={plan} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
