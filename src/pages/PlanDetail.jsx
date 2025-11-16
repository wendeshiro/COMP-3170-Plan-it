import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCardInDetails from "../components/InputCardInDetails";
import DetailsItem from "../components/DetailsItem";
import DayPlanCard from "../components/DayPlanCard";
import DayPlanCardEvent from "../components/DayPlanCardEvent";
import PlanShareModal from "../components/PlanShareModal";
import Navbar from "../components/Navbar";
import styles from "./PlanDetail.module.css";

export default function PlanDetail({ onClose } = {}) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  const handleEditClick = () => {
    console.log("Edit button clicked!");
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
    <div
      id="pdf-target"
      className={styles.planDetailContainer}
    >
      <div>
        <Navbar
          navTitle="Details"
          onShareClick={handleShareClick}
          onEditClick={handleEditClick}
          onBackClick={handleBackClick}
        />
        <div className={styles.planDetail}>
          <InputCardInDetails
            cardTitle="Our 1st Korea Trip"
            showAddButton={false}
            style={{ "--input-label-size": "20px" }}
          >
            <DetailsItem
              title="Date Range"
              content="2025/10/01 - 2025/10/11"
            />
            <DetailsItem
              title="Total Days"
              content="11"
            />
            <DetailsItem
              title="Destination"
              content="South Korea"
            />
            <DetailsItem
              title="Budget"
              content="$4000"
            />
          </InputCardInDetails>
          <DayPlanCard cardTitle="Day 01 - 2025/10/01">
            <DayPlanCardEvent
              time="7:20"
              event="Vancouver airport"
              note="Double-check visa!"
            />
            <DayPlanCardEvent
              time="18:00"
              event="Incheon airport"
            />
            <DayPlanCardEvent
              time="20:00"
              event="Hotel check-in"
              note="Lotte Hotel in Hongdae"
            />
          </DayPlanCard>
          <DayPlanCard cardTitle="Day 02 - 2025/10/02">
            <DayPlanCardEvent
              time="8:00"
              event="Korean style brunch"
              note="Very spicy hotpot! (Gukbap!)"
            />
            <DayPlanCardEvent
              time="10:00"
              event="Starfield Library"
              note="Very big beautiful library. and % cafe!"
            />
            <DayPlanCardEvent
              time="11:30"
              event="Shopping at Coex mall"
              note="Free time! shopping!!"
            />
            <DayPlanCardEvent
              time="14:30"
              event="London Bagel Museum"
              note="Not a museum, bagel cafe"
            />
          </DayPlanCard>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div
          id="overlay"
          className={styles.modalOverlay}
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PlanShareModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
