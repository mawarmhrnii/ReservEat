// Toggle class active for the navbar
const navbarNav = document.querySelector(".navbar-nav");

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const indoorContents = document.querySelectorAll(".indoor");
  const outdoorContents = document.querySelectorAll(".outdoor");
  const dropdowns = document.querySelectorAll(".dropdown-table");

  // DROPDOWN
  // Loop through all dropdown elements
  dropdowns.forEach((dropdown) => {
    // Get inner elements from each dropdown
    const selectDropdown = dropdown.querySelector(".select-table");
    const caret = dropdown.querySelector(".caret");
    const tableList = dropdown.querySelector(".table-list");
    const optionsList = dropdown.querySelectorAll(".table-list li");

    // Add a click event to the select element
    selectDropdown.addEventListener("click", () => {
      // Toggle the clicked select styles
      selectDropdown.classList.toggle("select-clicked");
      // Toggle the rotate styles on the caret element
      caret.classList.toggle("caret-rotate");
      // Toggle the open styles on the table list
      tableList.classList.toggle("list-open");
    });

    optionsList.forEach((option) => {
      // Add a click event to the option element
      option.addEventListener("click", () => {
        // Change selected inner text to clicked option inner text
        selectDropdown.querySelector(".selected").innerText = option.innerText;

        // Remove the clicked select styles
        selectDropdown.classList.remove("select-clicked");

        // Remove the rotate styles on the caret element
        caret.classList.remove("caret-rotate");

        // Remove the open styles on the table list
        tableList.classList.remove("list-open");

        // Remove active class from all option elements
        optionsList.forEach((option) => {
          option.classList.remove("drop-active");
        });

        // Add active class to the clicked option element
        option.classList.add("drop-active");
      });
    });
  });

  // TAB
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");

      if (tab === "indoor") {
        indoorContents.forEach((content) => content.classList.add("active"));
        outdoorContents.forEach((content) =>
          content.classList.remove("active")
        );
      } else if (tab === "outdoor") {
        indoorContents.forEach((content) => content.classList.remove("active"));
        outdoorContents.forEach((content) => content.classList.add("active"));
      }

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

// Toggle class active for the hamburger menu
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
