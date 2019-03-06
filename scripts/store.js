'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  function addMark(item) {
    item.detailed = false;
    this.bookmarks.push(item);
  }
  
  function deleteMark(id) {
    this.bookmarks = this.bookmarks.filter(ele => ele.id !== id);
  }

  function findMark(id) {
    return this.bookmarks.find(ele => ele.id === id);
  }
  return {
    bookmarks: [],
    adding: false,
    error: null,
    minimum: 3,
    addMark,
    deleteMark,
    findMark
  };
}());