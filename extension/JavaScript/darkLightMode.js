function setColorForCard() {
    let card = document.getElementById("card");
    let mode = localStorage.getItem("mode");
    if (mode == "dark") {
        card.classList.add("dark-mode");
    } else {
        card.classList.add("light-mode");
    }
}

export { setColorForCard };



