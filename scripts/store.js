'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  function addMark(item) {
    this.bookmarks.push(item);
  }
  
  return {
    bookmarks: [],
    detailed: false,
    adding: false,
    error: null,
    addMark
  };
}());