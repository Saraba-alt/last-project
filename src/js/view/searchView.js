import { elements } from "./base";

// Private function
const renderRecipe = (recipe) => {
  const markup = `<li>
            <a class="results__link" href="#${recipe.recipe_id}">
              <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test" />
              </figure>
              <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
              </div>
            </a>
          </li>`;

  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchValue = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resultPerPage = 10) => {
  // Хайлтийн үр дүнг хуудаслаж үзүүлэх
  const start = (currentPage - 1) * resultPerPage;
  const end = currentPage * resultPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // Хуудаслалтын товчуудыг харуулах
  const totalPages = Math.ceil(recipes.length / resultPerPage);
  renderButtons(currentPage, totalPages);
};

const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${direction}"></use>
                    </svg>
                    <span>Хуудас ${page}</span>
                </button>
                `;

const renderButtons = (currentPage, totalPages) => {
  let buttonHTML;

  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудас дээр байна, 2-р хуудас гэдэг товч гаргах
    buttonHTML = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх хуудас, дараагын хуудас гэсэн
    buttonHTML = createButton(currentPage - 1, "prev", "left");
    buttonHTML += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === currentPage) {
    // Хамгийн сүүлийн хуудас дээр байна, өмнөх хуудас руу шилжих товч гаргах
    buttonHTML = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML);
};
