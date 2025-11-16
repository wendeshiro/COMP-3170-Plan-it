import styles from "./PlanShareModal.module.css";

import closeIcon from "../assets/close.svg";
import exportIcon from "../assets/export.svg";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PlanShareModal({ onClose, plan }) {
  const exportToPDF = () => {
    const element = document.getElementById("pdf-target");
    if (!element) return;

    const margin = 5; // mm

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      ignoreElements: (el) =>
        el.id === "overlay" || el.id === "plan-share-modal" || el.id === "nav-for-pdf",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);

      const usableWidth = pageWidth - 2 * margin;
      const usableHeight = (imgProps.height * usableWidth) / imgProps.width;

      if (usableHeight + 2 * margin <= pageHeight) {
        pdf.addImage(imgData, "JPEG", margin, margin, usableWidth, usableHeight);
      } else {
        let position = 0;
        const canvasHeight = canvas.height;
        const pxPerMm = canvasHeight / usableHeight;

        const srcCtx = canvas.getContext("2d");

        while (position < canvasHeight) {
          const partCanvas = document.createElement("canvas");
          partCanvas.width = canvas.width;

          const partHeightPx = Math.min(
            (pageHeight - 2 * margin) * pxPerMm,
            canvasHeight - position
          );
          partCanvas.height = partHeightPx;

          const ctx = partCanvas.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            partHeightPx,
            0,
            0,
            partCanvas.width,
            partCanvas.height
          );

          const partImg = partCanvas.toDataURL("image/jpeg", 1.0);
          const partImgHeightMm = partHeightPx / pxPerMm;

          pdf.addImage(partImg, "JPEG", margin, margin, usableWidth, partImgHeightMm);

          position += partHeightPx;
          if (position < canvasHeight) {
            pdf.addPage();
          }
        }
      }

      // derive filename from plan.name if available, fallback to "plan"
      const rawName = plan && plan.name ? String(plan.name) : "plan";
      const safeName = rawName.replace(/[^a-z0-9\-\_\.\s]/gi, "_").trim() || "plan";
      pdf.save(`${safeName}.pdf`);
      if (typeof onClose === "function") onClose();
    });
  };

  return (
    <div id="plan-share-modal" className={styles.planShareModal}>
      <img className={styles.close} src={closeIcon} alt="close" onClick={onClose} />
      <div className={styles.contents}>
        <div className={styles.export} onClick={exportToPDF}>
          <img src={exportIcon} alt="export" />
          <p>Export to pdf</p>
        </div>
      </div>
    </div>
  );
}
