import View from './view.js';
import icons from 'url:../../img/icons.svg';

const upload = document.querySelector('.upload');
const window = document.querySelector('.add-recipe-window');
const overlay = document.querySelector('.overlay');
const btnOpen = document.querySelector('.nav__btn--add-recipe');
const btnClose = document.querySelector('.btn--close-modal');
const dataArr = [...new FormData(upload)];
const data = Object.fromEntries(dataArr);

class addRecipeView extends View {
  _parentElement = upload;
  _message = 'Recipe was successfully uploaded!';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toogleWindow() {
    overlay.classList.toggle('hidden');
    window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    btnClose.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
