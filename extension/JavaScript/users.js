const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/users";
// // GET tasks
let response = null;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        response = JSON.parse(xhr.responseText);
        console.log(response);
        //console.log(Object.keys(response));
        //console.log(Object.keys(response)[0]);
        //console.log(response[Object.keys(response)[0]]);
        useJSON(response);
    }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send();

function useJSON(response) {
    let myMap = new Map();
    let users = Object.keys(response);

    for (let i = 0; i < users.length; i++) {
        myMap.set(users[i], response[users[i]]);
    }

    myMap.forEach(populateTable);
}

/*==============================================================
Functionality of BACK button --> redirect to 'Leaderboard' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoLeaderboard() {
    location.href = "./leaderboard.html";
}
backBtn.addEventListener('click', gotoLeaderboard);

function populateTable(value, key) {
    let table = document.getElementById("user-table");
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
        localStorage.setItem("curr_team", value.team);
        localStorage.setItem("curr_points_completed", value.points_completed);
        localStorage.setItem("curr_points_required", value.points_required);
        localStorage.setItem("curr_productivity", value.productivity);
        localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);
        location.href = "./userProfile.html"
    }
    anchorUser.setAttribute("style", "text-decoration:none; color: #FFFFFF;");

    cellUser.appendChild(anchorUser);
}