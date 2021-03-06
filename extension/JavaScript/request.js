/* global module:writable */
let status = null;

function request(endpoint) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        status = Number(this.status);
     }
  };
  xhr.open("GET", endpoint, false);
  xhr.send();  
  return status;
}
module.exports = request;
