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
let projectID = `${localStorage.getItem('curr_Task')} Project ID`;
console.log(`Current project ID = ${projectID}` );
let taskID = `JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))).id`;
console.log(`Current project ID = ${taskID}` );

// Retrieve task object
console.log("Current task object = "  + JSON.parse(localStorage.getItem(localStorage.getItem('curr_Task'))) );
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
   xhr.open("POST", `http://ec2-54-227-1-34.compute-1.amazonaws.com/complete?project=${projectID}&task=${taskID}`, true);
   xhr.send();

   //Redirect back to tasks page
   gotoTasks();


         //   let checkoff_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/complete?project=";
         //   // Open a POST request to CHECKOFF this current task
         //   chrome.storage.local.get(['curr_PID'], function(result) {
         //       checkoff_endpoint += `${result.curr_PID}`;
         //    });
         //   chrome.storage.local.get(['curr_TID'], function(result) {
         //       checkoff_endpoint += `&task=${result.curr_TID}`;
         //    });

         //    xhr.open("POST", checkoff_endpoint, true);

         //    // Send Auth token as header
         //   chrome.storage.local.get(['stored_token'], function(result) {
         //       xhr.setRequestHeader("Authorization", result.stored_token);
         //    });
         //   xhr.send(); 

         //   // TODO: update screen innerHTML contents

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
   xhr.open("POST", `http://ec2-54-227-1-34.compute-1.amazonaws.com/delete?project=${projectID}&task=${taskID}`, true);
   xhr.send();

   //Redirect back to tasks page
   gotoTasks();
      
         // let delete_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/delete?project=";
         // // Open a POST request to CHECKOFF this current task
         // chrome.storage.local.get(['curr_PID'], function(result) {
         //    delete_endpoint += `${result.curr_PID}`;
         //  });
         // chrome.storage.local.get(['curr_TID'], function(result) {
         //    delete_endpoint += `&task=${result.curr_TID}`;
         //  });
      
         //  xhr.open("POST", delete_endpoint, true);
      
         //  // Send Auth token as header
         // chrome.storage.local.get(['stored_token'], function(result) {
         //     xhr.setRequestHeader("Authorization", result.stored_token);
         //  });
         // xhr.send(); 
      
         // // TODO: update screen innerHTML contents 
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

// // for(let i = 0; i < response.teams.length; i++)  // for each team
// // {
// //    for(let j = 0; j < response.teams[i].task_list.length; j++) // for each team's task lists
// //    {
//      assigned = response.teams[0].task_list[0].parent_project;
//      value = response.teams[0].task_list[0].points;
//      description = response.teams[0].task_list[0].description;
// //    }
// // }
// console.log(`Assigned: Team ${assigned}`);
// console.log(`Value: ${value} points`);
// console.log(`Description: ${description}`);


// // Assigned: teams[i].task_list[j].parent_project;
// // Value: teams[i].task_list[j].points;
// // Description: teams[i].task_list[j].points;
