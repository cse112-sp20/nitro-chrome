/*global chrome*/
/*eslint no-undef: "error"*/

/****************************************************************
TODO/NOTES: 
Where to implement clear_completed endpoint? --> only for testing 
****************************************************************/
const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
const login_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/login";
const logout_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/logout";
const clear_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/clear_completed";


/*==============================================================
Functionality of 'Tasks' button --> redirect to 'Tasks' screen
==============================================================*/
let tasksBtn = document.getElementById('tasks');
function gotoTasks() {
   localStorage.setItem('back_target', "./" + window.location.pathname.split("/")[2]);
  location.href = "./tasks.html";
}
tasksBtn.addEventListener('click', gotoTasks);
let response = null;
/*==============================================================
Functionality of 'Logout' button --> logout the user
==============================================================*/
let logoutBtn = document.getElementById('logout');
function logOUT(){
   // make sure to clean local storage
   localStorage.clear();
   
   // Redirect to logout endpoint      
   chrome.tabs.create({ url: logout_endpoint });   
}
logoutBtn.addEventListener('click', logOUT);


function logIN()
{
   // make sure to clear local storage
   localStorage.clear();

   // localStorage 
   localStorage.setItem('logged_in', "true");

   // Redirect user to login endpoint
   chrome.tabs.create({ url: login_endpoint });
   // window.location.href = "http://ec2-54-227-1-34.compute-1.amazonaws.com/login";

}
let loginBtn = document.getElementById("login");
loginBtn.addEventListener('click', logIN);


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


let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      // chrome.storage.local.set({'full_response': response}); // keep the JSON data in storage
      for(let i = 0; i < response.teams.length; i++)  // for each team
      {
         // Store curr_Team object ==> name (string): Team object      
         localStorage.setItem(response.teams[i].name, JSON.stringify(response.teams[i]));
         // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].name)).project_id );
      }      
      useJSON(response);   
   }
};
xhr.open("GET", tasks_endpoint, true);
// xhr.setRequestHeader("Authorization", result.stored_token);
xhr.send(); 




/*==============================================================
Get JSON data/values, then populate the table: 
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
   let table = document.getElementById('table');

   // Populate the table: 
   function populateTable(value, key) {
      let anchorTeam = document.createElement('a');
      // Insert a new row at the end of the table
      let newRow = table.insertRow(-1);
      // create/insert 2 new <td> (table data/cell) elements in the new row
      let cell1 = newRow.insertCell(0); // Team Name
      let cell2 = newRow.insertCell(1); // Points Completed   
      // create/insert the contents of the new cells
      let cell1Text = document.createTextNode(`Team ${key}`);
      let cell2Text = document.createTextNode(`${value} points`);
      anchorTeam.appendChild(cell1Text);
      anchorTeam.onclick = function(){
         // Store the team NAME that was clicked for reference for other screens
         localStorage.setItem('curr_Team', key);
         localStorage.setItem('back_target', "./" + window.location.pathname.split("/")[2]);
         location.href = "./team.html"
         // localStorage.getItem('curr_Team');
      }
      anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
      cell1.appendChild(anchorTeam);
      cell2.appendChild(cell2Text);
   }
   myMap.forEach(populateTable);
}
