function switchMode() {
    console.log("Button Clicked");
    var element = document.body;
    element.classList.toggle("light");
}

darkModeBtn = document.getElementById("dark-mode");
darkModeBtn.addEventListener("click", switchMode);

