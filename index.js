document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    //Using IN-BUILT FUNCTION
    // data.sort((a, b) => a.employeeId.localeCompare(b.employeeId));

    data.sort((a, b) => (a.employeeId > b.employeeId ? 1 : -1));

    const tableBody = document.getElementById("tableBody");

    data.forEach((employee) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = employee.employeeId;
      row.insertCell(1).textContent = employee.firstName;
      row.insertCell(2).textContent = employee.lastName;
      row.insertCell(3).textContent = employee.email;
      row.insertCell(4).textContent = employee.contactNumber;
      row.insertCell(5).textContent = employee.position;
    });
  } catch (error) {
    console.error(error);
  }
});
