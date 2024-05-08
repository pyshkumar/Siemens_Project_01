import * as utils from "./utility.mjs";
import * as services from "./Services.mjs";

const paginationBoxTemplate = document.createElement("div");
paginationBoxTemplate.innerHTML = `
<link rel="stylesheet" href="styles.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    />
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
  }
}

customElements.define("pagination-box", PaginationBox);
