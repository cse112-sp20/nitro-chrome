const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
// // GET tasks
let response = null;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        response = JSON.parse(xhr.responseText);
        console.log(response);
    }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send();

/*==============================================================
Functionality of BACK button --> redirect to 'Leaderboard' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoLeaderboard() {
    location.href = "./leaderboard.html";
}
backBtn.addEventListener('click', gotoLeaderboard);

let myMap = new Map();

myMap.set("Andrew", 0);
myMap.set("Austin", 0);
myMap.set("Dimitri", 0);
myMap.set("Jason", 0);
myMap.set("Johnny", 0);
myMap.set("Kaylen", 0);
myMap.set("Nicholas", 0);
myMap.set("Phuc", 0);
myMap.set("Race", 0);
myMap.set("Yanxun", 0);

let table = document.getElementById("user-table");

function populateTable(value, key) {
    let anchorUser = document.createElement("a");
    // Insert a new row at the end of the table
    let newRow = table.insertRow(-1);
    // create/insert 2 new <td> (table data/cell) elements in the new row
    let cellUser = newRow.insertCell(0); // Team Name  
    // create/insert the contents of the new cells
    let cellUserText = document.createTextNode(`${key}`);

    anchorUser.appendChild(cellUserText);
    anchorUser.onclick = function () {
        // Store the team NAME that was clicked for reference for other screens
        localStorage.setItem("curr_user", key);
        localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);
        location.href = "./userProfile.html"
    }
    anchorUser.setAttribute("style", "text-decoration:none; color: #FFFFFF;");

    cellUser.appendChild(anchorUser);
}

myMap.forEach(populateTable);