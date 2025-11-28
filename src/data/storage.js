import seedPlans from "./plans.json";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "planit.plans";

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStorage(plans) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function getPlans() {
  let plans = readStorage(); // Try to read existing data from localStorage.
  if (!plans || !Array.isArray(plans)) {
    // If read result is not an array or is falsy, perform initialization.
    plans = Array.isArray(seedPlans) ? seedPlans : [];
    writeStorage(plans);
  }
  return plans;
}

export function savePlans(plans) {
  writeStorage(plans);
  return plans;
}

export function addPlan(plan) {
  const plans = getPlans();
  const next = [plan, ...plans];
  writeStorage(next);
  return plan;
}

export function deletePlansByIds(idSet) {
  const plans = getPlans();
  const next = plans.filter((p) => !idSet.has(p.id)); // keep the original false
  writeStorage(next);
  return next;
}

export function updatePlan(updatedPlan) {
  const plans = getPlans();
  const next = plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p));
  writeStorage(next);
  return next;
}

export function getPlanById(id) {
  const plans = getPlans();
  return plans.find((p) => p.id === id) || null; // return an object or null
}

export function generateId() {
  return uuidv4();
}
