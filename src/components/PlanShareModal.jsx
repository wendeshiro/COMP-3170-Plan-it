import styles from "./PlanShareModal.module.css";

import closeIcon from "../assets/close.svg";
import exportIcon from "../assets/export.svg";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PlanShareModal({ onClose }) {
  const exportToPDF = () => {
    const element = document.getElementById("pdf-target");

    html2canvas(element, {
      scale: 2,
      ignoreElements: (el) =>
        el.id === "overlay" || el.id === "plan-share-modal",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = 210; // A4 width
      const pageHeight = 297;
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("plan.pdf");

      if (typeof onClose === "function") onClose();
    });
  };

  return (
    <div
      id="plan-share-modal"
      className={styles.planShareModal}
    >
      <img
        className={styles.close}
        src={closeIcon}
        alt="close"
        onClick={onClose}
      />
      <div className={styles.contents}>
        <div
          className={styles.export}
          onClick={exportToPDF}
        >
          <img
            src={exportIcon}
            alt="export"
          />
          <p>Export to pdf</p>
        </div>
      </div>
    </div>
  );
}
