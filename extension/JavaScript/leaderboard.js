/*global chrome*/
/*eslint no-undef: "error"*/

/****************************************************************
TODO/NOTES:
Where to implement clear_completed endpoint? --> only for testing
****************************************************************/

const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
const login_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/login";
const logout_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/logout";
// const clear_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/clear_completed";

let response = null;
var rankByPoints = true;
var reverse = false;

/*==============================================================
Functionality of 'Tasks' button
==============================================================*/
function gotoTasks() {
   localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);
   location.href = "./tasks.html";
}

/*==============================================================
Functionality of 'Users' button
==============================================================*/
function gotoUser() {
   location.href = "./users.html";
}

/*==============================================================
Functionality of 'Logout' button --> logout the user
==============================================================*/
function logOut() {

   // Redirect to logout endpoint

   chrome.tabs.create({ url: logout_endpoint, active: false }, function(tab) {
     setTimeout(function() {
       chrome.tabs.remove(tab.id);
       localStorage.clear();
     }, 900);
   });

   // make sure to clean local storage
   setTimeout(function() {location.reload();}, 1000);
}

/*==============================================================
Functionality of 'Login' button
==============================================================*/
function logIn() {
   // make sure to clear local storage
   localStorage.clear();

   // checks if user is logged in or not
   localStorage.setItem("logged_in", true);

   // Redirect user to login endpoint
   chrome.tabs.create({ url: login_endpoint });
}

/*==============================================================
Functionality of 'sort-by-points' button --> Sort teams by points
==============================================================*/
function sortByPoints() {
   reverse = rankByPoints && !reverse;
   rankByPoints = true;
   useJSON(response);
}

/*==============================================================
Functionality of 'sort-by-name' button --> Sort teams by name
==============================================================*/
function sortByName() {
   reverse = !(rankByPoints || reverse);
   rankByPoints = false;
   useJSON(response);
}

/*========================================================================
Functionality of 'dark' button --> Interchange between dark and light mode
========================================================================*/
function switchMode() {
   console.log("Button Clicked");
   let card = document.getElementById("card");
   let buttons = document.getElementsByClassName("change-color");
   let mode = localStorage.getItem("mode");
   let modeButton = document.getElementById("dark-mode");
   if (mode == "dark") {
      modeButton.innerHTML = "<img src='../images/dark.png'><br>Light"
      localStorage.setItem("mode", "light");
      card.classList.add("light-mode");
      card.classList.remove("dark-mode");
      for (let i = 0; i < buttons.length; i++) {
         buttons[i].classList.add("light-mode-btn-text");
         buttons[i].classList.remove("dark-mode-btn-text");
      }
   } else {
      modeButton.innerHTML = "<img src='../images/dark.png'><br>Dark"
      localStorage.setItem("mode", "dark");
      card.classList.add("dark-mode");
      card.classList.remove("light-mode");
      for (let i = 0; i < buttons.length; i++) {
         buttons[i].classList.add("dark-mode-btn-text");
         buttons[i].classList.remove("light-mode-btn-text");
      }
   }
}

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      for (let i = 0; i < response.teams.length; i++)  // for each team
      {
         // Store curr_Team object ==> name (string): Team object
         localStorage.setItem(response.teams[i].name, JSON.stringify(response.teams[i])); // needed to update storage with most recent changes
      }
      rankByPoints = true;
      reverse = false;
      useJSON(response);
   }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send();

/*==============================================================
Use JSON data/values to then populate the table:
==============================================================*/
var gold, silver, bronze;
function useJSON(response) {
   console.log("Refresh populate with: " + response);
   // Use a map to store {Team Name: Team Points}
   let initMap = new Map(); //unsorted
   // Store team names and their respective total points completed
   for (let i = 0; i < response.teams.length; i++) // for each team
   {
      // Map each team with their points completed
      initMap.set(response.teams[i].name, response.teams[i].points_completed);
   }
   let myMap = sortTeams(initMap, rankByPoints, reverse); // sorted myMap

   // Create table
   let table = document.getElementById("table-body");
   while (table.rows[0]) {
      table.deleteRow(0);
   }
   myMap.forEach(populateTable);
}

// Sort the team list
function sortTeams(initMap, rankByPoints, reverse) {
   let myMap = new Map();
   // sort by points, descending order
   if (rankByPoints && !reverse) {
      myMap = new Map([...initMap.entries()].sort((a, b) => b[1] - a[1]));
      // update 1st, 2nd, 3rd
      let iter = myMap.keys();
      gold = myMap.size > 0 ? iter.next().value : undefined;
      silver = myMap.size > 1 ? iter.next().value : undefined;
      bronze = myMap.size > 2 ? iter.next().value : undefined;
   }
   // sort by points, ascending order
   else if (rankByPoints) {
      myMap = new Map([...initMap.entries()].sort((a, b) => a[1] - b[1]));
   }
   // sort by team name, descending order
   else if (!reverse) {
      myMap = new Map([...initMap.entries()].sort((a, b) => a[0].localeCompare(b[0])));
   }
   // sort by team name, ascending order
   else {
      myMap = new Map([...initMap.entries()].sort((a, b) => b[0].localeCompare(a[0])));
   }

   return myMap;
}

