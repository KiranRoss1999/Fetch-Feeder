const mealModal = document.querySelector("#crud-modal");
const addMealBtn = document.querySelector(".add-meal-btn");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalOverlay = document.querySelector("#modal-overlay");
const submitForm = document.querySelector("#crud-modal form");

function openModal() {
  mealModal.classList.add("flex");
  mealModal.classList.remove("hidden");
  modalOverlay.classList.add("flex");
  modalOverlay.classList.remove("hidden");

  // Prevent scrolling
  document.body.style.overflow = "hidden";
}

function closeModal() {
  mealModal.classList.add("hidden");
  mealModal.classList.remove("flex");
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("flex");

  // Restore scrolling
  document.body.style.overflow = "auto";
}

async function handleSubmit(event) {
  event.preventDefault();

  const meal = document.querySelector("#meal").value;
  const calories = document.querySelector("#calories").value;

  const response = await fetch("/api/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meal,
      calories,
    }),
  });

  if (response.ok) {
    // Close the modal and possibly reload the page or update the UI
    closeModal();
    //  reloading the page to get the latest meals
    window.location.reload();
  } else {
    alert("Failed to create a new meal");
  }
}

modalCloseBtn.addEventListener("click", () => {
  closeModal();
});

addMealBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

submitForm.addEventListener("submit", handleSubmit);
