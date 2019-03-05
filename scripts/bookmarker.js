'use strict';

/* global store */
// eslint-disable-next-line no-unused-vars
const bookmarker = (function(){
  
  // private methods


  // public methods

  function render() {
    if (store.adding) {
      $('.controls').html(`<label for="bookmark-title">Title:</label>
      <input type="text" name="title" id="bookmark-title"/>
      <label for="bookmark-url">url:</label>
      <input type="url" name="url" id="bookmark-url"/>
      <label for="description">Description:</label>
      <input type="text" name="description" id="description"/>
      <!-- need to research how to insert star selector-->
      <button id="cancel-btn">Cancel</button>
      <input type="submit" value="Submit"/>`);

    } else {
      $('.controls').html(`<button id="dropdown">Minimum Rating: *</button>
      <button id="add-new">Add New</button>`);
    }
  }

  return {
    render
  };
}());