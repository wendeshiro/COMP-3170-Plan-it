import PageNavBar from "../components/PageNavBar";
import AddPlan from "../components/AddPlan";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./CheckList.module.css";
import logo from "../assets/plan-it_logo.png";

const checklistData = [
  {
    category: "1. Documents & IDs",
    items: [
      "Passport",
      "ID card",
      "Visa (if required)",
      "Flight tickets / Boarding pass",
      "Hotel reservation info",
      "Travel insurance / Health insurance card",
      "Driver’s license (if renting a car)",
      "Emergency contacts",
    ],
  },
  {
    category: "2. Money & Payment",
    items: [
      "Cash (local currency)",
      "Credit cards",
      "Debit cards",
      "Mobile payment apps",
      "Wallet",
    ],
  },
  {
    category: "3. Clothes & Accessories",
    items: [
      "Underwear",
      "Socks",
      "Tops (T-shirts, shirts)",
      "Bottoms (pants, shorts, skirts)",
      "Jacket / Coat",
      "Shoes",
      "Pajamas",
      "Hat",
      "Sunglasses",
      "Umbrella or raincoat",
      "Swimsuit",
    ],
  },
  {
    category: "4. Toiletries",
    items: [
      "Toothbrush & Toothpaste",
      "Shampoo & Conditioner",
      "Body wash",
      "Towel",
      "Comb / Brush",
      "Razor",
      "Feminine hygiene products",
      "Sunscreen",
      "Contact lenses & solution",
    ],
  },
  {
    category: "5. Electronics",
    items: [
      "Phone",
      "Charger",
      "Earphones / Headphones",
      "Laptop or Tablet",
      "Power adapter",
      "Camera (if needed)",
      "Power bank",
    ],
  },
  {
    category: "6. Medication & Health",
    items: [
      "Prescription medication",
      "Cold & pain relievers",
      "Band-aids",
      "Sanitizer / Wet wipes",
      "Vitamins",
    ],
  },
  {
    category: "7. Travel Accessories",
    items: [
      "Suitcase / Backpack",
      "Daypack",
      "Neck pillow",
      "Sleep mask",
      "Earplugs",
      "Water bottle",
      "Book / Kindle / Magazine",
    ],
  },
  {
    category: "8. Optional Items",
    items: [
      "Snacks",
      "Tripod for camera",
      "Small tools / Swiss knife (check airline rules)",
      "Waterproof shoes",
      "Travel laundry kit",
    ],
  },
];

export default function CheckList() {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});

  const handleAddClick = () => {
    // navigate to the main Plans page and request the create pane
    navigate("/", { state: { rightView: "create" } });
  };

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topHeader}>
        <div className={styles.planItLogo}>
          <img src={logo} alt="Plan It Logo" />
        </div>
        <PageNavBar className={styles.pageNavBar} location={location} />
        <div className={styles.addPlanButton}>
          <AddPlan onClick={handleAddClick} />
        </div>
      </div>
      <div className={styles.checklistContainer}>
        <p className={styles.title}>Ready for Your Trip?</p>
        <div className={styles.listGrid}>
          {checklistData.map((section) => (
            <div key={section.category} className={styles.categorySection}>
              <p className={styles.categoryTitle}>{section.category}</p>
              <ul className={styles.itemsList}>
                {section.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item]}
                        onChange={() => toggleCheck(item)}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.customCheckbox}></span>
                      <span
                        className={`${styles.itemText} ${
                          checkedItems[item] ? styles.checkedText : ""
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
