/*==============================================================
Functionality of BACK button --> redirect to 'Leaderboard' screen
==============================================================*/
let backBtn = document.getElementById('back');
function gotoUsers() {
    location.href = "./users.html";
}
backBtn.addEventListener('click', gotoUsers);

// let table = document.getElementById("user-profile-table");

let username = document.getElementById("username");
username.innerHTML = localStorage.getItem("curr_user");