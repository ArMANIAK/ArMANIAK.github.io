let popup = document.querySelector('.container');

let height = 100;
let width = 100;
let window_height = window.innerHeight;
let window_width = window.innerWidth;
let direction1 = 1;
let direction2 = 1;
//console.log(window_width, window_height);

popup.onmouseover = () => {
    let cur_coord = popup.getBoundingClientRect();
    //console.log(cur_coord);
    let x = cur_coord.left;
    let y = cur_coord.top;
    //console.log({x, y}, direction1, direction2);
    if (x + direction1 * width > window_width - width || x + direction1 * width < 0) {
        direction1 = -direction1;
        /*console.log({ dir1: direction1, x: x, y: y,
            bounary_left: window_width - width, boundary_right: width, shift_hor: x + direction1 * width });*/
    }
    if (y + direction2 * height > window_height - height || y + direction2 * height < 0) {
        direction2 = -direction2;
        /*console.log({ dir2: direction2, x: x, y: y,
            bounary_bottom: window_height - height, boundary_top: height, shift_vert: y + direction2 * height });*/
    }
    popup.style.left = x + direction1 * width + 'px';
    popup.style.top = y + direction2 * height + 'px';
}
//console.log(popup.style.left, popup.style.top);

//console.log(window_width, window_height);
