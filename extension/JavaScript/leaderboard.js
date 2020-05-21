/****************************************************************
TODO/NOTES: 
Store 'curr_Team': team name (string)
Store 'curr_Task': task name (string)
   // These are needed b/c team responsible and project_id are values of Team object rather than Task object:   
   GET ITEM `${taskName} Team` ==> return team responsible for this task
   GET ITEM `${taskName} Project` ==> return project ID  for this task
-------------------------------------
Store entire team object: 
	team name: teamObject
-------------------------------------
Store entire task object
	task name: taskObject
-------------------------------------
1) User uses login button
2) After logging in, user should re-open the extension
3) Show updated data
-------------------------------------
BUGS (?):
Some tasks not showing up in JSON?
Checked off items from Basecamp not giving points?
Where to implement clear_completed endpoint?
****************************************************************/
const tasks_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/tasks";
const login_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/login";
const logout_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/logout";
const clear_endpoint = "http://ec2-54-227-1-34.compute-1.amazonaws.com/clear_completed";
// New Client ID = fe9d30b1a7dedf4dcb0b8121346bab30b6588224
// const extension_redirect = "&redirect_uri=chrome-extension://dnaoddbfigikpkhpicbfpbcaagaodgmm/HTML/leaderboard.html/&response_type=token";
// const chromium_redirect  = "&redirect_uri=https://dnaoddbfigikpkhpicbfpbcaagaodgmm.chromiumapp.org/&response_type=token";
// const full_extension= "https://launchpad.37signals.com/authorization/new?type=web_server&client_id=e248ec7a9944bc25e9f6a9220a8a56860e1121f7&redirect_uri=chrome-extension://dnaoddbfigikpkhpicbfpbcaagaodgmm/HTML/leaderboard.html&response_type=token";
// const full_chromium = "https://launchpad.37signals.com/authorization/new?type=web_server&client_id=e248ec7a9944bc25e9f6a9220a8a56860e1121f7&redirect_uri=https://dnaoddbfigikpkhpicbfpbcaagaodgmm.chromiumapp.org/HTML/leaderboard.html&response_type=token";
/*----------------------
   Racecartest1@gmail.com
   teamracecar123
   clientID: a47cf299c52e97bcfdb14afdc43410d7e55fdaa2
   ----------------------*/

/*==============================================================
Functionality of 'Tasks' button --> redirect to 'Tasks' screen
==============================================================*/
let tasksBtn = document.getElementById('btn');
function gotoTasks(){
   location.href = "./tasks.html";
}
tasksBtn.addEventListener('click', gotoTasks);
let response = null;
/*==============================================================
Functionality of 'Logout' button --> logout the user
==============================================================*/
let logoutBtn = document.getElementById('logout');
function logOUT(){
   // make sure to clear chrome storage
   chrome.storage.local.clear(function() {});
   // make sure to clean local storage
   localStorage.clear();
   // Redirect to logout endpoint      
   chrome.tabs.create({ url: logout_endpoint });   
}
logoutBtn.addEventListener('click', logOUT);


function logIN()
{
   // make sure to clear chrome storage
   chrome.storage.local.clear(function() {});
   // make sure to clean local storage
   localStorage.clear();

   // Redirect user to login endpoint
   chrome.tabs.create({ url: login_endpoint });
   // window.location.href = "http://ec2-54-227-1-34.compute-1.amazonaws.com/login";

   // let xhr = new XMLHttpRequest();
   // xhr.onreadystatechange = function() {
   //    if (this.readyState == 4 && this.status == 200) {
   //       response = JSON.parse(xhr.responseText);
   //       console.log(response);
   //       // chrome.storage.local.set({'full_response': response}); // keep the JSON data in storage
   //    }
   // };
   // xhr.open("GET", tasks_endpoint, true);
   // // xhr.setRequestHeader("Authorization", result.stored_token);
   // xhr.send(); 


   // Using launchWebAuthFlow
   // chrome.identity.launchWebAuthFlow(
   // {'url': login_endpoint, 'interactive': true}, function(url) {
   //    console.log("Entered launchWebAuthFlow");
      
   //    console.log(url); 
      
   //       // auth_token = full_chromium.substring(test.indexOf("#") + 1);
   //    // Parse uri and retrieve auth token as substring. Then store auth token in local storage
   //    chrome.storage.local.set({'stored_token': url.substring(url.indexOf("#") + 1)});
   //       // console.log('Storing token with value = ' + auth_token);
   //    console.log("Exiting launchWebAuthFlow");

   // });
   /***************************************************
   Use localStorage API if chrome.storage doesnt work?
   ***************************************************/ 
   // localStorage.setItem('test', "1234567890");
   // let temp = localStorage.getItem('test');
   // console.log(`Temp = ${temp}`);   

   // // GET tasks
   // let xhr = new XMLHttpRequest();
   // xhr.onreadystatechange = function() {
   //    if (this.readyState == 4 && this.status == 200) {
   //       response = JSON.parse(xhr.responseText);
   //       console.log(response);
   //       chrome.storage.local.set({'full_response': response}); // keep the JSON data in storage
   //    }
   // };
   // xhr.open("GET", tasks, true);
   // chrome.storage.local.get(['stored_token'], function(result) {
   //    xhr.setRequestHeader("Authorization", result.stored_token);
   // });
   // xhr.send();    

   // // populate table
   // chrome.storage.local.get(['full_response'], function(result) {
   //    populateTable(result.fullResponse);   
   // });
}
let loginBtn = document.getElementById("login");
loginBtn.addEventListener('click', logIN);

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log(response);
      // chrome.storage.local.set({'full_response': response}); // keep the JSON data in storage
      useJSON(response);   
   }
};
xhr.open("GET", tasks_endpoint, true);
// xhr.setRequestHeader("Authorization", result.stored_token);
xhr.send(); 


