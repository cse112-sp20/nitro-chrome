import * as DarkLightMode from "./darkLightMode.js";

const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";

const current_pathname = "./" + window.location.pathname.split("/")[2];

if(localStorage.getItem("back_target") === current_pathname){
   localStorage.setItem("back_target", "./leaderboard.html");
}

/*==============================================================
Call tasks endpoint to retrieve JSON data
==============================================================*/
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

/*==============================================================
Apply title to top of page
==============================================================*/
document.getElementById("taskNameHere").innerHTML = `Task`;

let teamString = `${localStorage.getItem("curr_Task")} Team`;

/*==============================================================
// Retrieve/store projectID and taskID for checkoff/delete calls
==============================================================*/
// Retrieve project ID
let projectID_pre = `${localStorage.getItem("curr_Task")} Project ID`;
let projectID_post = localStorage.getItem(projectID_pre);

// Retrieve task ID
let taskID = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).id;
let taskID_post = String(taskID);

/*==============================================================
Functionality of BACK button
==============================================================*/
let backBtn = document.getElementById("back");
function goBack(){
   location.href = localStorage.getItem("back_target");
}
backBtn.addEventListener("click", goBack);

/*==============================================================
Functionality of CHECKMARK button --> checks off this task
==============================================================*/
let checkBtn = document.getElementById("check");
function checkoffTask(){
   let xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         let response = JSON.parse(xhr.responseText);
         console.log(response);
      }
   };
   xhr.open("POST", `http://ec2-54-227-1-34.compute-1.amazonaws.com/complete?project=${projectID_post}&task=${taskID_post}`, true);
   xhr.send();

   alert("This task has been checked off!");
   goBack();
}
checkBtn.addEventListener("click", checkoffTask);

/*==============================================================
Functionality of DELETE button --> deletes this task
==============================================================*/
let deleteBtn = document.getElementById("delete");
function deleteTask(){
   let xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         let response = JSON.parse(xhr.responseText);
         console.log(response);
      }
   };
   xhr.open("POST", `http://ec2-54-227-1-34.compute-1.amazonaws.com/delete?project=${projectID_post}&task=${taskID_post}`, true);
   xhr.send();

   alert("This task has been deleted!");
   goBack();
}
deleteBtn.addEventListener("click", deleteTask);
/*==============================================================
Get and use values from to populate the page
==============================================================*/
// get values from Team object
let assigned = localStorage.getItem(teamString),   // team responsible
   due_on = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).due_on,
   points = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).points,
   status = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).status,
   title = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).title.split("(")[0];
let output = document.getElementById("taskBreakdown");
let myValues = [`Title: ${title}`, 
               `Points: ${points}`, 
               `Status: ${status}`];

let teamName = document.getElementById("teamName");
assigned = assigned.replace(/['"]+/g, '');
teamName.innerHTML += assigned;
let dueDate = document.getElementById("dueDate");
if (due_on == null) {
  dueDate.style.display = "none";
} else {
  dueDate.innerHTML += due_on;
  teamName.style.width = "49%";
}

for(let i = 0; i < myValues.length; i++) {
   let newNode = document.createElement("p");
   newNode.className = "task";
   newNode.innerHTML = myValues[i];
   output.appendChild(newNode);
}

/*==============================================================
Set dark and light mode color
==============================================================*/
window.onload = function () {
   DarkLightMode.setColorForCard();
}
