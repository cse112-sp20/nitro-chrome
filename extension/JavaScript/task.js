const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";

if(localStorage.getItem("back_target") === "./" + window.location.pathname.split("/")[2]){
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
document.getElementById("taskNameHere").innerHTML = `Task ${localStorage.getItem("curr_Task")}`;

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
   id = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).id,
   points = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).points,
   status = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).status,
   title = JSON.parse(localStorage.getItem(localStorage.getItem("curr_Task"))).title;

let output = document.getElementById("task_breakdown");
let myValues = [`Title: ${title}`,
               // `Assigned: ${assigned}`, 
               // `Due On: ${due_on}`, 
               // `Task ID: ${id}`, 
               `Points: ${points}`, 
               `Status: ${status}`, 
               ];
output.style.width = '80%';
output.style.alignSelf = 'center';
output.style.marginLeft = '10%';

let teamname = document.getElementById("team_name");
teamname.innerHTML = assigned;
let duedate = document.getElementById("due_date");
duedate.innerHTML = due_on;

for(let i = 0; i < myValues.length; i++) {
   output.innerHTML += myValues[i] + `</br>`;
}