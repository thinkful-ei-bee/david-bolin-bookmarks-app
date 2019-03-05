'use strict';

/*global api, store, bookmarker */

$(function() {
  api.getBookmarks()
    .then(data => {data.forEach(item => {
      store.addMark(item);
    });
    bookmarker.createEventHandlers();
    bookmarker.render();
    });
});