/*====================================================================
 TODO/NOTES:
Store 'curr_Team': team name (string)
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
1) User uses login button
2) After logging in, user should re-open the extension
3) Show updated data
-------------------------------------
 - attach task/project ID to each link on the table to use when 
      sending to task.js 
 - new tasks items are not in the JSON??
 - store localStorage  as Objects rather than values --> use for-loop
====================================================================*/
const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
let response = null;

/*==============================================================
Functionality of BACK button --> redirect to 'Leaderboard' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoLeaderboard(){
   location.href = "./leaderboard.html";
}
backBtn.addEventListener('click', gotoLeaderboard);

// // GET tasks
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
      // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].name)).project_id );

      for(let j = 0; j < response.teams[i].consolidated_tasks.length; j++) // for each team's tasks
      {
         // Store curr_Task object into localStorage ==>  task(string): object
         localStorage.setItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0], JSON.stringify(response.teams[i].consolidated_tasks[j]) );
         // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0])).points);

         // Store team responsible for curr_task into localStorage ==> task team (string): team(string)
         localStorage.setItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0] + " Team", JSON.stringify(response.teams[i].name) );

         // Store curr_Task's project ID (from team object) into localStorage ==> task Project ID (string): project_id(string)
         localStorage.setItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0] + " Project ID", JSON.stringify(response.teams[i].project_id) );
                  // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0] + " Team")));
      
         // {Task Name: Assigned Team}
         myMap.set(response.teams[i].consolidated_tasks[j].title.split(" (")[0], response.teams[i].name);      
         // myMap.set(response.teams[i].tasks[j].title, response.teams[i].name);      
      }

   }

   // Get reference to the table element from the HTML
   let table = document.getElementById('table');
   
   // Populate the table: 
   function populateTable(value, key){
      // Create 2 anchor elements
      let anchorTask = document.createElement('a');
      let anchorTeam = document.createElement('a');
      // Insert a new row at the end of the table
      let newRow = table.insertRow(-1);
      // create/insert 2 new <td> (table data/cell) elements in the new row
      let cell1 = newRow.insertCell(0);   // Team Name
      let cell2 = newRow.insertCell(1);   // Points   
      // create the contents of the new cells
      let cell1Text = document.createTextNode(`Task ${key} - `);
      let cell2Text = document.createTextNode(`Team ${value}`);

      anchorTask.appendChild(cell1Text);
      anchorTask.href = "./task.html";
      anchorTask.onclick = function(){
         // Store the team that was clicked for reference for other screens
         localStorage.setItem('curr_Task', key);
         location.href = "./task.html"
         // localStorage.getItem('curr_Task');
      }
      

      anchorTeam.appendChild(cell2Text);
      anchorTeam.onclick = function(){
         // Store the team that was clicked for reference for other screens
         localStorage.setItem('curr_Team', value);
         location.href = "./team.html"
         // localStorage.getItem('curr_Team');
      }

      // insert the contents of the new cells to the table
      cell1.appendChild(anchorTask);
      cell2.appendChild(anchorTeam);
    
      // Remove underlink/color of the anchor text? 
      anchorTask.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
      anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
   }
   myMap.forEach(populateTable);

// for(let i = 0; i < )


}


