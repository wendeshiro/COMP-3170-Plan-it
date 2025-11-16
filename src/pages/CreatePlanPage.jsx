import styles from "./CreatePlanPage.module.css";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import InputCard from "../components/InputCard";
import { Button } from "../components/Button";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { addPlan, generateId } from "../data/storage";

export default function CreatePlanPage({ onClose, onSaved } = {}) {
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

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const nameRef = useRef(null);
  const destinationRef = useRef(null);
  const budgetRef = useRef(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);
  const pickerRef = useRef(null);
  const PICKER_WIDTH = 360; // matches CSS

  // close when clicking outside picker and input
  useEffect(() => {
    function handleOutside(e) {
      const target = e.target;
      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        dateInputRef.current &&
        !dateInputRef.current.contains(target)
      ) {
        setShowDatePicker(false);
      }
    }
    if (showDatePicker) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [showDatePicker]);

  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });

  function openPicker() {
    const el = dateInputRef.current;
    if (!el) return setShowDatePicker(true);
    const rect = el.getBoundingClientRect();
    const top = rect.top; // align top
    let left = rect.left - PICKER_WIDTH - 8; // place to the left of input with gap
    // clamp to viewport
    if (left < 8) left = 8;
    setPickerPos({ top: Math.max(8, top), left });
    setShowDatePicker(true);
  }

  // compute total days from selected range (inclusive)
  const startDate = state && state[0] && state[0].startDate ? state[0].startDate : null;
  const endDate = state && state[0] && state[0].endDate ? state[0].endDate : null;
  let totalDays = 0;
  if (startDate && endDate) {
    totalDays = differenceInCalendarDays(endDate, startDate) + 1;
    if (totalDays < 1) totalDays = 1;
  } else if (startDate && !endDate) {
    totalDays = 1;
  }
  const [dayEvents, setDayEvents] = useState({});

  function handleSave() {
    const name = nameRef.current?.value?.trim() || "";
    const destination = destinationRef.current?.value?.trim() || "";
    const budget = parseFloat(budgetRef.current?.value || "0") || 0;
    if (!startDate) {
      alert("Please select a start date.");
      return;
    }
    if (!name) {
      alert("Please enter the tour name.");
      return;
    }
    if (!destination) {
      alert("Please enter the destination.");
      return;
    }
    if (budget <= 0) {
      alert("Please enter a budget.");
      return;
    }
    // Loop through each day to ensure each day has at least one valid event
    // and that every event has both Location and Start Time filled.
    // If any check fails, show an alert and stop submission.
    for (let i = 0; i < Math.max(1, totalDays); i++) {
      const eventsRaw = dayEvents[i] || [];
      const filledRows = eventsRaw.filter(
        (e) => (e.location || "").trim() || (e.time || "").trim() || (e.note || "").trim()
      );
      if (filledRows.length === 0) {
        alert(
          `Day ${String(i + 1).padStart(2, "0")} needs at least one event (Location & Start Time).`
        );
        return;
      }
      for (let r = 0; r < filledRows.length; r++) {
        const row = filledRows[r];
        if (!(row.location || "").trim() || !(row.time || "").trim()) {
          alert(
            `Please fill Location and Start Time for Day ${String(i + 1).padStart(
              2,
              "0"
            )} Location ${String(r + 1).padStart(2, "0")}.`
          );
          return;
        }
      }
    }

    const daysArr = Array.from({ length: Math.max(1, totalDays) }).map((_, i) => {
      const dateStr = format(addDays(startDate, i), "yyyy-MM-dd");
      const eventsRaw = dayEvents[i] || [];
      const events = eventsRaw
        .map((e) => ({
          time: (e.time || "").trim(),
          location: (e.location || "").trim(),
          note: (e.note || "").trim(),
        }))
        .filter((e) => (e.time || e.location || e.note) && e.time && e.location);
      return { date: dateStr, events };
    });

    const newPlan = {
      id: generateId(),
      name,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : format(startDate, "yyyy-MM-dd"),
      destination,
      budget,
      daysCount: Math.max(1, totalDays),
      createdAt: new Date().toISOString(),
      days: daysArr,
    };

    addPlan(newPlan);
    if (typeof onSaved === "function") onSaved(newPlan);
    if (typeof onClose === "function") onClose();
  }
  return (
    <div>
      <Navbar navTitle="A New Plan" showActions={false} onBackClick={handleBackClick} />
      <div className={styles.contentContainer}>
        <div className={styles.topFormContainer}>
          <Input title="Tour Name" type="text" ref={nameRef} />
          <Input
            title="Date Range"
            type="text"
            ref={dateInputRef}
            onClick={openPicker}
            readOnly
            value={
              state[0].startDate
                ? `${format(state[0].startDate, "yyyy-MM-dd")}${
                    state[0].endDate ? " to " + format(state[0].endDate, "yyyy-MM-dd") : ""
                  }`
                : ""
            }
          />

          {showDatePicker &&
            createPortal(
              <div
                ref={pickerRef}
                className={styles.pickerPortal}
                style={{
                  top: pickerPos.top + "px",
                  left: pickerPos.left + "px",
                  width: PICKER_WIDTH + "px",
                }}
              >
                <DateRange
                  minDate={new Date()}
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 3))}
                  editableDateInputs={true}
                  onChange={(item) => {
                    setState([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </div>,
              document.body
            )}
          <Input title="Destination" type="text" ref={destinationRef} />
          <Input title="Budget" type="number" showDollar min={0} ref={budgetRef} />
        </div>
        <div className={styles.dayCardContainer}>
          {Array.from({ length: Math.max(1, totalDays) }).map((_, i) => {
            const dayIndex = i + 1;
            const cardTitle = `Day ${String(dayIndex).padStart(2, "0")}`;
            const defaultDateValue = startDate ? format(addDays(startDate, i), "yyyy-MM-dd") : "";
            return (
              <InputCard
                key={i}
                cardTitle={cardTitle}
                initialEntries={1}
                dateValue={defaultDateValue}
                onChange={(events) =>
                  setDayEvents((prev) => ({
                    ...prev,
                    [i]: events.map((e) => ({ ...e, date: defaultDateValue })),
                  }))
                }
              />
            );
          })}
        </div>
        <div className={styles.btnContainer}>
          <Button
            $whiteSmall
            onClick={() => {
              if (typeof onClose === "function") onClose();
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