/*==============================================================
Get JSON data/values, then populate the table: 
==============================================================*/
function useJSON(response) {
   console.log("Refresh populate with: " + response);
   // Use a map to store {Team Name: Team Points}
   let initMap = new Map(); //unsorted
   let myMap = new Map(); // sorted
   // Store team names and their respective total points completed
   for (let i = 0; i < response.teams.length; i++) // for each team
   {
      // Map each team with their points completed  
      initMap.set(response.teams[i].name, response.teams[i].points_completed);
   }
   // sort the initMap in descending order
   myMap = new Map([...initMap.entries()].sort((a, b) => b[1] - a[1]));
   // Get reference to the table element from the HTML
   let table = document.getElementById('table');

   // Populate the table: 
   function populateTable(value, key) {
      let anchorTeam = document.createElement('a');
      // Insert a new row at the end of the table
      let newRow = table.insertRow(-1);
      // create/insert 2 new <td> (table data/cell) elements in the new row
      let cell1 = newRow.insertCell(0); // Team Name
      let cell2 = newRow.insertCell(1); // Points Completed   
      // create/insert the contents of the new cells
      let cell1Text = document.createTextNode(`Team ${key}`);
      let cell2Text = document.createTextNode(`${value} points`);
      anchorTeam.appendChild(cell1Text);
      anchorTeam.onclick = function(){
         // Store the team that was clicked for reference for other screens
         localStorage.setItem('curr_Team', key);
         location.href = "./team.html"
         // localStorage.getItem('curr_Team');
      }
      anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");
      cell1.appendChild(anchorTeam);
      cell2.appendChild(cell2Text);
   }
   myMap.forEach(populateTable);
}


// chrome.storage.local.get(['full_response'], function(result) {
//    populateTable(result.fullResponse);   
// });

// alert(window.location.href);
   // chrome-extension://dnaoddbfigikpkhpicbfpbcaagaodgmm/HTML/leaderboard.html
// alert(window.location.hostname);    // this is the extension ID
   // dnaoddbfigikpkhpicbfpbcaagaodgmm

// let redirect_url = chrome.identity.getRedirectURL("*://launchpad.37signals.com/*");
// let redirect_url = window.location.href;
// let redirect_url = "http://ec2-54-227-1-34.compute-1.amazonaws.com/get_token";

// window.open(login);  //open new window/tab to login to Basecamp

// chrome.identity.getAuthToken(
//    {'url': login, 'interactive': true}, function(aws_get_token) {
//       alert("PLEASE");
//    });

// chrome.identity.launchWebAuthFlow(
//    {'url': login, 'interactive': true}, function(chromiumapp_token) {
//       alert("PLEASE");
//       alert(chromiumapp_token);
//    });
 




         // fetch(login)
         //   .then(response => response.json())
         //   .then(data => console.log(data));
         //   fetch(login, {method: "POST"}).then(res => res.json()).then(data => console.log(data))

// if(confirm("Login to Basecamp?")){
//   window.open(login);  //open new window/tab to login to Basecamp

//    // somehow determine when user has successfully logged in
//    //    check if token is received/stored?
      
//    let xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//          // Typical action to be performed when the document is ready:
//          //  document.getElementById("demo").innerHTML = xhr.responseText;
//          let response = JSON.parse(xhr.responseText);
//          console.log(response);
//       }
//    };
//    xhr.open("GET", login, true);
//    xhr.send();     
   

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

//    // Automatically close newly opened window?
//    setTimeout(function() {
//       windowBC.close();
//     }, 15000);
// }
// else
//    alert("Didn't login to Basecamp...");

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


// /*==============================================================
// Functionality of 'Tasks' button --> redirect to 'Tasks' screen
// ==============================================================*/
// let tasksBtn = document.getElementById('btn');
// function gotoTasks(){
//    location.href = "./tasks.html";
// }
// tasksBtn.addEventListener('click', gotoTasks);


// /*==============================================================
// Get JSON data/values, then populate the table: 
// ==============================================================*/
// // Use a map to store {Team Name: Team Points} 
// let initMap = new Map();   //unsorted

// // Store team names and their respective total points completed
// for(let i = 0; i < response.teams.length; i++)  // for each team
// {
//   // Map each team with their points completed  
//   initMap.set(response.teams[i].name, response.teams[i].completed);
// }
// let myMap = new Map([...initMap.entries()].sort((a, b) => b[1] - a[1])); // sorted map

// // Get reference to the table element from the HTML
// let table = document.getElementById('table');

// // Populate the table: 
// function populateTable(value, key){
//    let anchorTeam = document.createElement('a');
//    // Insert a new row at the end of the table
//    let newRow = table.insertRow(-1);
//    // create/insert 2 new <td> (table data/cell) elements in the new row
//    let cell1 = newRow.insertCell(0);   // Team Name
//    let cell2 = newRow.insertCell(1);   // Points   
//    // create/insert the contents of the new cells
//    let cell1Text = document.createTextNode(`Team ${key}`);
//    let cell2Text = document.createTextNode(`${value} points`);

//    anchorTeam.appendChild(cell1Text);
//    anchorTeam.href = "./team.html";
//    anchorTeam.setAttribute("style", "text-decoration:none; color: #FFFFFF;");

//    cell1.appendChild(anchorTeam);
//    cell2.appendChild(cell2Text);

// }
// myMap.forEach(populateTable);
