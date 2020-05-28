function request(endpoint) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        return Number(this.status);
      //    let response = JSON.parse(xhr.responseText);
      //   console.log(response);  
     }
  };
  xhr.open("GET", endpoint, true);
  xhr.send();  
  
}
module.exports = request;