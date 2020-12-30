import Search from "./model/Search";

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
  const query = "pizza";

  if (query) {
    // Шинээр хайлтийн объектийг үүсгэж өгнө
    state.search = new Search(query);
    // Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ
    // Хайлтийг гүйцэтгэнэ
    await state.search.doSearch();
    // Хайлтийн үр дүнг дэлгэцэнд гаргана
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
