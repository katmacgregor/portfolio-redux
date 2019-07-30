export const handleFetch = (path, handleSuccess) => {
  fetch(path).then(function(response) {
    var contentType = response.headers.get('content-type');
    if(contentType && contentType.includes('application/json')) {
      return response.json();
    }
    throw new TypeError("not json");
  })
  .then(json => handleSuccess(json))
  .catch(error => { console.log(error); });
};

// check if an element is in the viewport
export const checkVisibility = (el) => {
  var rect = el.getBoundingClientRect();

  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || window.width()) &&
    rect.top < (window.innerHeight || window.height());
}
