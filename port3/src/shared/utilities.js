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
