document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    let data = await response.json();

    const toggleButton = document.querySelector(".switch input");
    const tableBody = document.getElementById("tableBody");

    const populateTable = (sort) => {
      data.sort((a, b) =>
        sort
          ? a.employeeId.localeCompare(b.employeeId)
          : b.employeeId.localeCompare(a.employeeId)
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
    };

    populateTable(true);

    toggleButton.addEventListener("change", function () {
      const sort = this.checked;

      populateTable(sort);
    });
  } catch (error) {
    console.error(error);
  }
});
