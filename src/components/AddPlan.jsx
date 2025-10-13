import styled from "styled-components";
import { Button } from "./Button";
import plusIcon from "../assets/plus.svg";

export default function CreatePlanButton({ onClick }) {
  return (
    <Button addPlan onClick={onClick}>
      <img src={plusIcon} alt="plus" style={{ width: "20px", marginRight: "10px" }} />
      Create a plan
    </Button>
  );
}
