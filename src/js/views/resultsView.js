import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

const resultContainer = document.querySelector('.results');

class ResultsView extends View {
  _parentElement = resultContainer;
  _errMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false)) // return string
      .join('');
  }
}

export default new ResultsView();
