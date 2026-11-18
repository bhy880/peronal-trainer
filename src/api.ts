import type { AssignmentReturn } from "@mui/icons-material";
import type { Customer } from "./types";

export function getCustomers() {
  return fetch(import.meta.env.VITE_API_URL + "/customers")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when fetching customers");
    }

    return response.json();
  })
}

// /gettrainings returns trainings with the customer object embedded
export function getTrainings() {
  return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when fetching trainings");
    }

    return response.json();
  })
}

export function deleteCustomer(url: string){
  return fetch(url, {method: "DELETE"})
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when deleting a customer");

    }
    return response.json();
  })
}

export function addCustomer(customer: Customer) {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new customer");

      return response.json();
    })
}

export function deleteTraining(id: number) {
  return fetch(import.meta.env.VITE_API_URL + "/trainings/" + id, { method: 'DELETE' })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting a training");

    return response.json();
  })
}
