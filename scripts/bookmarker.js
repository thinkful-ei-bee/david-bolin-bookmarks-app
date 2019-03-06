'use strict';

/* global store, api */
// eslint-disable-next-line no-unused-vars
const bookmarker = (function(){
  
  const stars = [
    '&#9733;',
    '&#9733;&#9733;',
    '&#9733;&#9733;&#9733;',
    '&#9733;&#9733;&#9733;&#9733;',
    '&#9733;&#9733;&#9733;&#9733;&#9733'
  ];

  let starStr = '';
  for (let i = 0; i < 5; i++) {
    starStr += `<input type="radio", id="${i + 1}-star", name="rating", value="${i + 1}">
    <label for="${i + 1}-star">${stars[i]}</label>`;
  }

  // private methods
  function createLi(item) {
    //const 
    return `<li>${item.title}<br>
    ${stars[item.rating - 1]}
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
      <label for="description">Description:</label><input type="text" name="desc" id="description"/>
      <fieldset><legend>Rating</legend>
      ${starStr}</fieldset>
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