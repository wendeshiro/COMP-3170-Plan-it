import styles from "./CreatePlanPage.module.css";
import Navbar from "../components/Navbar";
import Input from "../components/input";
import InputCard from "../components/InputCard";
import { Button } from "../components/Button";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreatePlanPage({ onClose } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  // track whether this page was opened on a small screen
  const openedOnSmall = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 768px)");
    // If the page was opened while smaller than 768, mark it
    openedOnSmall.current = !mq.matches;

    const onResize = () => {
      if (!openedOnSmall.current) return; // only act if opened on small
      if (window.matchMedia && window.matchMedia("(min-width: 768px)").matches) {
        // navigate back to the main view and instruct it to open the right panel
        navigate("/", { state: { rightView: "create" } });
      }
    };

    window.addEventListener("resize", onResize);
    // also listen to media query change for more responsiveness
    try {
      mq.addEventListener("change", onResize);
    } catch (e) {
      // some browsers use addListener
      if (mq.addListener) mq.addListener(onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      try {
        mq.removeEventListener("change", onResize);
      } catch (e) {
        if (mq.removeListener) mq.removeListener(onResize);
      }
    };
  }, [navigate, location]);

  return (
    <div>
      <Navbar navTitle="A New Plan" showActions={false} />
      <div className={styles.contentContainer}>
        <div className={styles.topFormContainer}>
          <Input title="Tour Name" type="text" />
          <Input title="Date Range" type="text" />
          <Input title="Destination" type="text" />
          <Input title="Budget" type="number" showDollar min={0} />
        </div>
        <div className={styles.dayCardContainer}>
          <InputCard cardTitle={"Day 01"}>
            <Input title="Location 01" />
            <Input title="Date" type="date" />
            <Input title="Time" type="time" />
            <Input title="Note" />
          </InputCard>
          <InputCard cardTitle={"Day 02"}>
            <Input title="Location 01" />
            <Input title="Date" type="date" />
            <Input title="Time" type="time" />
            <Input title="Note" />
          </InputCard>
        </div>
        <div className={styles.btnContainer}>
          <Button
            whiteSmall
            onClick={() => {
              // small screens: go back in history; large screens: call onClose if provided
              if (typeof window !== "undefined" && window.matchMedia) {
                const isLarge = window.matchMedia("(min-width: 768px)").matches;
                if (!isLarge) {
                  navigate(-1);
                  return;
                }
              }
              if (typeof onClose === "function") onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            savePlan
            onClick={() => {
              // same behavior as Cancel for now: close / go back
              if (typeof window !== "undefined" && window.matchMedia) {
                const isLarge = window.matchMedia("(min-width: 768px)").matches;
                if (!isLarge) {
                  navigate(-1);
                  return;
                }
              }
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
