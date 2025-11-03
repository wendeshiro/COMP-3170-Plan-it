import styles from "./CreatePlanPage.module.css";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import InputCard from "../components/InputCard";
import { Button } from "../components/Button";
import { useRef } from "react";

export default function CreatePlanPage({ onClose } = {}) {
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
              if (typeof onClose === "function") onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            savePlan
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
