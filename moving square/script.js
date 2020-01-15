let popup = document.querySelector('.container');

let height = 100;
let width = 100;
let window_height = window.innerHeight;
let window_width = window.innerWidth;
let direction1 = 1;
let direction2 = 1;

let int = setInterval(() => {
    while(true) {
        let cur_coord = popup.getBoundingClientRect();
        console.log(cur_coord);
        let x = cur_coord['left'];
        let y = cur_coord['top'];
        let center = { x: x + width / 2, y: y + height / 2 };
        console.log(center, direction1, direction2);
        if (center.x + direction1 * width / 2 > window_width - width / 2 || center.x + direction1 * width < width / 2) direction1 = -direction1;
        if (center.y + direction2 * height / 2 > window_height - height / 2 || center.y + direction2 * height < height / 2) direction2 = -direction2;
        popup.style.left = x + direction1 + 'px';
        popup.style.top = y + direction2 + 'px';
    };
}, 500)();
