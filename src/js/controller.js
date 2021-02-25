import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js'; //polyfilling
import 'regenerator-runtime'; //polyfilling async await

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Update results
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchRusults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    // Loading results
    await model.loadSearchResult(query);

    // Rendering result
    resultsView.render(model.getSearchResultPage());

    // Rendering initial pagination
    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (numServings) {
  // Update servings
  model.updateServings(numServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update the recipe view
  recipeView.update(model.state.recipe);

  // Rendering bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchRusults);
  paginationView.addHandlerClick(controlPagination);
};

init();
