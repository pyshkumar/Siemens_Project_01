document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("data.json");
    let data = await response.json();
    let oldData = [...data];

    const tableBody = document.getElementById("tableBody");
    let sortField = "";
    let sortAscending = true;

    const updateIcons = () => {
      const allIcons = document.querySelectorAll(".icond");

      allIcons.forEach((icon) => {
        icon
          .querySelector("i")
          .classList.remove("fa-arrow-up", "fa-arrow-down");
      });
      if (sortField.length !== 0) {
        const icon = document.getElementById(`_${sortField}`);
        if (!sortAscending) {
          icon.querySelector("i").classList.remove("fa-arrow-up");
          icon.querySelector("i").classList.add("fa-arrow-down");
        }
        if (sortAscending) {
          icon.querySelector("i").classList.remove("fa-arrow-down");
          icon.querySelector("i").classList.add("fa-arrow-up");
        }
      }
    };

    const populateTable = () => {
      if (sortField.length !== 0) {
        data.sort((a, b) =>
          sortAscending
            ? a[sortField].localeCompare(b[sortField])
            : b[sortField].localeCompare(a[sortField])
        );
      }
      tableBody.innerHTML = "";
      data.forEach((employee) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = employee.employeeId;
        row.insertCell(1).textContent = employee.firstName;
        row.insertCell(2).textContent = employee.lastName;
        row.insertCell(3).textContent = employee.email;
        row.insertCell(4).textContent = employee.contactNumber;
        row.insertCell(5).textContent = employee.position;
        // Action column with icons
        const actionCell = row.insertCell(6);

        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen", "editIcon");
        editIcon.addEventListener("click", () => openUpdateModal(employee));
        actionCell.appendChild(editIcon);

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "deleteIcon");
        deleteIcon.addEventListener("click", () =>
          openDeleteModal(employee.employeeId)
        );
        actionCell.appendChild(deleteIcon);
      });
      updateIcons();
    };

    populateTable();

    const setSortingField = (field) => {
      if (sortField != field) {
        sortField = field;
        sortAscending = true;
      } else if (sortField === field && sortAscending === true) {
        sortAscending = false;
      } else if (sortField === field && sortAscending === false) {
        sortField = "";
        data = [...oldData];
      }
      populateTable();
    };

    const dataFetch = async () => {
      const response = await fetch("data.json");
      let data1 = await response.json();
      oldData = [...data1];
      data = [...data1];
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

    const infoNotify = (message) => {
      Toastify({
        text: message,
        duration: 1700,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #74D680, #378B29)",
        },
      }).showToast();
    };

    const errorNotify = (message) => {
      Toastify({
        text: message,
        duration: 1500,
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right,#A00000 , #C62128)",
        },
      }).showToast();
    };

    //Function to validate entered data via modal input
    const validateData = (formData, modalType) => {
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

      const eid = document.getElementById(`${modalType}-eid-i-evm`);
      const em = document.getElementById(`${modalType}-em-i-evm`);
      const fn = document.getElementById(`${modalType}-fn-i-evm`);

      if (!employeeId) {
        eid.innerText = "Enter the Employee ID";
        eid.style.display = "block";
        return false;
      }
      eid.style.display = "none";

      if (!firstName) {
        fn.style.display = "block";
        return false;
      }
      fn.style.display = "none";

      if (!result) {
        em.style.display = "block";
        return false;
      }
      em.style.display = "none";

      return true;
    };

    // Create Modal functionality
    const Createmodal = document.getElementById("myModal");
    const createBtn = document.getElementById("createBtn");
    const submitModal = document.getElementById("submitModal");
    const cancelModal = document.getElementById("cancelModal");

    createBtn.addEventListener("click", () => {
      Createmodal.style.display = "block";
    });

    submitModal.addEventListener("click", async (event) => {
      event.preventDefault();
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

        if (!validateData(formData, "cM")) {
          return;
        }

        // Calling server to check if employeeId already exists
        const response2 = await fetch("http://localhost:3000/checkEmployeeId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employeeId: formData.employeeId }),
        });

        const data = await response2.json();

        const eid = document.getElementById(`cM-eid-i-evm`);
        if (data.exists) {
          eid.innerText = "The Employee ID already exists";
          eid.style.display = "block";
          console.log(eid.innerText);
          return;
        }
        eid.innerText = "Enter the Employee ID";
        eid.style.display = "none";

        //Calling server for modification of Database
        const response = await fetch("http://localhost:3000/addData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Data updated successfully!");
          infoNotify("Employee Record Added");
          await dataFetch();
          populateTable();
          const createForm = document.getElementById("modalForm");
          const createFormInput = createForm.querySelectorAll("input");
          createFormInput.forEach((input) => {
            input.value = "";
          });
          Createmodal.style.display = "none";
        } else {
          console.error("Failed to update data:");
          errorNotify("Failed to add employee record");
          Createmodal.style.display = "none";
        }
      } catch (error) {
        console.error("Failed to add employee record");
        errorNotify("Failed to add employee record");
        const createForm = document.getElementById("modalForm");
        const createFormInput = createForm.querySelectorAll("input");
        createFormInput.forEach((input) => {
          input.value = "";
        });
        Createmodal.style.display = "none";
      }
    });

    cancelModal.addEventListener("click", () => {
      const createForm = document.getElementById("modalForm");
      const createFormInput = createForm.querySelectorAll("input");
      createFormInput.forEach((input) => {
        input.value = "";
      });
      const eid = document.getElementById("cM-eid-i-evm");
      const em = document.getElementById("cM-em-i-evm");
      const fn = document.getElementById("cM-fn-i-evm");
      em.style.display = "none";
      eid.style.display = "none";
      fn.style.display = "none";
      Createmodal.style.display = "none";
    });

    // Update Modal functionality
    const updateModal = document.getElementById("updateModal");
    const submitUpdateModal = document.getElementById("submitUpdateModal");
    const cancelUpdateModal = document.getElementById("cancelUpdateModal");

    const openUpdateModal = (employee) => {
      document.getElementById("UpdateModalEmployeeId").value =
        employee.employeeId;
      document.getElementById("UpdateModalFirstName").value =
        employee.firstName;
      document.getElementById("UpdateModalLastName").value = employee.lastName;
      document.getElementById("UpdateModalEmail").value = employee.email;
      document.getElementById("UpdateModalContactNumber").value =
        employee.contactNumber;
      document.getElementById("UpdateModalPosition").value = employee.position;

      updateModal.style.display = "block";
    };

    submitUpdateModal.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const formData = {
          employeeId: document.getElementById("UpdateModalEmployeeId").value,
          firstName: document.getElementById("UpdateModalFirstName").value,
          lastName: document.getElementById("UpdateModalLastName").value,
          email: document.getElementById("UpdateModalEmail").value,
          contactNumber: document.getElementById("UpdateModalContactNumber")
            .value,
          position: document.getElementById("UpdateModalPosition").value,
        };

        if (!validateData(formData, "uM")) {
          return;
        }

        const response = await fetch("http://localhost:3000/editData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Employee record updated successfully");
          infoNotify("Employee record updated successfully");
          updateModal.style.display = "none";
          await dataFetch();
          populateTable();
        } else {
          console.error("Error updating data:", error);
          errorNotify("Failed to update employee record");
          updateModal.style.display = "none";
        }
      } catch (error) {
        console.error("Failed to update employee record", error);
        errorNotify("Failed to update employee record");
        updateModal.style.display = "none";
      }
    });

    cancelUpdateModal.addEventListener("click", () => {
      const eid = document.getElementById("uM-eid-i-evm");
      const em = document.getElementById("uM-em-i-evm");
      const fn = document.getElementById("uM-fn-i-evm");
      em.style.display = "none";
      eid.style.display = "none";
      fn.style.display = "none";
      updateModal.style.display = "none";
    });

    // Delete Modal functionality
    const deleteModal = document.getElementById("deleteModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteModal");
    const cancelDeleteBtn = document.getElementById("cancelDeleteModal");

    const openDeleteModal = (employeeId) => {
      document.getElementById(
        "deleteModalMessage"
      ).textContent = `Are you sure you want to proceed with the deletion of the employee record associated with Employee ID ${employeeId}`;
      deleteModal.style.display = "block";
    };

    confirmDeleteBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        const employeeId = document
          .getElementById("deleteModalMessage")
          .textContent.split(" ")
          .pop();

        const response = await fetch("http://localhost:3000/deleteData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employeeId }),
        });

        if (response.ok) {
          console.log("Employee record deleted successfully");
          infoNotify("Employee record deleted successfully");
          deleteModal.style.display = "none";
          await dataFetch();
          populateTable();
        } else {
          console.error("Failed to delete employee record");
          errorNotify("Failed to delete employee record");
          deleteModal.style.display = "none";
        }
      } catch (error) {
        console.error("Failed to delete employee record", error);
        errorNotify("Failed to delete employee record");
        deleteModal.style.display = "none";
      }
    });

    cancelDeleteBtn.addEventListener("click", () => {
      deleteModal.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
});
