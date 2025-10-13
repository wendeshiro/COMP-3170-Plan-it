import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputCard from "../components/InputCard";
import DetailsItem from "../components/DetailsItem";
import DayPlanCard from "../components/DayPlanCard";
import DayPlanCardEvent from "../components/DayPlanCardEvent";
import PlanShareModal from "../components/PlanShareModal";
import Navbar from "../components/Navbar";
import styles from "./PlanDetail.module.css";

export default function PlanDetail() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  const handleEditClick = () => {
    console.log("Edit button clicked!");
  };

  const navigate = useNavigate();
  const location = useLocation();
  const openedOnSmall = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 768px)");
    openedOnSmall.current = !mq.matches;

    const onResize = () => {
      if (!openedOnSmall.current) return;
      if (window.matchMedia && window.matchMedia("(min-width: 768px)").matches) {
        navigate("/", { state: { rightView: "detail" } });
      }
    };

    window.addEventListener("resize", onResize);
    try {
      mq.addEventListener("change", onResize);
    } catch (e) {
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

  const handleBackClick = () => {
    // go back in history if possible, otherwise go to home
    try {
      navigate(-1);
    } catch (e) {
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar
        navTitle="Details"
        onShareClick={handleShareClick}
        onEditClick={handleEditClick}
        onBackClick={handleBackClick}
      />
      <div className={styles.planDetail}>
        <InputCard
          cardTitle="Our 1st Korea Trip"
          showAddButton={false}
          style={{ "--input-label-size": "20px" }}
        >
          <DetailsItem title="Date" content="2025/10/04 - 2025/10/14" />
          <DetailsItem title="Destination" content="South Korea" />
          <DetailsItem title="Budget in currency" content="$4000" />
          <DetailsItem title="Members" content="wende, jisoo, yejin, sam" />
        </InputCard>
        <DayPlanCard cardTitle="Day 01 - Oct 3rd, 4th" weatherIcon="☀️" weather="Sunny 16°C / 11°C">
          <DayPlanCardEvent
            date="2025/10/03"
            time="7:20"
            timeZone="PST"
            event="Vancouver airport"
            note="Double-check visa!"
          />
          <DayPlanCardEvent date="2025/10/04" time="18:00" timeZone="KST" event="Incheon airport" />
          <DayPlanCardEvent
            date="2025/10/04"
            time="20:00"
            timeZone="KST"
            event="Hotel check-in"
            note="Lotte Hotel in Hongdae"
          />
        </DayPlanCard>
        <DayPlanCard cardTitle="Day 02 - Oct 5th" weatherIcon="⛅️" weather="Cloudy 18°C / 9°C">
          <DayPlanCardEvent
            time="8:00"
            timeZone="KST"
            event="Korean style brunch"
            note="Very spicy hotpot! (Gukbap!)"
          />
          <DayPlanCardEvent
            time="10:00"
            timeZone="KST"
            event="Starfield Library"
            note="Very big beautiful library. and % cafe!"
          />
          <DayPlanCardEvent
            time="11:30"
            timeZone="KST"
            event="Shopping at Coex mall"
            note="Free time! shopping!!"
          />
          <DayPlanCardEvent
            time="14:30"
            timeZone="KST"
            event="London Bagel Museum"
            note="Not a museum, bagel cafe"
          />
        </DayPlanCard>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <PlanShareModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
