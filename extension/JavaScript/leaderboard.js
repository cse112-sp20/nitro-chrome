/****************************************************************
TODO: no import btn, each reload should be automatic GET request
login 
then GET/tasks

clicks on teams should redirect?
****************************************************************/
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
//  console.log(`Account ID = ${response.account_id}`);
//  console.log(`# of Teams = ${response.teams.length}`);
//  console.log(`Team 0 = ${response.teams[0].name}`);
//  console.log(`Points completed = ${response.teams[0].task_list[0].points_completed}`);
//  console.log(`Team 1 = ${response.teams[1].name}`);
//  console.log(`Points completed = ${response.teams[1].task_list[0].points_completed}`);

let login = "http://ec2-54-227-1-34.compute-1.amazonaws.com/login";
/*----------------------
Racecartest1@gmail.com
teamracecar123
----------------------*/
let tasks = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
// let hack = "http://ec2-54-227-1-34.compute-1.amazonaws.com/get_token?code=964e0964";

// fetch(login)
//   .then(response => response.json())
//   .then(data => console.log(data));
//   fetch(login, {method: "POST"}).then(res => res.json()).then(data => console.log(data))

if (confirm("Login to Basecamp?")) {
  let windowBC = window.open(login);  //open new window/tab to login to Basecamp

  // somehow determine when user has successfully logged in
  // check if token is received/stored?

  // let xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function() {
  //    if (this.readyState == 4 && this.status == 200) {
  //       // Typical action to be performed when the document is ready:
  //       //  document.getElementById("demo").innerHTML = xhr.responseText;
  //       let response = JSON.parse(xhr.responseText);
  //       console.log(response);
  //    }
  // };
  // xhr.open("GET", login, true);
  // xhr.send();     


  // // GET tasks
  // let xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function() {
  //    if (this.readyState == 4 && this.status == 200) {
  //       // Typical action to be performed when the document is ready:
  //       //  document.getElementById("demo").innerHTML = xhr.responseText;
  //       let response = JSON.parse(xhr.responseText);
  //       console.log(response);
  //       // console.log(response.account_id);
  //    }
  // };
  // xhr.open("GET", tasks, true);
  // xhr.send(); 

  // Automatically close newly opened window?
  // setTimeout(function() {
  //    windowBC.close();
  //  }, 15000);
}
else
  alert("Didn't login to Basecamp...");

// XMLHttpRequest Boilerplate Code
// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//       // Typical action to be performed when the document is ready:
//       //  document.getElementById("demo").innerHTML = xhr.responseText;
//       let response = JSON.parse(xhr.responseText);
//       console.log(response);
//    }
// };
// xhr.open("GET", tasks, true);
// xhr.setRequestHeader('Accept', 'application/json');
// xhr.send();    

// fetch(tasks, {method: "POST"}).then(response => response.json()).then(data => console.log(data))


/*==============================================================
Functionality of 'Tasks' button --> redirect to 'TaI casks' screen
==============================================================*/
let tasksBtn = document.getElementById('tasks');
function gotoTasks() {
  location.href = "./tasks.html";
}
tasksBtn.addEventListener('click', gotoTasks);


/*==============================================================
Testing functionality to populate the table: 
NOTE: Values are hardcoded. 
TODO: Need to get data from JSON. (halp)
==============================================================*/
// Use a map to store {Team Name: Team Points} 
let initMap = new Map();   //unsorted

// Store team names and their respective total points completed
for (let i = 0; i < response.teams.length; i++)  // for each team
{
  let totalPoints = 0;
  // Calculate total points completed
  for (let j = 0; j < response.teams[i].task_list.length; j++) {
    totalPoints += response.teams[i].task_list[j].points_completed;
  }
  initMap.set(response.teams[i].name, totalPoints);
}
let myMap = new Map([...initMap.entries()].sort((a, b) => b[1] - a[1])); // sorted map

// Get reference to the table element from the HTML
let table = document.getElementById('table');

// Populate the table: 
//==================== Map.prototype.forEach() ====================
function populateTable(value, key, map) {
  let anchorTeam = document.createElement('a');
  // Insert a new row at the end of the table
  let newRow = table.insertRow(-1);
  // create/insert 2 new <td> (table data/cell) elements in the new row
  let cell1 = newRow.insertCell(0);   // Team Name
  let cell2 = newRow.insertCell(1);   // Points   
  // create/insert the contents of the new cells
  let cell1Text = document.createTextNode(`Team ${key}`);
  let cell2Text = document.createTextNode(`${value} points`);

  anchorTeam.appendChild(cell1Text);
  anchorTeam.href = "./team.html";
  anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");

  cell1.appendChild(anchorTeam);
  cell2.appendChild(cell2Text);

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
