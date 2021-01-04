import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

/**?
 * Web app's state
 * - Хайлтийн query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайклсан жорууд
 * - Захиалж байгаа жорийн нарлаганууд
 */

const state = {};

const controlSearch = async () => {
  // Web-с хайлтийн түлхүүр үгийг авна
  const query = searchView.getInput();

  if (query) {
    // Шинээр хайлтийн объектийг үүсгэж өгнө
    state.search = new Search(query);

    // Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ
    searchView.clearSearchValue();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // Хайлтийг гүйцэтгэнэ
    await state.search.doSearch();

    // Хайлтийн үр дүнг дэлгэцэнд гаргана
    clearLoader();
    if (state.search.result === undefined) alert("Хайлт илэрцгүй");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goToPageNumber);
  }
});

const r = new Recipe(47746);
r.getRecipe();
