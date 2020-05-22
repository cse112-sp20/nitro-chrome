const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";

// // GET tasks
let response = null;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
   }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send(); 
/*====================================================================
 TODO:
  - implement redirect to Task screen when task is clicked?
====================================================================*/
let currTeamName = localStorage.getItem('curr_Team');
let currTeamObject = JSON.parse(localStorage.getItem(currTeamName));

let productivity = document.getElementById("productivity");
let totalPoints = document.getElementById("total_points");
productivity.innerHTML += "Feature WIP";
totalPoints.innerHTML += `${currTeamObject.points_completed + currTeamObject.points_required}`;

// Apply title
document.querySelector("h1").innerHTML += `Team ${currTeamName}`;
let ulP = document.getElementById("progress");
let ulC = document.getElementById("completed");

 /*==============================================================
Functionality of BACK button --> redirect to 'Tasks' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoTasks(){
   location.href = "./tasks.html";
}
backBtn.addEventListener('click', gotoTasks);


// Store tasks for current team (from Team object)
for(let i = 0; i < currTeamObject.consolidated_tasks.length; i++){
  if(currTeamObject.consolidated_tasks[i].status === "active") {
    // append task title to "In Progress" list
    let liP = document.createElement("li");
    liP.appendChild(document.createTextNode(currTeamObject.consolidated_tasks[i].title));
    ulP.appendChild(liP);    
  }
  else{
    // store into completed
    let liC = document.createElement("li");
    liC.appendChild(document.createTextNode(currTeamObject.consolidated_tasks[i].title));
    ulC.appendChild(liP);    
  }
}


