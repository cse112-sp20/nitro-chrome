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

/*==============================================================
Functionality of BACK button --> redirect to 'Leaderboard' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoLeaderboard(){
   location.href = "./leaderboard.html";
}
backBtn.addEventListener('click', gotoLeaderboard);

/*=======================================================================
Functionality of Leaderboard button --> redirect to 'Leaderboard' screen
=======================================================================*/
let leaderboardBtn = document.getElementById('leaderboard-btn');
leaderboardBtn.addEventListener('click', gotoLeaderboard);

/*==============================================================
Functionality of Tasks button --> redirect to 'Tasks' screen
==============================================================*/
let tasksBtn = document.getElementById('tasks-btn');
function gotoTasks(){
   location.href = "./tasks.html";
}
tasksBtn.addEventListener('click', gotoTasks);