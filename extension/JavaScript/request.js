/* eslint-disable no-undef */
function request(endpoint) {
  let xhr = new XMLHttpRequest();
  let status = null;
  xhr.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        status =  Number(this.status);
      //    let response = JSON.parse(xhr.responseText);
      //   console.log(response);  
     }
  };
  xhr.open("GET", endpoint, true);
  xhr.send();  
  return status;
}
module.exports = request;