const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
if(localStorage.getItem('back_target') === "./" + window.location.pathname.split("/")[2]){
  localStorage.setItem('back_target', "./leaderboard.html");
}
// // GET tasks
let response = null;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      // Get the total number of tasks
      for(let i = 0; i < response.teams.length; i++)  // for each team
      {
        // Store curr_Team object ==> name (string): Team object      
        localStorage.setItem(response.teams[i].name, JSON.stringify(response.teams[i]));
        // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].name)).project_id );

        for(let j = 0; j < response.teams[i].consolidated_tasks.length; j++) // for each team's tasks
        // NOTE: We are not displaying completed tasks since it would be redundant
        {
            // Store curr_Task object into localStorage ==>  task(string): object
            localStorage.setItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0], JSON.stringify(response.teams[i].consolidated_tasks[j]) );
            // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0])).points);

            // Store team responsible for curr_task into localStorage ==> task team (string): team(string)
            localStorage.setItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0] + " Team", JSON.stringify(response.teams[i].name) );

            // Store curr_Task's project ID (from team object) into localStorage ==> task Project ID (string): project_id(string)
            localStorage.setItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0] + " Project ID", JSON.stringify(response.teams[i].project_id) );
                    // console.log("Testing localStorage objects = " + JSON.parse(localStorage.getItem(response.teams[i].consolidated_tasks[j].title.split(" (")[0] + " Team")));
        
        }

      }

   }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send(); 

let currTeamName = localStorage.getItem('curr_Team');
let currTeamObject = JSON.parse(localStorage.getItem(currTeamName));

let productivity = document.getElementById("productivity");
let totalPoints = document.getElementById("total_points");
productivity.innerHTML += "Feature WIP";
totalPoints.innerHTML += `${currTeamObject.points_completed}`;// + currTeamObject.points_required}`;

// Apply title
document.getElementById("teamNameHere").innerHTML = `Team ${currTeamName}`;
let ulP = document.getElementById("progress");
let ulC = document.getElementById("completed");

/*==============================================================
Functionality of BACK button --> redirect to 'Tasks' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoTasks(){
   location.href = localStorage.getItem("back_target");
  //  location.href = "./tasks.html";
}
backBtn.addEventListener('click', gotoTasks);


// Store tasks for current team (from Team object)
for(let i = 0; i < currTeamObject.consolidated_tasks.length; i++){
  if(currTeamObject.consolidated_tasks[i].status === "active") {
    // append task title to "In Progress" list
    let liP = document.createElement("li");
    liP.appendChild(document.createTextNode(currTeamObject.consolidated_tasks[i].title));
    ulP.appendChild(liP);  
    
    liP.href = "./task.html";
    liP.onclick = function(){
      localStorage.setItem('back_target', "./" + window.location.pathname.split("/")[2]);
       // Store the team that was clicked for reference for other screens
       localStorage.setItem('curr_Task', currTeamObject.consolidated_tasks[i].title.split(" (")[0]);
       location.href = "./task.html"
       // localStorage.getItem('curr_Task');
    }    
    
  }
}
for(let i = 0; i < currTeamObject.completed_tasks.length; i++){
    // append task title to "In Progress" list
    let liC = document.createElement("li");
    liC.appendChild(document.createTextNode(currTeamObject.completed_tasks[i].title));
      // TODO: items in the completed_tasks array do not have a "title" property
    ulC.appendChild(liC);    
  }
