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
    $('#new-item-form').on('submit', (event => {
      console.log('submit triggered');
      event.preventDefault();
      const newItem = serializeObject(event.currentTarget);
      api.addMark(newItem).then(() => {
        store.addMark(newItem);
        store.adding = false;
        bookmarker.render();
      }).catch(error => {
        //console.log(error.message); // need to fix this
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
      <fieldset><legend>Rating</legend>
      <input type="text" name="desc" id="description"/>
      <input type="radio", id="1-star", name="rating", value="1">
      <label for="1-star">&#9733;</label>
      <input type="radio", id="2-star", name="rating", value="2">
      <label for="2-star">&#9733;&#9733;</label>
      <input type="radio", id="3-star", name="rating", value="3">
      <label for="3-star">&#9733;&#9733;&#9733;</label>
      <input type="radio", id="4-star", name="rating", value="4">
      <label for="4-star">&#9733;&#9733;&#9733;&#9733;</label>
      <input type="radio", id="5-star", name="rating", value="5">
      <label for="5-star">&#9733;&#9733;&#9733;&#9733;&#9733;</label></fieldset>
      <button id="cancel-btn">Cancel</button>
      <input type="submit" value="Submit" class="submit-new"/>`);
      $('#min-or-add').html('');
    } else {
      $('#new-item-form').html('');
      $('#min-or-add').html(`<button id="dropdown">Minimum Rating: *</button>
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