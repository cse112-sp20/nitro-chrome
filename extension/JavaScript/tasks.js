let myJSON =
  `{
   "account_id": "4514340", 
   "teams": [
     {
       "name": "Front end", 
       "project_id": 17150139, 
       "task_list": [
         {
           "description": "", 
           "parent_id": 2679895739, 
           "parent_project": "Front end", 
           "points": 3, 
           "points_completed": 0, 
           "task": [
             {
               "assignees": [], 
               "due_on": null, 
               "id": 2679895952, 
               "points": 0, 
               "status": "active", 
               "title": "nitro two"
             }, 
             {
               "assignees": [], 
               "due_on": null, 
               "id": 2679895968, 
               "points": 3, 
               "status": "active", 
               "title": "nitro (3)"
             }
           ], 
           "task_list_id": 2679895900, 
           "task_list_name": "Front end (NITRO)"
         }
       ], 
       "todoset_id": 2679895739
     }, 
     {
       "name": "Devops", 
       "project_id": 17149883, 
       "task_list": [
         {
           "description": "", 
           "parent_id": 2679853458, 
           "parent_project": "Devops", 
           "points": 0, 
           "points_completed": 0, 
           "task": [], 
           "task_list_id": 2680519875, 
           "task_list_name": "anotehr list (NITRO)"
         }, 
         {
           "description": "", 
           "parent_id": 2679853458, 
           "parent_project": "Devops", 
           "points": 30, 
           "points_completed": 15, 
           "task": [
             {
               "assignees": [], 
               "due_on": null, 
               "id": 2679854538, 
               "points": 0, 
               "status": "active", 
               "title": "not normal shit 3"
             }, 
             {
               "assignees": [], 
               "due_on": null, 
               "id": 2679854530, 
               "points": 30, 
               "status": "active", 
               "title": "not normal shit 2 (30)"
             }
           ], 
           "task_list_id": 2679854470, 
           "task_list_name": "devops (NITRO)"
         }
       ], 
       "todoset_id": 2679853458
     }
   ]
 }`;

let response = JSON.parse(myJSON);
console.log(response);
console.log(`Account ID = ${response.account_id}`);
console.log(`# of Teams = ${response.teams.length}`);
console.log(`=====================================`);

console.log(`Team 0 = ${response.teams[0].name}`);
console.log(`Points completed = ${response.teams[0].task_list[0].points_completed}`);
console.log(`# of taskLists = ${response.teams[0].task_list.length}`);
console.log(`# of tasks = ${response.teams[0].task_list[0].task.length}`);

console.log(`=====================================`);

console.log(`Team 1 = ${response.teams[1].name}`);
console.log(`# of taskLists = ${response.teams[1].task_list.length}`);
console.log(`# of tasks = ${response.teams[1].task_list[0].task.length}`);

/*==============================================================
Functionality of BACK button --> redirect to 'Leaderboard' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoLeaderboard() {
  location.href = "./leaderboard.html";
}
backBtn.addEventListener('click', gotoLeaderboard);

/*==============================================================
Functionality to populate the table: 
TODO: 
   - adapt to new JSON schema??
      Old: teams.length --> task_list.length --> task.length
         (3 nest for-loops)
      Updated: teams.length --> task_list.length
         (2 nest for-loops)
   - truncate/change task ID/name? or font properties?
==============================================================*/
// Use a map to store {TaskName: Assigned Team} 
let myMap = new Map();   //unsorted

// Get the total number of tasks
for (let i = 0; i < response.teams.length; i++)  // for each team
{
  for (let j = 0; j < response.teams[i].task_list.length; j++) // for each team's task lists
  {
    for (let k = 0; k < response.teams[i].task_list[j].task.length; k++)  // for each task in each task_list from each team
    {
      myMap.set(response.teams[i].task_list[j].task[k].id, response.teams[i].name);
      // myMap.set(response.teams[i].task_list[j].task[k].id.toString(), response.teams[i].name);      
    }
  }
}

// Get reference to the table element from the HTML
let table = document.getElementById('table');

// Populate the table: 
function populateTable(value, key, map) {
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

  anchorTeam.appendChild(cell2Text);
  anchorTeam.href = "./team.html";

  // insert the contents of the new cells to the table
  cell1.appendChild(anchorTask);
  cell2.appendChild(anchorTeam);

  // Remove underlink/color of the anchor text? 
  anchorTask.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
  anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
}
myMap.forEach(populateTable);
//=============================================================


// // Original code from Andrew? below:
// //=============================================================
// // Helper Method to 
// var button = document.createElement('button');

// //Generates a List of HTML items from database items
// async function generateList(){
//    // Performs initial fetch to get the database
//    let res = await getList();
//    // if the database is empty then we create an import button
//    if (res.length == 0){
//       generateImportButton();
//    }
//    else {
//       //if not empty then we populate the list 
//       createList(res)
//    }
// }

// // Gets list of issues from github
// function getList(){
//    return fetch('http://localhost:5000/issues')
//       .then( res => res.json())
//       .catch(err => console.log(err))
// }

// // Generates button for import and registers click event
// function generateImportButton(){
//    button.id = "mybutton";
//    button.innerText = "import"
//    document.body.appendChild(button);
//    var butt = document.getElementById('mybutton');
//    butt.addEventListener('click', importDatabase);
// }

// // Generate a list of ul elements
// function createList(databaseElems){
//    var list = document.createElement('ui');
//    list.id = "my_list";
//    for(var i = 0; i < databaseElems.length; i++){
//       var item = document.createElement('li');

//       // Register click event so we can delete it from the list
//       item.addEventListener('click', function(event) {
//          listItem = event.target;
//          //delete from database
//          id = listItem.innerText.split(" ")[1];
//          fetch('http:localhost:5000/delete?id=' + id , {method: 'POST'})
//             .then(res => {
//                listItem.remove()
//             })
//       });

//       item.appendChild(document.createTextNode(databaseElems[i].title + " " +  databaseElems[i].id));
//       list.appendChild(item);
//    }
//    document.body.appendChild(list)
// }

// // Makes post request to update the database
// async function importDatabase() {
//    await fetch('http://localhost:5000/import', {method: 'POST'})
//    //remove the import button
//    generateList() 
// }

// generateList();

