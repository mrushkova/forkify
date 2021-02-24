const searchContainer = document.querySelector('.search');
const searchField = document.querySelector('.search__field');

class SearchView {
  _parentElement = searchContainer;
  _data;

  _clearInput() {
    searchField.value = '';
  }

  getQuery() {
    const query = searchField.value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
