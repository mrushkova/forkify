import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

const bookmarkContainer = document.querySelector('.bookmarks__list');

class BookmarksView extends View {
  _parentElement = bookmarkContainer;
  _errMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false)) // return string
      .join('');
  }
}

export default new BookmarksView();
