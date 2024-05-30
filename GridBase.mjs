import * as utils from "./utility.mjs";
import * as services from "./Services.mjs";

const gridBaseTemplate = document.createElement("div");
gridBaseTemplate.id = "gridBaseTemplate";
gridBaseTemplate.innerHTML = `
<link rel="stylesheet" href="./Styles/GridBase.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    />
    <div id="mainHeadingContainer" class="permissibleScreen">
    <h1 id="mainHeading"></h1>
    <div id="mH-buttons-container">
      <button id="createBtn">Add Record 

      </button>
    </div>
  </div>
  <div id="nr-msg-container" class="permissibleScreen">
    <h1 id="nr-msg">No Records</h1>
  </div>
  <div id="mn-tb-con" class="permissibleScreen">
    <div id="table-container">
      <table id="employeeTable">
        <thead id="tableHead"></thead>
        <tbody id="tableBody"></tbody>
      </table>
    </div>
    <div id="pagination-box">
      <div class="page-size">
        <label for="pageSize">Page size:</label>
        <select id="pageSize">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="page-info">
        <span id="pagesStatus"></span>
      </div>
      <div class="page-info">
        <span id="recordsStatus"></span>
      </div>
      <div class="pagination-buttons">
        <button id="jumpToFirstPage">
          <i class="fa-solid fa-backward-fast"></i>
        </button>
        <button id="prevPage">
          <i class="fa-solid fa-caret-left"></i>
        </button>
        <button id="nextPage">
          <i class="fa-solid fa-caret-right"></i>
        </button>
        <button id="jumpToLastPage">
          <i class="fa-solid fa-forward-fast"></i>
        </button>
      </div>
    </div>
  </div>
<div id="myModal" class="modal">
<div class="modal-content">
  <h2 class="createModalHeading">Enter Data</h2>

  <form id="modalForm">
    <div class="createModalFields">
      <table class="createModalTable" id="createModalTable">
      <tr>
      <td>
        <label for="CreateModalEmployeeId" class="createModalitems"
          >Employee ID <span class="man-star">*</span></label
        >
      </td>

      <td>
        <input
          class="createModalitems"
          type="number"
          id="CreateModalEmployeeId"
          name="CreateModalEmployeeId"
          required
        />
        <br />
        <small id="cM-eid-i-evm">Enter the Employee ID</small>
      </td>
    </tr>
    <tr>
      <td>
        <label for="CreateModalFirstName" class="createModalitems"
          >First Name <span class="man-star">*</span></label
        >
      </td>
      <td>
        <input
          class="createModalitems"
          type="text"
          id="CreateModalFirstName"
          name="CreateModalFirstName"
          required
        /><br />
        <small id="cM-fn-i-evm">Enter the First Name</small>
      </td>
    </tr>
    <tr>
      <td>
        <label for="CreateModalLastName" class="createModalitems"
          >Last Name
        </label>
      </td>
      <td>
        <input
          type="text"
          id="CreateModalLastName"
          name="CreateModalLastName"
          class="createModalitems"
        />
      </td>
    </tr>
    <tr>
      <td>
        <label for="CreateModalEmail" class="createModalitems"
          >Email
        </label>
      </td>
      <td>
        <input
          type="email"
          id="CreateModalEmail"
          name="CreateModalEmail"
          class="createModalitems"
        /><br />
        <small id="cM-em-i-evm">Enter a valid email </small>
      </td>
    </tr>
    <tr>
      <td>
        <label for="CreateModalContactNumber" class="createModalitems"
          >Contact Number
        </label>
      </td>
      <td>
        <input
          type="number"
          id="CreateModalContactNumber"
          name="CreateModalContactNumber"
          class="createModalitems"
        /><br />
        <small id="cM-cn-i-evm">Enter a valid Phone number</small>
      </td>
    </tr>
    <tr>
      <td>
        <label for="CreateModalPosition" class="createModalitems"
          >Position
        </label>
      </td>
      <td>
        <input
          type="text"
          id="CreateModalPosition"
          name="CreateModalPosition"
          class="createModalitems"
        />
      </td>
    </tr>
      </table>
    </div>

    <div class="createModalButtons">
      <button type="submit" id="submitModal">Submit</button>
      <button type="button" id="cancelModal">Cancel</button>
    </div>
  </form>
</div>
</div>

<div id="updateModal" class="modal">
<div class="modal-content">
  <h2 class="updateModalHeading">Update Record</h2>

  <form id="updateModalForm">
    <div class="createModalFields">
      <table class="updateModalTable">
        <tr>
          <td>
            <label for="UpdateModalEMPLOYEEID" class="createModalitems"
              >Employee ID <span class="man-star">*</span></label
            >
          </td>
          <td class="updateModalInput">
            <input
              class="createModalitems"
              type="number"
              id="UpdateModalEMPLOYEEID"
              name="UpdateModalEMPLOYEEID"
              required
              disabled
            /><br />
            <small id="uM-eid-i-evm">Enter the Employee ID</small>
          </td>
        </tr>
        <tr>
          <td>
            <label for="UpdateModalFIRSTNAME" class="createModalitems"
              >First Name <span class="man-star">*</span></label
            >
          </td>
          <td>
            <input
              class="createModalitems"
              placeholder=""
              type="text"
              id="UpdateModalFIRSTNAME"
              name="UpdateModalFIRSTNAME"
              required
            /><br />
            <small id="uM-fn-i-evm">Enter the First Name</small>
          </td>
        </tr>
        <tr>
          <td>
            <label for="UpdateModalLASTNAME" class="createModalitems"
              >Last Name
            </label>
          </td>
          <td>
            <input
              type="text"
              id="UpdateModalLASTNAME"
              name="UpdateModalLASTNAME"
              class="createModalitems"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="UpdateModalEMAIL" class="createModalitems"
              >Email
            </label>
          </td>
          <td>
            <input
              type="email"
              id="UpdateModalEMAIL"
              name="UpdateModalEMAIL"
              class="createModalitems"
            />
            <br />
            <small id="uM-em-i-evm">Enter a valid email</small>
          </td>
        </tr>
        <tr>
          <td>
            <label for="UpdateModalCONTACTNUMBER" class="createModalitems"
              >Contact Number
            </label>
          </td>
          <td>
            <input
              type="number"
              id="UpdateModalCONTACTNUMBER"
              name="UpdateModalCONTACTNUMBER"
              class="createModalitems"
            />
            <br />
            <small id="uM-cn-i-evm">Enter a valid Phone number</small>
          </td>
        </tr>
        <tr>
          <td>
            <label for="UpdateModalPOSITION" class="createModalitems"
              >Position
            </label>
          </td>
          <td>
            <input
              type="text"
              id="UpdateModalPOSITION"
              name="UpdateModalPOSITION"
              class="createModalitems"
            />
          </td>
        </tr>
      </table>
    </div>

    <div class="updateModalButtons">
      <button type="submit" id="submitUpdateModal">Save</button>
      <button type="button" id="cancelUpdateModal">Cancel</button>
    </div>
  </form>
</div>
</div>
<div id="deleteModal" class="modal">
<div class="modal-content">
  <h2 class="deleteModalHeading">Delete Record</h2>
  <p id="deleteModalMessage"></p>
  <div class="deleteModalButtons">
    <button type="button" id="confirmDeleteModal">Confirm</button>
    <button type="button" id="cancelDeleteModal">Cancel</button>
  </div>
</div>
</div>
`;