// Populate the table
function populateTable(value, key) {
   // Get reference to the table element from the HTML
   let table = document.getElementById("table-body");
   // Insert a new row at the end of the table
   let newRow = table.insertRow(-1);
   // create/insert 2 new <td> (table data/cell) elements in the new row
   let cellMedal = newRow.insertCell(0); // Medal
   let cellTeam = newRow.insertCell(1); // Team Name
   let cellPoints = newRow.insertCell(2); // Points Completed
   let cellArrow = newRow.insertCell(3); // Right Arrow

   // create/insert the contents of the new cells
   let cellMedalImage = document.createElement("img");
   if (key === gold) {
      cellMedalImage.src = "../images/gold_medal.png";
   } else if (key === silver) {
      cellMedalImage.src = "../images/silver_medal.png";
   } else if (key === bronze) {
      cellMedalImage.src = "../images/bronze_medal.png";
   } else {
      cellMedalImage.src = "../images/medal.png";
   }
   cellMedalImage.style.width = "15px";
   cellMedalImage.style.height = "15px";
   cellMedalImage.style.marginTop = "3px";

   let cellTeamLink = document.createElement("a");
   let cellTeamText = document.createTextNode(`${key}`);
   cellTeamLink.appendChild(cellTeamText);

   let cellPointsText = document.createTextNode(`${value}`);

   let cellArrowLink = document.createElement("a");
   let cellArrowImage = document.createElement("img");
   cellArrowImage.src = "../images/right_arrow.png";
   cellArrowImage.style.width = "10px";
   cellArrowImage.style.height = "10px";
   cellArrowLink.appendChild(cellArrowImage);

   // direct to team page
   function goToTeam() {
      // Store the team that was clicked for reference for other screens
      localStorage.setItem("curr_Team", key);
      localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);
      location.href = "./team.html"
   }
   cellTeamLink.onclick = goToTeam;
   cellArrowLink.onclick = goToTeam;
   cellMedal.appendChild(cellMedalImage);
   cellTeam.appendChild(cellTeamLink);
   cellPoints.appendChild(cellPointsText);
   cellArrow.appendChild(cellArrowLink);
}

// Add onclick listeners to buttons
window.onload = function () {
   let tasksBtn = document.getElementById("tasks");
   tasksBtn.addEventListener("click", gotoTasks);

   let logoutBtn = document.getElementById("logout");
   logoutBtn.addEventListener("click", logOut);

   let loginBtn = document.getElementById("login");
   loginBtn.addEventListener("click", logIn);

   let sortByNameBtn = document.getElementById("sort-by-name");
   sortByNameBtn.addEventListener("click", sortByName);

   let sortByPointsBtn = document.getElementById("sort-by-points");
   sortByPointsBtn.addEventListener("click", sortByPoints);

   let userBtn = this.document.getElementById("user-profile");
   userBtn.addEventListener("click", gotoUser);

   let darkLightBtn = this.document.getElementById("dark-mode");
   darkLightBtn.addEventListener("click", switchMode);

   //Toggle the display based on logged in status
   if ((localStorage.getItem("logged_in"))) {
      loginBtn.style.display = "none";
      userBtn.style.display = "inline";
      tasksBtn.style.display = "inline";
      darkLightBtn.style.display = "inline";
      logoutBtn.style.display = "inline";
   } else {
      loginBtn.style.display = "inline";
      userBtn.style.display = "none";
      tasksBtn.style.display = "none";
      darkLightBtn.style.display = "none";
      logoutBtn.style.display = "none";
   }

   /* Dark and Light Mode */
   if (localStorage.getItem("mode") === null) {
      localStorage.setItem("mode", "dark");
   }

   let card = document.getElementById("card");
   let buttons = document.getElementsByClassName("change-color");
   let mode = localStorage.getItem("mode");
   let modeButton = document.getElementById("dark-mode");

   if (mode == "dark") {
      modeButton.innerHTML = "<img src='../images/dark.png'><br>Dark"
      card.classList.add("dark-mode");
      for (let i = 0; i < buttons.length; i++) {
         buttons[i].classList.add("dark-mode-btn-text");
      }
   } else {
      modeButton.innerHTML = "<img src='../images/dark.png'><br>Light"
      card.classList.add("light-mode");
      for (let i = 0; i < buttons.length; i++) {
         buttons[i].classList.add("light-mode-btn-text");
      }
   }
}
