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

export default function CreatePlanPage({ onClose } = {}) {
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
  return (
    <div>
      <Navbar navTitle="A New Plan" showActions={false} onBackClick={handleBackClick} />
      <div className={styles.contentContainer}>
        <div className={styles.topFormContainer}>
          <Input title="Tour Name" type="text" />
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
          <Input title="Destination" type="text" />
          <Input title="Budget" type="number" showDollar min={0} />
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
          <Button
            $savePlan
            onClick={() => {
              if (typeof onClose === "function") onClose();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
