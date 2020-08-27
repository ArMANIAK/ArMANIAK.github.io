let body = document.querySelector(".content");
let screen = document.querySelector(".screen");

window.addEventListener('keypress', (e) => {
    if (e.key === 'E') {
        body.classList.toggle("none");
        screen.classList.toggle("none");
    }
})