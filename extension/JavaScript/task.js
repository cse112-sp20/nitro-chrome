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
 document.querySelector("h1").innerHTML += `Task ${response.teams[0].task_list[0].task[0].id}`;



// TODO: get Task data from JSON
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
   alert("Checking off this task"); // TODO: Remove this alert when finished
}
checkBtn.addEventListener('click', checkoffTask);

/*==============================================================
Functionality of DELETE button --> deletes this task
==============================================================*/
let deleteBtn = document.getElementById('delete');
function deleteTask(){
   alert("Deleting this task"); // TODO: Remove this alert when finished
}
deleteBtn.addEventListener('click', deleteTask);


let ul = document.getElementById("task_breakdown");
let assigned = "",
   value = "",
   description = "";

// for(let i = 0; i < response.teams.length; i++)  // for each team
// {
//    for(let j = 0; j < response.teams[i].task_list.length; j++) // for each team's task lists
//    {
     assigned = response.teams[0].task_list[0].parent_project;
     value = response.teams[0].task_list[0].points;
     description = response.teams[0].task_list[0].description;
//    }
// }
console.log(`Assigned: Team ${assigned}`);
console.log(`Value: ${value} points`);
console.log(`Description: ${description}`);


// Assigned: teams[i].task_list[j].parent_project;
// Value: teams[i].task_list[j].points;
// Description: teams[i].task_list[j].points;


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

