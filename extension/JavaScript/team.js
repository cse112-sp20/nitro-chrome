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



// myMap.set(response.teams[0].task_list[0].task[0].id, response.teams[0].task_list[0].points);      
// myMap.set(response.teams[0].task_list[0].task[1].id, response.teams[0].task_list[1].points);      
         // myMap.set(response.teams[i].task_list[j].task[k].id.toString(), response.teams[i].name);      
 
// let liP = document.createElement("li");
// // liP.appendChild(document.createTextNode(`Task ${myMap.keys().next().value} (${myMap.values().next().value})`));
// liP.appendChild(document.createTextNode("Foo (200)"));
// ulP.appendChild(liP);

// let liC = document.createElement("li");
// // liC.appendChild(document.createTextNode(`Task ${myMap.keys().next().value} (${myMap.values().next().value})`));
// liC.appendChild(document.createTextNode("Bar (100)"));
// ulC.appendChild(liC);

