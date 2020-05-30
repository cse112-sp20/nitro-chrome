/*====================================================================
 TODO/NOTES:
Store "curr_Team": team name (string)
Store 'curr_Task': task name (string)
   // These are needed b/c team responsible and project_id are values of Team object rather than Task object:   
   GET ITEM `${taskName} Team` ==> return team responsible for this task
   GET ITEM `${taskName} Project` ==> return project ID  for this task
-------------------------------------
Store entire team object: 
	team name: teamObject
-------------------------------------
Store entire task object
	task name: taskObject
-------------------------------------
====================================================================*/
const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";

if(localStorage.getItem("back_target") === "./" + window.location.pathname.split("/")[2]){
   localStorage.setItem("back_target", "./leaderboard.html");
}

let response = null;
/*==============================================================
Functionality of BACK button
==============================================================*/
let backBtn = document.getElementById("back");
function gotoLeaderboard(){
   location.href = "./leaderboard.html";
}
backBtn.addEventListener("click", gotoLeaderboard);

/*==============================================================
Call tasks endpoint to retrieve JSON data
==============================================================*/
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      useJSON(response);
   }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send(); 

/*==============================================================
Store and use JSON data and populate the table
==============================================================*/
function useJSON(response){
   // Use a map to store {TaskName: Assigned Team} 
   let myMap = new Map();   //unsorted

   // Get the total number of tasks
   for(let i = 0; i < response.teams.length; i++)  // for each team
   {
      // Store curr_Team object ==> name (string): Team object      
      localStorage.setItem(response.teams[i].name, JSON.stringify(response.teams[i]));

      for(let j = 0; j < response.teams[i].consolidated_tasks.length; j++) // for each team's tasks
      // NOTE: We are not displaying completed tasks since it would be redundant
      {
         let currentTaskName = response.teams[i].consolidated_tasks[j].title.split(" (")[0];
         // Store curr_Task object into localStorage ==>  task(string): object
         localStorage.setItem(currentTaskName, JSON.stringify(response.teams[i].consolidated_tasks[j]) );

         // Store team responsible for curr_task into localStorage ==> task team (string): team(string)
         localStorage.setItem(currentTaskName + " Team", JSON.stringify(response.teams[i].name) );

         // Store curr_Task's project ID (from team object) into localStorage ==> task Project ID (string): project_id(string)
         localStorage.setItem(currentTaskName + " Project ID", JSON.stringify(response.teams[i].project_id) );
      
         // {Task Name: Assigned Team}
         myMap.set(currentTaskName, response.teams[i].name + "," + String(response.teams[i].consolidated_tasks[j].points));    
      }
   }

   // Get reference to the table element from the HTML
   let table = document.getElementById("taskTable");
   
   // Populate the table: 
   function populateTable(value, key){
      // Create 2 anchor elements
      let anchorTask = document.createElement("a");
      let anchorTeam = document.createElement("a");
      let anchorPoints = document.createElement("a");
      // Insert a new row at the end of the table
      let newRow = table.insertRow(-1);
      // create/insert 2 new <td> (table data/cell) elements in the new row
      let cell1 = newRow.insertCell(0);   // Task Name
      let cell2 = newRow.insertCell(1);   // Task Team   
      let cell3 = newRow.insertCell(2);   // Task Points   
      // create the contents of the new cells
      let cell1Text = document.createTextNode(`${key}`);
      let cell2Text = document.createTextNode(`${value.split(",")[0]}`);
      let cell3Text = document.createTextNode(`${value.split(",")[1]}`);

      anchorTask.appendChild(cell1Text);
      anchorTask.href = "./task.html";
      anchorTask.onclick = function(){
         // Store the team that was clicked for reference for other screens
         localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);         
         localStorage.setItem("curr_Task", key);
         location.href = "./task.html"
      }
      
      anchorTeam.appendChild(cell2Text);
      anchorTeam.onclick = function(){
         // Store the team that was clicked for reference for other screens
         localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);         
         localStorage.setItem("curr_Team", value.split(",")[0]);
         location.href = "./team.html"
      }
      
      anchorPoints.appendChild(cell3Text);
      anchorPoints.onclick = function(){
         // Store the team that was clicked for reference for other screens
         localStorage.setItem("back_target", "./" + window.location.pathname.split("/")[2]);         
         localStorage.setItem("curr_Team", value.split(",")[0]);
         location.href = "./task.html"
      }
      cell1.className = "tasksCol";
      cell2.className = "teamCol";
      cell3.className = "pointsCol";
      // insert the contents of the new cells to the table
      cell1.appendChild(anchorTask);
      cell2.appendChild(anchorTeam);
      cell3.appendChild(anchorPoints);
    
      // Remove underlink/color of the anchor text? 
      anchorTask.setAttribute("style", "text-decoration: none; color: #FFFFFF;");
      anchorTeam.setAttribute("style", "text-decoration: none; color: #FFFFFF;");
      anchorPoints.setAttribute("style", "text-decoration: none; color: #FFFFFF;");
   }
   myMap.forEach(populateTable);
}
