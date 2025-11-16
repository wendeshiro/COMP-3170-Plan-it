import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import styles from "./Dropdown.module.css";

export default function BasicExample({ onFilterChange, selectedFilter = "all" }) {
  const handleFilterSelect = (filterType) => {
    if (onFilterChange) {
      onFilterChange(filterType);
    }
  };

  // Get toggle text based on selected filter
  const getToggleText = () => {
    switch (selectedFilter) {
      case "all":
        return "All Plans";
      case "upcoming":
        return "Upcoming Plans";
      case "past":
        return "Past Plans";
      default:
        return "Filter Plans";
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.toggle}>{getToggleText()}</Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        <Dropdown.Item
          className={styles.item}
          onClick={() => handleFilterSelect("all")}
          active={selectedFilter === "all"}
        >
          <label>All Plans</label>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.item}
          onClick={() => handleFilterSelect("upcoming")}
          active={selectedFilter === "upcoming"}
        >
          <label>Upcoming Plans</label>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.item}
          onClick={() => handleFilterSelect("past")}
          active={selectedFilter === "past"}
        >
          <label>Past Plans</label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
