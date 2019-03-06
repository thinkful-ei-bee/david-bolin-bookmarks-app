'use strict';

/* global store, api */
// eslint-disable-next-line no-unused-vars
const bookmarker = (function(){
  
  // setting up strings for the use of our render function
  const stars = ['&#9733;'];
  let starStr = '';
  let dropBtnStr = '';
  const starNames = ['one star', 'two stars', 'three stars', 'four stars', 'five stars'];
  
  for (let i = 0; i < 5; i++) {
    stars.push(stars[0] + stars[i]);

    starStr += `<input type="radio", id="${i + 1}-star", name="rating", value="${i + 1}" aria-label="${starNames[i]}"><label for="${i + 1}-star">${stars[i]}</label><br>`;

    dropBtnStr += `<button class="drop-btn" id="drop-btn-${i + 1}" aria-label="${i < 5 ? starNames[i] : ''}">${stars[i]}</button>`;
  }

  // private methods
  function createLi(item) {
    const start = `<li class="list-item" data-item-id="${item.id}"><button class="delete-button" aria-label="Delete This Item">&#x274C;</button><button class="expand-item">${item.title}</button>${item.rating ? stars[item.rating - 1] : 'No rating'}<br>`;

    let middle = '';

    if (item.detailed) {
      middle = `${item.desc}<br><a href="${item.url}" target="_blank">Visit Site</a>`;
    }

    return `${start}${middle}</li>`;
  }

  function findId(item) {
    return $(item).closest('.list-item').data('item-id');
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
      store.error = null;
      render();
    });
  }

  function handleClickOnItem() {
    $('.bookmark-list').on('click', () => {
      const id = findId($(document.activeElement).closest('li'));
      if (id) {
        if (document.activeElement.innerHTML === '❌') {
          api.deleteMark(id).then ( () => {
            store.deleteMark(id);
            render();
          });
        } else {
          store.findMark(id).detailed = !store.findMark(id).detailed;
          render();
        }
      }
    });
  }

  function handleSubmitNewItem() {
    $('#new-item-form').on('submit', (event => {
      event.preventDefault();
      const newItem = serializeObject(event.currentTarget);
      api.addMark(newItem).then((res) => {
        store.addMark(res);
        store.adding = false;
        store.error = null;
        bookmarker.render();
      }).catch(error => {
        store.error = error;
        render();
      });
    }));
  }

  function handleCloseError() {
    $('.error').click( () => {
      store.error = null;
      render();
    });
  }
  
  function handleSelectMinimum() {
    $('#min-or-add').on('click', event => {
      if (event.target.className === 'drop-btn') {
        store.minimum = event.target.id.slice(-1);
        render();
      }
    });
  }
  // public methods

  function render() {
    if (store.error) {
      $('.error').html(`Could not submit bookmark: ${store.error.message}. <button class="close-button" aria-label="Close">&#x274C;</button>`);
    } else {
      $('.error').html('');
    }
    if (store.adding) {
      $('#new-item-form').html(`<label for="bookmark-title">Title:
      <input type="text" name="title" id="bookmark-title"/></label>
      <label for="bookmark-url">url:
      <input type="text" name="url" id="bookmark-url"/></label>
      <label for="description">Description:<input type="text" name="desc" id="description"/></label>
      <fieldset><legend>Rating</legend>
      ${starStr}</fieldset><div class="sub-or-cancel">
      <button id="cancel-btn">Cancel</button>
      <input type="submit" value="Submit" class="submit-new"/></div>`);
      $('#min-or-add').html('');
    } else {
      $('#new-item-form').html('');
      $('#min-or-add').html(`<div class="dropdown"><button id="dropdown">Minimum Rating: ${(store.minimum === '0') ? 'None': stars[store.minimum - 1]}</button><div class="dropdown-menu">
      ${dropBtnStr}<button class="drop-btn" id="drop-btn-0">No Minimum</button></div></div><button id="add-new">Add New</button>`);
    }

    $('.bookmark-list').html('');
    let htmlStr = '';
    store.bookmarks.filter(item => item.rating >= store.minimum)     .forEach(item => { 
      htmlStr += createLi(item); 
    });
    $('.bookmark-list').html(htmlStr);
  }

  function createEventHandlers() {
    handleAddButtonPressed();
    handleCancelButtonPressed();
    handleSubmitNewItem();
    handleClickOnItem();
    handleSelectMinimum();
    handleCloseError();
  }

  return {
    render,
    createEventHandlers
  };
}());