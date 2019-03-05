'use strict';

/* global store, api */
// eslint-disable-next-line no-unused-vars
const bookmarker = (function(){
  
  // private methods
  function createLi(item) {
    return `<li>${item.title}<br>
    Stars: ${item.rating}
    <button class="delete-button">X</button></li>`;
  }

  function serializeObject(form) {
    const obj = {};
    const arr = $(form).serializeArray();
    arr.forEach(item => {obj[item.name] = item.value;});
    return obj;
  }
  function handleAddButtonPressed() {
    $('.controls').on('click', '#add-new', () => {
      store.adding = true;
      render();
    });
  }

  function handleCancelButtonPressed() {
    $('.controls').on('click', '#cancel-btn', () => {
      store.adding = false;
      render();
    });
  }

  function handleSubmitNewItem() {
    $('.controls').on('submit', '#new-item-form', (event => {
      event.preventDefault();
      const newItem = serializeObject(event.currentTarget);
      api.addMark(newItem).then(() => {
        store.addMark(newItem);
        store.adding = false;
        bookmarker.render();
      });
    }));
  }

  // public methods

  function render() {
    if (store.adding) {
      $('#new-item-form').html(`<label for="bookmark-title">Title:</label>
      <input type="text" name="title" id="bookmark-title"/>
      <label for="bookmark-url">url:</label>
      <input type="url" name="url" id="bookmark-url"/>
      <label for="description">Description:</label>
      <input type="text" name="description" id="description"/>
      <!-- need to research how to insert star selector-->
      <button id="cancel-btn">Cancel</button>
      <input type="submit" value="Submit"/>`);

    } else {
      $('#new-item-form').html(`<button id="dropdown">Minimum Rating: *</button>
      <button id="add-new">Add New</button>`);
    }

    $('.bookmark-list').html('');
    let htmlStr = '';
    store.bookmarks.forEach(item => {
      htmlStr += createLi(item);
    });
    $('.bookmark-list').html(htmlStr);
  }

  function createEventHandlers() {
    handleAddButtonPressed();
    handleCancelButtonPressed();
    handleSubmitNewItem();
  }

  return {
    render,
    createEventHandlers
  };
}());