document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    let data = await response.json();

    const tableBody = document.getElementById("tableBody");
    let sortField = "employeeId";
    let sortAscending = true;

    const updateIcons = () => {
      const allIcons = document.querySelectorAll(".icond");

      allIcons.forEach((icon) => {
        icon
          .querySelector("i")
          .classList.remove("fa-arrow-up", "fa-arrow-down");
        icon.querySelector("i").classList.add("fa-arrow-up");
        icon.style.color = "#1b1b1b";
      });

      const icon = document.getElementById(`_${sortField}`);
      icon.style.color = "white";
      if (!sortAscending) {
        icon.querySelector("i").classList.remove("fa-arrow-up");
        icon.querySelector("i").classList.add("fa-arrow-down");
      }
    };

    console.log(typeof data[0].employeeId);

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

    // Create Modal functionality
    const Createmodal = document.getElementById("myModal");
    const createBtn = document.getElementById("createBtn");
    const submitModal = document.getElementById("submitModal");
    const cancelModal = document.getElementById("cancelModal");

    //Function to validate entered data
    const validateData = (formData) => {
      const {
        employeeId,
        firstName,
        lastName,
        email,
        contactNumber,
        position,
      } = formData;

      let regex = new RegExp(
        "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})?$"
      );
      let result = regex.test(email);

      if (!employeeId || !firstName || !result) {
        return false;
      }

      return true;
    };

    createBtn.addEventListener("click", () => {
      Createmodal.style.display = "block";
    });

    submitModal.addEventListener("click", async () => {
      try {
        const formData = {
          employeeId: document.getElementById("CreateModalEmployeeId").value,
          firstName: document.getElementById("CreateModalFirstName").value,
          lastName: document.getElementById("CreateModalLastName").value,
          email: document.getElementById("CreateModalEmail").value,
          contactNumber: document.getElementById("CreateModalContactNumber")
            .value,
          position: document.getElementById("CreateModalPosition").value,
        };

        if (!validateData(formData)) {
          return;
        }

        //Calling server for modification of Database
        const response = await fetch("http://localhost:3000/updateData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Data updated successfully!");
          modal.style.display = "none";
          populateTable();
        } else {
          console.error("Failed to update data:");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    });

    cancelModal.addEventListener("click", () => {
      Createmodal.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
});
