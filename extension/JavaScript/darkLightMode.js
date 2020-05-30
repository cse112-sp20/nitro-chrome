

var currMode = localStorage.getItem("mode");

var element2 = document.getElementById( "darkness" );
element2.classList.toggle(currMode);

function switchMode() {
    console.log("Button Clicked");
    var element = document.getElementById( "darkness" );
    mode = localStorage.getItem("mode");
    if(mode == "dark") {
        mode = "light";
    } else {
        mode = "dark";
    }
    element.classList.toggle(mode);
}

darkModeBtn = document.getElementById("dark-mode");
darkModeBtn.addEventListener("click", switchMode);

