import * as utils from "./utility.mjs";
import * as services from "./Services.mjs";

const paginationBoxTemplate = document.createElement("div");
paginationBoxTemplate.innerHTML = `
<link rel="stylesheet" href="./Styles/PaginationBox.css" />
<div id="pagination-box" class="permissibleScreen">
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
</div>
`;

class PaginationBox extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(paginationBoxTemplate.cloneNode(true));

    const FAstyles = document.createElement("link");
    FAstyles.setAttribute("rel", "stylesheet");
    FAstyles.setAttribute("href", "font-6/css/all.css");
    shadow.appendChild(FAstyles.cloneNode(true));

    this.paginationBox = this.shadowRoot.getElementById("pagination-box");
    // console.log(this.paginationBox.style.display);
    // this.paginationBox.style.display = "flex";

    //Pagination event listeners Binding

    this.currentPage = 1;
    //Current Page is the connection b/w this and GridBase.js.

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

    this.updatePageInfo();
  }

  connectedCallback() {
    console.log("PaginationBox connected to the DOM!");
  }

  changePageSize(event) {
    this.recordsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
    this.fetchDataAndPopulateTable();
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
  }

  goToPage(page) {
    this.currentPage = page;
    this.fetchDataAndPopulateTable();
  }
  async updatePageInfo() {
    const response = await utils.getJson("checkDB");
    const numRecordsData = await response.json();
    const numRecords = numRecordsData.numRecords;
    const totalPages = Math.ceil(numRecords / this.recordsPerPage);
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
  }
}

customElements.define("pagination-box", PaginationBox);
