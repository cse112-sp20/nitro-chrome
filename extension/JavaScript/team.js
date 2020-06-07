import * as DarkLightMode from "./darkLightMode.js";

const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";

const current_pathname = "./" + window.location.pathname.split("/")[2];

if (localStorage.getItem("back_target") === current_pathname) {
  localStorage.setItem("back_target", "./leaderboard.html");
}

/*==============================================================
Call tasks endpoint to retrieve JSON data
==============================================================*/
let response = null;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    response = JSON.parse(xhr.responseText);
    console.log(response);
    for (let i = 0; i < response.teams.length; i++)  // for each team
    {
      // Store curr_Team object ==> name (string): Team object      
      localStorage.setItem(response.teams[i].name, JSON.stringify(response.teams[i]));

      for (let j = 0; j < response.teams[i].consolidated_tasks.length; j++) // for each team's tasks
      // NOTE: We are not displaying completed tasks since it would be redundant
      {
        let currentTaskName = response.teams[i].consolidated_tasks[j].title.split(" (")[0];
        // Store curr_Task object into localStorage ==>  task(string): object
        localStorage.setItem(currentTaskName, JSON.stringify(response.teams[i].consolidated_tasks[j]));

        // Store team responsible for curr_task into localStorage ==> task team (string): team(string)
        localStorage.setItem(currentTaskName + " Team", JSON.stringify(response.teams[i].name));

        // Store curr_Task's project ID (from team object) into localStorage ==> task Project ID (string): project_id(string)
        localStorage.setItem(currentTaskName + " Project ID", JSON.stringify(response.teams[i].project_id));
      }
    }
  }
};
xhr.open("GET", tasks_endpoint, true);
xhr.send();

let currTeamName = localStorage.getItem("curr_Team");
let currTeamObject = JSON.parse(localStorage.getItem(currTeamName));
let assignedUsers = document.getElementById("assigned_users");
let productivity = document.getElementById("productivity");
let totalPoints = document.getElementById("total_points");
let ulP = document.getElementById("progress");
let ulC = document.getElementById("completed");

/*==============================================================
Users assigned to
==============================================================*/
assignedUsers.appendChild(document.createTextNode(`${currTeamObject.assigned_to}`));

/*==============================================================
Productivity in percentage
==============================================================*/
let prod_decimal = currTeamObject.points_completed / (currTeamObject.points_completed + currTeamObject.points_required);
let prod_percentage = (prod_decimal * 100).toFixed(0);
productivity.innerHTML += `${prod_percentage}%`;

/*==============================================================
Total Points Completed
==============================================================*/
totalPoints.innerHTML += `${currTeamObject.points_completed}`;// + currTeamObject.points_required}`;

/*==============================================================
Apply title to top of page
==============================================================*/
document.getElementById("teamNameHere").innerHTML = currTeamName;

/*==============================================================
Functionality of BACK button
==============================================================*/
let backBtn = document.getElementById("back");
function gotoTasks() {
  location.href = localStorage.getItem("back_target");
}
backBtn.addEventListener("click", gotoTasks);

/*==============================================================
Populate In Progress and Complete lists
==============================================================*/
for (let i = 0; i < currTeamObject.consolidated_tasks.length; i++) {
  if (currTeamObject.consolidated_tasks[i].status === "active") {
    // append task title to "In Progress" list
    let liP = document.createElement("li");
    liP.appendChild(document.createTextNode(currTeamObject.consolidated_tasks[i].title));
    ulP.appendChild(liP);

    liP.href = "./task.html";
    liP.onclick = function () {
      localStorage.setItem("back_target", current_pathname);
      // Store the team that was clicked for reference for other screens
      localStorage.setItem("curr_Task", currTeamObject.consolidated_tasks[i].title.split(" (")[0]);
      location.href = "./task.html"
    }
  }
}
for (let i = 0; i < currTeamObject.completed_tasks.length; i++) {
  // append task title to "Completed" list
  let liC = document.createElement("li");
  liC.appendChild(document.createTextNode(currTeamObject.completed_tasks[i].title));
  ulC.appendChild(liC);

  liC.href = "./task.html";
  liC.onclick = function () {
    localStorage.setItem("back_target", current_pathname);
    // Store the team that was clicked for reference for other screens
    localStorage.setItem("curr_Task", currTeamObject.completed_tasks[i].title.split(" (")[0]);
    location.href = "./task.html"
  }

}

/*==============================================================
Set dark and light mode color
==============================================================*/
window.onload = function () {
  DarkLightMode.setColorForCard();
}
