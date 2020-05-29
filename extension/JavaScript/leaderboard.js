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

/*==============================================================
Functionality of 'Tasks' button
==============================================================*/
let tasksBtn = document.getElementById("tasks");
function gotoTasks() {
   localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);
  location.href = "./tasks.html";
}
tasksBtn.addEventListener("click", gotoTasks);
let response = null;
/*==============================================================
Functionality of 'Logout' button --> logout the user
==============================================================*/
let logoutBtn = document.getElementById("logout");
function logOUT(){
   // make sure to clean local storage
   localStorage.clear();
   
   // Redirect to logout endpoint      
   chrome.tabs.create({ url: logout_endpoint });   
}
logoutBtn.addEventListener("click", logOUT);


function logIN()
{
   // make sure to clear local storage
   localStorage.clear();

   // checks if user is logged in or not
   localStorage.setItem("logged_in", "true");

   // Redirect user to login endpoint
   chrome.tabs.create({ url: login_endpoint });
}
let loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", logIN);

var rankByPoints = true;
var reverse = false;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      // chrome.storage.local.set({'full_response': response}); // keep the JSON data in storage
      rankByPoints = true;
      reverse = false;
      useJSON(response);   
   }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send(); 
/*==============================================================
Use  JSON data/values to  then populate the table: 
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
   let myMap = sortTeams(initMap); // sorted myMap

   // Create table
   let table = document.getElementById("table-body");
   while(table.rows[0])
      table.deleteRow(0);
   myMap.forEach(populateTable);
}

// Sort the team list
function sortTeams(initMap) {
   console.log("rankBypoints = " + rankByPoints + ", reverse = " + reverse);
   let myMap = new Map();
   // sort by points, descending order
   if (rankByPoints && !reverse) {
      myMap = new Map([...initMap.entries()].sort((a, b) => b[1] - a[1]));
      // update 1st, 2nd, 3rd
      let iter = myMap.keys();
      gold = myMap.size > 0 ? iter.next().value : undefined;
      silver = myMap.size> 1 ? iter.next().value : undefined;
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
   let cell0 = newRow.insertCell(0); // Medal
   let cell1 = newRow.insertCell(1); // Team Name
   let cell2 = newRow.insertCell(2); // Points Completed
   let cell3 = newRow.insertCell(3); // Right Arrow
   // create/insert the contents of the new cells
   let cell0Image = document.createElement("img");
   if (key === gold) {
      cell0Image.src = "../images/gold_medal.png";
   } else if (key === silver) {
      cell0Image.src = "../images/silver_medal.png";
   } else if (key === bronze) {
      cell0Image.src = "../images/bronze_medal.png";
   } else {
      cell0Image.src = "../images/medal.png";
   }
   cell0Image.style.width = "15px";
   cell0Image.style.height = "15px";
   cell0Image.style.marginTop = "3px";
      
   let cell1Text = document.createTextNode(`${key}`);
   let cell2Text = document.createTextNode(`${value}`);

   let cell3Link = document.createElement("a");
   let cell3Image = document.createElement("img");
   cell3Image.src = "../images/right_arrow.png";
   cell3Image.style.width = "10px";
   cell3Image.style.height = "10px";
   cell3Link.appendChild(cell3Image);
   cell3Link.onclick = function(){
      // Store the team that was clicked for reference for other screens
      localStorage.setItem("curr_Team", key);
      location.href = "./team.html"
   }
   cell0.appendChild(cell0Image);
   cell1.appendChild(cell1Text);
   cell2.appendChild(cell2Text);
   cell3.appendChild(cell3Link);
}

/*==============================================================
Functionality of 'sort-by-name' button --> Sort teams by name
==============================================================*/
let sortByNameBtn = document.getElementById("sort-by-name");
function sortByName(){
   reverse = rankByPoints ? false : !reverse;
   rankByPoints = false;
   useJSON(response);
}
sortByNameBtn.addEventListener("click", sortByName);

/*==============================================================
Functionality of 'sort-by-points' button --> Sort teams by points
==============================================================*/
let sortByPointsBtn = document.getElementById("sort-by-points");
function sortByPoints(){
   reverse = rankByPoints ? !reverse : false;
   rankByPoints = true;
   useJSON(response);
}
sortByPointsBtn.addEventListener("click", sortByPoints);