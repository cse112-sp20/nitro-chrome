/*====================================================================
 TODO:
   - test button functionalities 
   - checkmark and delete functionality
   - implement redirect to team screen when team is clicked?
====================================================================*/
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

// Apply title
document.querySelector("h1").innerHTML += `Task ${localStorage.getItem('curr_Task')}`;

// Retrieve TEAM responsible for current task 
let teamString = `${localStorage.getItem('curr_Task')} Team`;
// let teamResponsible = localStorage.getItem(teamString);

// Retrieve/store projectID and taskID for checkoff/delete calls
let projectID_pre = `${localStorage.getItem('curr_Task')} Project ID`;
let projectID_post = localStorage.getItem(projectID_pre);
console.log(`Current project ID = ${projectID_post}` );
// let taskID = `JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).id`;

// Retrieve task object
let taskID = JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).id;
// let taskID = localStorage.getItem(localStorage.getItem('curr_Task')).id;
// console.log("Current task object = "  + JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).id );

console.log(typeof taskID);
let taskID_post = String(taskID);
// let taskID_post = JSON.stringify(taskID);
console.log(typeof taskID_post);
// console.log("Current task object = "  + JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).points );


/*==============================================================
Functionality of BACK button --> redirect to 'Tasks' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoTasks(){
   location.href = "./tasks.html";
}
backBtn.addEventListener('click', gotoTasks);

/*==============================================================
Functionality of CHECKMARK button --> checks off this task
==============================================================*/
let checkBtn = document.getElementById('check');
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

   //Redirect back to tasks page
   // gotoTasks();
}
checkBtn.addEventListener('click', checkoffTask);

/*==============================================================
Functionality of DELETE button --> deletes this task
==============================================================*/
let deleteBtn = document.getElementById('delete');
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

   //Redirect back to tasks page
   // gotoTasks();
}
deleteBtn.addEventListener('click', deleteTask);


// get values from Team object
let assigned = localStorage.getItem(teamString),   // team responsible
   due_on = JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).due_on,
   id = JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).id,
   points = JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).points,
   status = JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).status,
   title = JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).title;

let output = document.getElementById("task_breakdown");
let myValues = [`Assigned: ${assigned}`, 
               `Due On: ${due_on}`, 
               `Task ID: ${id}`, 
               `Points: ${points}`, 
               `Status: ${status}`, 
               `Title: ${title}`];
for(let i = 0; i < myValues.length; i++) {
   output.innerHTML += myValues[i] + `</br>`   ;
}