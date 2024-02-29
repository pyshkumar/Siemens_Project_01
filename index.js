document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    let data = await response.json();

    const tableBody = document.getElementById("tableBody");
    let sortField = "employeeId";
    let sortAscending = true;

    const updateIcons = () => {
      const allIcons = document.querySelectorAll(".icond i");

      allIcons.forEach((icon) => {
        icon.classList.remove("fa-arrow-up", "fa-arrow-down");
        icon.classList.add("fa-arrow-up");
      });

      const icon = document.getElementById(`_${sortField}`);

      if (!sortAscending) {
        icon.querySelector("i").classList.remove("fa-arrow-up");
        icon.querySelector("i").classList.add("fa-arrow-down");
      }
    };

    const populateTable = () => {
      data.sort((a, b) =>
        sortAscending
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField])
      );

      tableBody.innerHTML = "";

      data.forEach((employee) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = employee.employeeId;
        row.insertCell(1).textContent = employee.firstName;
        row.insertCell(2).textContent = employee.lastName;
        row.insertCell(3).textContent = employee.email;
        row.insertCell(4).textContent = employee.contactNumber;
        row.insertCell(5).textContent = employee.position;
      });

      updateIcons();
    };

    populateTable();

    const setSortingField = (field) => {
      sortField = field;
      sortAscending = !sortAscending;
      populateTable();
    };

    const toggleSortingOrder = () => {
      sortAscending = !sortAscending;
      populateTable();
    };

    // Event listeners for sorting w.r.t to any column
    document
      .getElementById("_employeeId")
      .addEventListener("click", () => setSortingField("employeeId"));

    document
      .getElementById("_firstName")
      .addEventListener("click", () => setSortingField("firstName"));

    document
      .getElementById("_lastName")
      .addEventListener("click", () => setSortingField("lastName"));

    document
      .getElementById("_email")
      .addEventListener("click", () => setSortingField("email"));

    document
      .getElementById("_contactNumber")
      .addEventListener("click", () => setSortingField("contactNumber"));

    document
      .getElementById("_position")
      .addEventListener("click", () => setSortingField("position"));
  } catch (error) {
    console.error(error);
  }
});
