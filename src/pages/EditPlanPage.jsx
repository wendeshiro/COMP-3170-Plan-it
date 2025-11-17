import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import InputCard from "../components/InputCard";
import InputCardInDetails from "../components/InputCardInDetails";
import DetailsItem from "../components/DetailsItem";
import DayPlanCard from "../components/DayPlanCard";
import DayPlanCardEvent from "../components/DayPlanCardEvent";
import { Button } from "../components/Button";
import addIcon from "../assets/add-day-plus-btn.svg";
import removeIcon from "../assets/day-minus-btn.svg";
import styles from "./EditPlanPage.module.css";
import { getPlanById, savePlans, getPlans } from "../data/storage";

export default function EditPlanPage({ planId, onSave, onCancel }) {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (!planId) {
      if (typeof onCancel === "function") {
        onCancel();
        return;
      }
      navigate("/");
      return;
    }
    const plan = getPlanById(planId);
    if (plan) {
      setPlanData(plan);
      setFormState({
        title: plan.name || "",
        budget: plan.budget || 0,
        // Ensure each day has its own events array and at least one placeholder event
        days: plan.days.map((day) => ({
          ...day,
          events:
            day.events && day.events.length > 0
              ? day.events.map((ev) => ({ ...ev }))
              : [{ time: "", location: "", note: "" }],
        })),
        destination: plan.destination || "",
        dateRange: `${plan.startDate.replaceAll(
          "-",
          "/"
        )} - ${plan.endDate.replaceAll("-", "/")}`,
      });
    }
  }, [planId, navigate, onCancel]);

  if (!formState) return <div>Loading...</div>;

  function handleTitleChange(value) {
    setFormState((prev) => ({ ...prev, title: value }));
  }

  function handleBudgetChange(value) {
    setFormState((prev) => ({ ...prev, budget: Number(value) }));
  }

  function handleEventChange(dayIndex, eventIndex, field, value) {
    setFormState((prev) => ({
      ...prev,
      days: prev.days.map((d, i) =>
        i === dayIndex
          ? {
              ...d,
              events: (d.events || []).map((ev, ei) =>
                ei === eventIndex ? { ...ev, [field]: value } : ev
              ),
            }
          : d
      ),
    }));
  }

  function addEventRow(dayIndex) {
    setFormState((prev) => ({
      ...prev,
      days: prev.days.map((d, i) => {
        if (i !== dayIndex) return d;
        const events = d.events || [];
        const last = events[events.length - 1];
        if (
          last &&
          last.time === "" &&
          (last.location === "" || last.location === undefined) &&
          (last.note === "" || last.note === undefined)
        ) {
          return d; // don't add another empty row for this day
        }
        return {
          ...d,
          events: [...events, { time: "", location: "", note: "" }],
        };
      }),
    }));
  }

  function removeEventRow(dayIndex, eventIndex) {
    setFormState((prev) => ({
      ...prev,
      days: prev.days.map((d, i) => {
        if (i !== dayIndex) return d;
        const events = (d.events || []).slice();
        if (events.length <= 1) return d; // don't allow removing the last event
        events.splice(eventIndex, 1);
        return { ...d, events };
      }),
    }));
  }

  function handleSave() {
    // Debug: inspect formState before saving
    // eslint-disable-next-line no-console
    console.log("DEBUG: formState before save", {
      title: formState.title,
      budget: formState.budget,
      days: formState.days,
    });

    // Sort events by time (HH:mm) for each day before saving.
    const parseTimeToMinutes = (t) => {
      if (!t || typeof t !== "string") return Infinity;
      const m = t.match(/^(\d{1,2}):(\d{2})$/);
      if (!m) return Infinity;
      const hh = Number(m[1]);
      const mm = Number(m[2]);
      if (Number.isNaN(hh) || Number.isNaN(mm)) return Infinity;
      return hh * 60 + mm;
    };

    const sortedDays = formState.days.map((d) => {
      const evs = Array.isArray(d.events) ? [...d.events] : [];
      evs.sort(
        (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
      );
      return { ...d, events: evs };
    });

    // Update formState so UI reflects the sorted order if the user stays on page
    setFormState((prev) => ({ ...prev, days: sortedDays }));

    const updatedPlan = {
      ...planData,
      name: formState.title,
      budget: formState.budget,
      days: sortedDays,
      destination: formState.destination,
    };
    // eslint-disable-next-line no-console
    console.log("DEBUG: updatedPlan to save", updatedPlan);
    const allPlans = getPlans();
    const updatedPlans = allPlans.map((p) =>
      p.id === updatedPlan.id ? updatedPlan : p
    );

    savePlans(updatedPlans);
    if (typeof onSave === "function") {
      onSave(updatedPlan);
    } else {
      navigate(`/plan-detail/${planId}`);
    }
  }

  return (
    <div>
      <Navbar
        navTitle="Edit Plan"
        onBackClick={() => {
          if (typeof onCancel === "function") return onCancel();
          navigate(`/plan-detail/${planId}`);
        }}
      />
      <div className={styles.contentContainer}>
        <InputCardInDetails
          cardTitle={
            <Input
              title="Trip Title"
              type="text"
              value={formState.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          }
          showAddButton={false}
          style={{ "--input-label-size": "20px" }}
        >
          <DetailsItem
            title="Date Range"
            content={<input type="text" value={formState.dateRange} disabled />}
          />
          <DetailsItem
            title="Total Days"
            content={
              <input type="number" value={formState.days.length} disabled />
            }
          />
          <DetailsItem
            title="Destination"
            content={
              <input
                type="text"
                value={formState.destination}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    destination: e.target.value,
                  }))
                }
              />
            }
          />
          <DetailsItem
            title="Budget"
            content={
              <input
                type="number"
                min={0}
                value={formState.budget}
                onChange={(e) => handleBudgetChange(e.target.value)}
                style={{ paddingLeft: "20px" }}
              />
            }
          />
        </InputCardInDetails>
        <div className={styles.dayCardContainer}>
          {formState.days.map((day, dayIndex) => (
            <DayPlanCard
              key={day.date || dayIndex}
              cardTitle={`Day ${String(dayIndex + 1).padStart(2, "0")} - ${
                day.date
              }`}
            >
              {(day.events && day.events.length > 0
                ? day.events
                : [{ time: "", location: "", note: "" }]
              ).map((event, eventIndex) => {
                const events = day.events || [];
                const isLast = eventIndex === events.length - 1;
                return (
                  <div key={eventIndex} className={styles.eventBlock}>
                    <DayPlanCardEvent
                      date={day.date}
                      isEditing={true}
                      time={event.time || ""}
                      location={event.location || ""}
                      note={event.note || ""}
                      onChange={(field, value) =>
                        handleEventChange(dayIndex, eventIndex, field, value)
                      }
                    />
                    {!isLast && (
                      <div className={styles.eventDeleteWrapper}>
                        {(events || []).length > 1 && (
                          <button
                            className={styles.removeIconButton}
                            onClick={() => removeEventRow(dayIndex, eventIndex)}
                            aria-label="Remove event"
                          >
                            <img src={removeIcon} alt="remove" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className={styles.actionsRow}>
                <button
                  className={styles.addIconButton}
                  onClick={() => addEventRow(dayIndex)}
                  aria-label="Add event"
                >
                  <img src={addIcon} alt="add" />
                </button>
                {(day.events || []).length > 1 && (
                  <button
                    className={styles.removeIconButton}
                    onClick={() =>
                      removeEventRow(dayIndex, (day.events || []).length - 1)
                    }
                    aria-label="Remove last event"
                  >
                    <img src={removeIcon} alt="remove" />
                  </button>
                )}
              </div>
            </DayPlanCard>
          ))}
        </div>
        <div className={styles.btnContainer}>
          <Button
            $whiteSmall
            onClick={() => {
              if (typeof onCancel === "function") return onCancel();
              navigate(`/plan-detail/${planId}`);
            }}
          >
            Cancel
          </Button>
          <Button $savePlan onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
