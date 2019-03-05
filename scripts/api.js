'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function() {
  const apiPath = 'https://thinkful-list-api.herokuapp.com/bolin/bookmarks';
 
  // private methods
  function callApi(...args) {
    let error = null;
    return fetch(...args)
      .then (res => {
        if (!res.ok) {
          error = {code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data;
      });
  }

  // public methods

  function getBookmarks() {
    return callApi(apiPath);
  }

  function deleteMark(id) {
    return callApi(apiPath + '/' + id, {method: 'DELETE'});
  } 

  function addMark(item) {
    const body = JSON.stringify(item);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };

    return callApi(apiPath, options);
  }
  return {
    getBookmarks,
    deleteMark,
    addMark
  };
}());