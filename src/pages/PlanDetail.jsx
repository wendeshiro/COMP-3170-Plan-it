import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCardInDetails from "../components/InputCardInDetails";
import DetailsItem from "../components/DetailsItem";
import DayPlanCard from "../components/DayPlanCard";
import DayPlanCardEvent from "../components/DayPlanCardEvent";
import PlanShareModal from "../components/PlanShareModal";
import Navbar from "../components/Navbar";
import styles from "./PlanDetail.module.css";
import { getPlanById } from "../data/storage";

export default function PlanDetail({ planId, onClose, onEditClick } = {}) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  const plan = useMemo(() => {
    if (!planId) return null;
    return getPlanById(planId);
  }, [planId]);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick();
    } else {
      console.log("Edit button clicked!");
    }
  };

  const handleBackClick = () => {
    // If parent provided onClose (inline mode), use it to close the right panel.
    if (typeof onClose === "function") {
      onClose();
      return;
    }
    // otherwise fall back to navigating back in history (or home)
    try {
      navigate(-1);
    } catch (e) {
      navigate("/");
    }
  };

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
          {plan ? (
            <>
              <InputCardInDetails
                cardTitle={plan.name}
                showAddButton={false}
                style={{ "--input-label-size": "20px" }}
              >
                <DetailsItem
                  title="Date Range"
                  content={`${plan.startDate.replaceAll("-", "/")} - ${plan.endDate.replaceAll(
                    "-",
                    "/"
                  )}`}
                />
                <DetailsItem title="Total Days" content={String(plan.daysCount)} />
                <DetailsItem title="Destination" content={plan.destination || "-"} />
                <DetailsItem title="Budget" content={`$${Number(plan.budget || 0)}`} />
              </InputCardInDetails>

              {plan.days && plan.days.length > 0 ? (
                plan.days.map((day, idx) => (
                  <DayPlanCard
                    key={day.date || idx}
                    cardTitle={`Day ${String(idx + 1).padStart(2, "0")} - ${day.date}`}
                  >
                    {(day.events && day.events.length > 0
                      ? day.events
                      : [{ time: "", location: "No events", note: "" }]
                    ).map((ev, i) => (
                      <DayPlanCardEvent
                        key={i}
                        time={ev.time || ""}
                        event={ev.location || ""}
                        note={ev.note || ""}
                      />
                    ))}
                  </DayPlanCard>
                ))
              ) : (
                <DayPlanCard cardTitle="No days yet">
                  <DayPlanCardEvent time="" event="Add events when editing" />
                </DayPlanCard>
              )}
            </>
          ) : (
            <>
              {/* Fallback static content when no planId provided */}
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
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div id="overlay" className={styles.modalOverlay} onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <PlanShareModal plan={plan} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
