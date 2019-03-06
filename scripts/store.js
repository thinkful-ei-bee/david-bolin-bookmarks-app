'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  function addMark(item) {
    item.detailed = false;
    this.bookmarks.push(item);
  }
  
  return {
    bookmarks: [],
    adding: false,
    error: null,
    addMark
  };
}());