class GridBase extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(gridBaseTemplate.cloneNode(true));

    const FAstyles = document.createElement("link");
    FAstyles.setAttribute("rel", "stylesheet");
    FAstyles.setAttribute("href", "font-6/css/all.css");
    shadow.appendChild(FAstyles.cloneNode(true));

    this.gridElement = this.shadowRoot.getElementById("gridBaseTemplate");
    this.noRecordsMessageContainer = this.shadowRoot.getElementById("nr-msg");
    this.mainGridContainer = this.shadowRoot.getElementById("mn-tb-con");
    this.paginationBox = this.shadowRoot.getElementById("pagination-box");

    this.mainGridContainer.style.display = "none";
    this.noRecordsMessageContainer.style.display = "block";

    // Retrieved attributes
    const mainHeading = this.getAttribute("main-heading") || "Data Management";
    const columnHeadings = JSON.parse(this.getAttribute("columns")) || [];
    const sortFeature = this.getAttribute("sortFeature") || "false";
    const paginationFeature = this.getAttribute("paginationFeature") || "false";
    const userType = this.getAttribute("user") || "regular";

    this.employeeTableColumns = [];
    this.employeeTableColumnsLabels = [];
    this.data = [];
    this.oldData = [];
    this.currentPage = 1;
    this.recordsPerPage = 10;
    this.sortField = "";
    this.sortAscending = true;
    this.sortingON = sortFeature.toLowerCase();
    this.paginationON = paginationFeature.toLowerCase();
    this.userClass = userType.toLowerCase();

    this.setMainHeading(mainHeading);
    this.setUserView();
    this.setPaginationBox();
    this.setColumnsHeading(columnHeadings);
    this.fetchDataAndPopulateTable();
    this.dataFetch();
    this.testing();

    // Bind event listeners pagation
    this.shadowRoot
      .getElementById("jumpToFirstPage")
      .addEventListener("click", () => this.goToFirstPage());
    this.shadowRoot
      .getElementById("prevPage")
      .addEventListener("click", () => this.goToPreviousPage());
    this.shadowRoot
      .getElementById("nextPage")
      .addEventListener("click", () => this.goToNextPage());
    this.shadowRoot
      .getElementById("jumpToLastPage")
      .addEventListener("click", () => this.goToLastPage());
    this.shadowRoot
      .getElementById("pageSize")
      .addEventListener("change", (event) => this.changePageSize(event));

    //Create Modal
    this.Createmodal = this.shadowRoot.getElementById("myModal");
    this.createBtn = this.shadowRoot.getElementById("createBtn");
    this.submitModal = this.shadowRoot.getElementById("submitModal");
    this.cancelModal = this.shadowRoot.getElementById("cancelModal");

    this.createBtn.addEventListener("click", () => this.openCreateModal());
    this.submitModal.addEventListener("click", (event) =>
      this.submitCreateModal(event)
    );
    this.cancelModal.addEventListener("click", () => this.closeCreateModel());

    //Update Modal
    this.updateModal = this.shadowRoot.getElementById("updateModal");
    this.submitUpdateModal =
      this.shadowRoot.getElementById("submitUpdateModal");
    this.cancelUpdateModal =
      this.shadowRoot.getElementById("cancelUpdateModal");

    this.cancelUpdateModal.addEventListener("click", () =>
      this.closeUpdateModel()
    );
    this.submitUpdateModal.addEventListener("click", (event) =>
      this.submitUpdateModalFunc(event)
    );

    //deleteModal
    this.deleteModal = this.shadowRoot.getElementById("deleteModal");
    this.confirmDeleteBtn =
      this.shadowRoot.getElementById("confirmDeleteModal");
    this.cancelDeleteBtn = this.shadowRoot.getElementById("cancelDeleteModal");

    this.cancelDeleteBtn.addEventListener("click", () =>
      this.closeDeleteModel()
    );
    this.confirmDeleteBtn.addEventListener("click", async (event) =>
      this.submitDeleteModalFunc(event)
    );
  }

  connectedCallback() {
    console.log("GridBase connected to the DOM!");
  }

  async testing() {
    const sortInfo = {
      name: "LASTNAME",
      order: "DESC",
    };
    const response = await utils.postJson("employee/search", sortInfo);
    const data = await response.json();
    console.log(data);
  }

  setUserView() {
    const addButtonContainer = this.shadowRoot.getElementById(
      "mH-buttons-container"
    );
    if (this.userClass !== "admin") addButtonContainer.style.display = "none";
  }

  setPaginationBox() {
    if (this.paginationON === "true") {
      this.paginationBox.style.display = "flex";
    } else {
      this.paginationBox.style.display = "none";
    }
  }

  setMainHeading(mainHeading) {
    const mH = this.shadowRoot.getElementById("mainHeading");
    mH.innerHTML = mainHeading.slice(0, 50);
  }

  setColumnsHeading(columnHeadings) {
    if (columnHeadings.length === 0) {
      services.errorNotifying("Grid columns headings not defined");
      throw new Error("Grid columns headings not defined");
    }
    let newColumn = [];

    columnHeadings.forEach((element) => {
      newColumn.push(element.split(" ").join("").toUpperCase());
    });

    this.employeeTableColumns = [...newColumn];
    this.employeeTableColumnsLabels = [...columnHeadings];
  }

  async dataFetch() {
    try {
      const orderBy = this.sortAscending === true ? "ASC" : "DESC";
      const sortInfo = {
        name: this.sortField,
        order: orderBy,
      };
      const response = await utils.postJson("employee/search", sortInfo);
      let data = await response.json();
      // const response2 = await utils.getJson("checkDB");
      // const numRecordsData = await response2.json();
      const numRecords = data.length;
      if (numRecords === 0) {
        this.mainGridContainer.style.display = "none";
        this.noRecordsMessageContainer.style.display = "block";
      } else {
        this.noRecordsMessageContainer.style.display = "none";
        this.mainGridContainer.style.display = "block";
      }
      this.oldData = [...data];
      this.data = [...data];
    } catch (error) {
      services.errorNotifying("404 Server Not Found");
      throw error;
    }
  }

  async fetchDataAndPopulateTable() {
    try {
      const orderBy = this.sortAscending === true ? "ASC" : "DESC";
      const sortInfo = {
        name: this.sortField,
        order: orderBy,
      };
      const response = await utils.postJson("employee/search", sortInfo);
      const data = await response.json();
      this.data = data;
      this.oldData = [...data];
      this.populateTableHeader();
      this.populateTable();
      //this.updatePageInfo();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  populateTableHeader() {
    const tableHead = this.shadowRoot.getElementById("tableHead");
    tableHead.innerHTML = "";
    const row = tableHead.insertRow();

    this.employeeTableColumnsLabels.forEach((element) => {
      var th = document.createElement("TH");
      var Div = document.createElement("div");

      Div.classList.add("icond", "prevent-select");
      Div.id = `_${element.split(" ").join("").toUpperCase()}`;
      Div.innerText = ` ${element.charAt(0).toUpperCase()}${element.slice(1)} `;

      if (this.sortingON == "true") {
        const Icon = document.createElement("i");
        Icon.classList.add("fa-solid", "fa-sort", "sortCarrot");
        Div.appendChild(Icon);
      }
      th.appendChild(Div);
      row.appendChild(th);
    });

    if (this.userClass === "admin") {
      var th = document.createElement("TH");
      th.id = "action_column";
      row.appendChild(th);
      tableHead.appendChild(row);
    }

    if (this.sortingON == "true") {
      this.employeeTableColumns.forEach((element) => {
        this.shadowRoot
          .getElementById(`_${element}`)
          .addEventListener("click", () => this.setSortingField(`${element}`));
      });
    }
  }

  populateTable() {
    const tableBody = this.shadowRoot.getElementById("tableBody");
    // if (this.sortField.length !== 0) {
    //   this.data.sort((a, b) =>
    //     this.sortAscending
    //       ? a[this.sortField].localeCompare(b[this.sortField])
    //       : b[this.sortField].localeCompare(a[this.sortField])
    //   );
    // }
    var startIndex = 0;
    var endIndex = this.data.length;

    if (this.paginationON === "true") {
      startIndex = (this.currentPage - 1) * this.recordsPerPage;
      endIndex = startIndex + this.recordsPerPage;
    }

    const paginatedData = this.data.slice(startIndex, endIndex);

    tableBody.innerHTML = "";
    paginatedData.forEach((employee) => {
      const row = document.createElement("tr");

      this.employeeTableColumns.forEach((column) => {
        const cell = document.createElement("td");
        cell.textContent = employee[column];
        row.appendChild(cell);
      });

      const actionCell = document.createElement("td");

      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen", "editIcon");
      editIcon.addEventListener("click", () => this.openUpdateModal(employee));
      actionCell.appendChild(editIcon);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "deleteIcon");
      deleteIcon.addEventListener("click", () =>
        this.openDeleteModal(employee.EMPLOYEEID)
      );
      actionCell.appendChild(deleteIcon);

      if (this.userClass === "admin") {
        row.appendChild(actionCell);
      }

      tableBody.appendChild(row);
    });

    if (this.sortingON == "true") {
      this.updateIcons();
    }
    this.updatePageInfo();
  }

  async sortRecords() {
    try {
      // const response = await utils.postJson("sortRecords", {
      //   columnName: sortCol,
      //   sortOrder: sortOrder,
      // });
      // const newData = await response.json();

      const orderBy = this.sortAscending === true ? "ASC" : "DESC";
      const sortInfo = {
        name: this.sortField,
        order: orderBy,
      };
      const response = await utils.postJson("employee/search", sortInfo);
      const data = await response.json();
      this.data = [...data];
      this.populateTable();
      console.log("sortRecords", data);
    } catch (error) {
      console.log(error);
    }
  }

  setSortingField(field) {
    if (this.sortField != field) {
      this.sortField = field;
      this.sortAscending = true;
      this.sortRecords();
    } else if (this.sortField === field && this.sortAscending === true) {
      this.sortAscending = false;
      this.sortRecords();
    } else if (this.sortField === field && this.sortAscending === false) {
      this.sortField = "";
      // this.data = [...this.oldData];
      this.sortRecords();
      this.populateTable();
    }
    // this.fetchDataAndPopulateTable();
  }

  updateIcons() {
    const allDiv = this.shadowRoot.querySelectorAll(".icond");

    allDiv.forEach((icon) => {
      icon.querySelector("i").classList.remove("fa-arrow-up", "fa-arrow-down");
      icon.querySelector("i").classList.add("fa-sort");
    });
    if (this.sortField.length !== 0) {
      const div = this.shadowRoot.getElementById(`_${this.sortField}`);
      if (!this.sortAscending) {
        div.querySelector("i").classList.remove("fa-arrow-up", "fa-sort");
        div.querySelector("i").classList.add("fa-arrow-down");
      }
      if (this.sortAscending) {
        div.querySelector("i").classList.remove("fa-arrow-down", "fa-sort");
        div.querySelector("i").classList.add("fa-arrow-up");
      }
    }
  }

  validateData(formData, modalType) {
    const { employeeId, firstName, lastName, email, contactNumber, position } =
      formData;

    let regex = new RegExp(
      "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})?$"
    );
    let result = regex.test(email);

    const eid = this.shadowRoot.getElementById(`${modalType}-eid-i-evm`);
    const em = this.shadowRoot.getElementById(`${modalType}-em-i-evm`);
    const fn = this.shadowRoot.getElementById(`${modalType}-fn-i-evm`);
    const cn = this.shadowRoot.getElementById(`${modalType}-cn-i-evm`);

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
  }

  //Pagination Box

  changePageSize(event) {
    this.recordsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
    // this.fetchDataAndPopulateTable();
    this.populateTable();
  }

  goToFirstPage() {
    if (this.currentPage === 1) return;
    this.goToPage(1);
  }

  goToNextPage() {
    const totalPages = Math.ceil(this.data.length / this.recordsPerPage);
    if (this.currentPage < totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToLastPage() {
    const totalPages = Math.ceil(this.data.length / this.recordsPerPage);
    if (this.currentPage === totalPages) return;
    this.goToPage(totalPages);
    this.setPaginationBox();
  }

  goToPage(page) {
    this.currentPage = page;
    this.fetchDataAndPopulateTable();
  }
  async updatePageInfo() {
    if (this.paginationON !== "true") return;
    try {
      const totalPages = Math.ceil(this.data.length / this.recordsPerPage);

      const orderBy = this.sortAscending === true ? "ASC" : "DESC";
      const sortInfo = {
        name: this.sortField,
        order: orderBy,
      };
      const response = await utils.postJson("employee/search", sortInfo);
      const data = await response.json();
      // const response = await utils.getJson("checkDB");
      // const numRecordsData = await response.json();
      // console.log("data1length", data1.length);
      // console.log("numRecords", numRecordsData.numRecords);
      const numRecords = data.length;
      const offset =
        this.currentPage * this.recordsPerPage - this.recordsPerPage + 1;
      const limitk =
        numRecords >= this.currentPage * this.recordsPerPage
          ? this.currentPage * this.recordsPerPage
          : numRecords;
      if (this.currentPage > totalPages) this.goToPreviousPage();

      this.shadowRoot.getElementById(
        "pagesStatus"
      ).textContent = `Page ${this.currentPage} of ${totalPages}`;
      this.shadowRoot.getElementById(
        "recordsStatus"
      ).textContent = `${offset} to ${limitk} of ${numRecords} Records`;
    } catch (error) {
      console.log("Error:Page info updation error");
      throw error;
    } finally {
      console.log("hello");
    }
  }

  //Create Modal Functions

  clearCreateModalInput() {
    const createForm = this.shadowRoot.getElementById("modalForm");
    const createFormInput = createForm.querySelectorAll("input");
    createFormInput.forEach((input) => {
      input.value = "";
    });
    this.Createmodal.style.display = "none";
  }

  openCreateModal() {
    // const table = this.shadowRoot.getElementById("createModalTable");
    // table.innerHTML = "";
    // this.employeeTableColumns.forEach((column) => {
    //   const row = document.createElement("tr");

    //   const labelCell = document.createElement("td");
    //   const label = document.createElement("label");
    //   label.textContent = `${column.charAt(0).toUpperCase()}${column.slice(
    //     1
    //   )} `;
    //   label.classList.add("createModalitems");
    //   label.htmlFor = `CreateModal${column}`;
    //   labelCell.appendChild(label);
    //   row.appendChild(labelCell);

    //   const inputCell = document.createElement("td");
    //   const input = document.createElement("input");
    //   input.type = "text";
    //   input.id = `CreateModal${column}`;
    //   input.name = `CreateModal${column}`;
    //   input.required = true;
    //   input.classList.add("createModalitems");
    //   inputCell.appendChild(input);
    //   row.appendChild(inputCell);

    //   table.appendChild(row);
    // });
    this.Createmodal.style.display = "block";
  }

  async submitCreateModal(event) {
    event.preventDefault();

    try {
      // const formData = {};

      // this.employeeTableColumns.forEach((column) => {
      //   const value = this.shadowRoot.getElementById(
      //     `CreateModal${column}`
      //   ).value;
      //   formData[column] = value;
      // });
      // console.log("hello");
      // console.log(formData);
      const formData = {
        employeeId: this.shadowRoot.getElementById("CreateModalEmployeeId")
          .value,
        firstName: this.shadowRoot.getElementById("CreateModalFirstName").value,
        lastName: this.shadowRoot.getElementById("CreateModalLastName").value,
        email: this.shadowRoot.getElementById("CreateModalEmail").value,
        contactNumber: this.shadowRoot.getElementById(
          "CreateModalContactNumber"
        ).value,
        position: this.shadowRoot.getElementById("CreateModalPosition").value,
      };

      if (!this.validateData(formData, "cM")) {
        return;
      }
      const response2 = await services.validateID(formData);
      const data = await response2.json();

      const eid = this.shadowRoot.getElementById(`cM-eid-i-evm`);
      if (data.exists) {
        eid.innerText = "The Employee ID already exists";
        eid.style.display = "block";
        console.log(eid.innerText);
        return;
      }
      eid.innerText = "Enter the Employee ID";
      eid.style.display = "none";
      const response = await utils.postJson("employee", formData);
      if (response.ok) {
        console.log("Employee Record added successfully");
        services.infoNotifying("Employee Record added successfully");
        await this.dataFetch();
        // this.fetchDataAndPopulateTable();
        this.populateTable();
        -this.clearCreateModalInput();
      } else {
        console.error("Failed to add employee record");
        services.errorNotifying("Failed to add employee record");
        this.Createmodal.style.display = "none";
      }
    } catch (error) {
      console.error("Failed to add employee record");
      services.errorNotifying("Failed to add employee record");
      this.clearCreateModalInput();
    }
  }
  closeCreateModel() {
    const eid = this.shadowRoot.getElementById("cM-eid-i-evm");
    const em = this.shadowRoot.getElementById("cM-em-i-evm");
    const fn = this.shadowRoot.getElementById("cM-fn-i-evm");
    const cn = this.shadowRoot.getElementById("cM-cn-i-evm");

    em.style.display = "none";
    eid.style.display = "none";
    fn.style.display = "none";
    cn.style.display = "none";

    this.clearCreateModalInput();
  }

  //Update Modal

  openUpdateModal(employee) {
    this.shadowRoot.getElementById("UpdateModalEMPLOYEEID").value =
      employee.EMPLOYEEID;
    this.shadowRoot.getElementById("UpdateModalFIRSTNAME").value =
      employee.FIRSTNAME;
    this.shadowRoot.getElementById("UpdateModalLASTNAME").value =
      employee.LASTNAME;
    this.shadowRoot.getElementById("UpdateModalEMAIL").value = employee.EMAIL;
    this.shadowRoot.getElementById("UpdateModalCONTACTNUMBER").value =
      employee.CONTACTNUMBER;
    this.shadowRoot.getElementById("UpdateModalPOSITION").value =
      employee.POSITION;

    this.updateModal.style.display = "block";
  }

  async submitUpdateModalFunc(event) {
    event.preventDefault();
    try {
      const formData = {
        employeeId: this.shadowRoot.getElementById("UpdateModalEMPLOYEEID")
          .value,
        firstName: this.shadowRoot.getElementById("UpdateModalFIRSTNAME").value,
        lastName: this.shadowRoot.getElementById("UpdateModalLASTNAME").value,
        email: this.shadowRoot.getElementById("UpdateModalEMAIL").value,
        contactNumber: this.shadowRoot.getElementById(
          "UpdateModalCONTACTNUMBER"
        ).value,
        position: this.shadowRoot.getElementById("UpdateModalPOSITION").value,
      };

      if (!this.validateData(formData, "uM")) {
        return;
      }

      const response = await utils.updateJson("employee", formData);

      if (response.ok) {
        console.log("Employee record updated successfully");
        services.infoNotifying("Employee record updated successfully");
        this.updateModal.style.display = "none";
        await this.dataFetch();
        // this.fetchDataAndPopulateTable();
        this.populateTable();
      } else {
        console.error("Error updating data:", error);
        services.errorNotifying("Failed to update employee record");
        this.updateModal.style.display = "none";
      }
    } catch (error) {
      console.error("Failed to update employee record", error);
      services.errorNotifying("Failed to update employee record");
      this.updateModal.style.display = "none";
    }
  }

  closeUpdateModel() {
    const eid = this.shadowRoot.getElementById("uM-eid-i-evm");
    const em = this.shadowRoot.getElementById("uM-em-i-evm");
    const fn = this.shadowRoot.getElementById("uM-fn-i-evm");
    const cn = this.shadowRoot.getElementById("uM-cn-i-evm");

    em.style.display = "none";
    eid.style.display = "none";
    fn.style.display = "none";
    cn.style.display = "none";

    this.updateModal.style.display = "none";
  }

  //Delete Modal

  openDeleteModal(employeeId) {
    this.shadowRoot.getElementById(
      "deleteModalMessage"
    ).textContent = `Are you sure you want to proceed with the deletion of the employee record associated with Employee ID ${employeeId}`;
    this.deleteModal.style.display = "block";
  }

  async submitDeleteModalFunc(event) {
    event.preventDefault();
    try {
      const employeeId = this.shadowRoot
        .getElementById("deleteModalMessage")
        .textContent.split(" ")
        .pop();

      const response = await utils.deleteJson("employee", {
        employeeId: employeeId,
      });

      if (response.ok) {
        console.log("Employee record deleted successfully");
        services.infoNotifying("Employee record deleted successfully");
        this.deleteModal.style.display = "none";
        await this.dataFetch();
        // this.fetchDataAndPopulateTable();
        this.populateTable();
      } else {
        console.error("Failed to delete employee record");
        services.errorNotifying("Failed to delete employee record");
        this.deleteModal.style.display = "none";
      }
    } catch (error) {
      console.error("Failed to delete employee record");
      services.errorNotifying("Failed to delete employee record");
      this.deleteModal.style.display = "none";
    }
  }

  closeDeleteModel() {
    this.deleteModal.style.display = "none";
  }
}

customElements.define("grid-base", GridBase);
