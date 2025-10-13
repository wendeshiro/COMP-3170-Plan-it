import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import styles from "./Dropdown.module.css";

export default function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.toggle}>Filter Plans</Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        <Dropdown.Item className={styles.item} href="#/action-1">
          <label>Upcoming plans</label>
        </Dropdown.Item>
        <Dropdown.Item className={styles.item} href="#/action-2">
          <label>Past plans</label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
