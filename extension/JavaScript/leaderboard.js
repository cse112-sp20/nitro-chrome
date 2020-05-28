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
/*==============================================================
Functionality of 'Login' button --> login the user
==============================================================*/
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

/*==============================================================
Toggle the display for login, logout, and tasks buttons
==============================================================*/
if((localStorage.getItem("logged_in")) === "true")
{
   loginBtn.style.display = "none";
   logoutBtn.style.display = "inline";
}
else {
   loginBtn.style.display = "inline";
   tasksBtn.style.display = "none";
   logoutBtn.style.display = "none";
}
/*==============================================================
Call tasks endpoint to retrieve JSON data
==============================================================*/
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      for(let i = 0; i < response.teams.length; i++)  // for each team
      {
         // Store curr_Team object ==> name (string): Team object      
         localStorage.setItem(response.teams[i].name, JSON.stringify(response.teams[i]));
      }      
      useJSON(response);   
   }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send(); 
/*==============================================================
Use  JSON data/values to  then populate the table: 
==============================================================*/
function useJSON(response) {
   console.log("Refresh populate with: " + response);
   // Use a map to store {Team Name: Team Points}
   let initMap = new Map(); //unsorted
   let myMap = new Map(); // sorted
   // Store team names and their respective total points completed
   for (let i = 0; i < response.teams.length; i++) // for each team
   {
      // Map each team with their points completed  
      initMap.set(response.teams[i].name, response.teams[i].points_completed);
   }
   // sort the initMap in descending order
   myMap = new Map([...initMap.entries()].sort((a, b) => b[1] - a[1]));
   // Get reference to the table element from the HTML
   let table = document.getElementById("table");

   // Populate the table: 
   function populateTable(value, key) {
      let anchorTeam = document.createElement("a");
      // Insert a new row at the end of the table
      let newRow = table.insertRow(-1);
      // create/insert 2 new <td> (table data/cell) elements in the new row
      let cellTeam = newRow.insertCell(0); // Team Name
      let cellPoints = newRow.insertCell(1); // Points Completed   
      // create/insert the contents of the new cells
      let cellTeamText = document.createTextNode(`Team ${key}`);
      let cellPointsText = document.createTextNode(`${value} points`);

      anchorTeam.appendChild(cellTeamText);
      anchorTeam.onclick = function(){
         // Store the team NAME that was clicked for reference for other screens
         localStorage.setItem("curr_Team", key);
         localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);
         location.href = "./team.html"
      }
      anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
      
      cellTeam.appendChild(anchorTeam);
      cellPoints.appendChild(cellPointsText);
   }
   myMap.forEach(populateTable);
}
