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
