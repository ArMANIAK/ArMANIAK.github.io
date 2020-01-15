let popup = document.querySelector('.container');
let btnYes = document.querySelector('#yes');
let btnNo = document.querySelector('#no');

if (!btnNo) {
    alert('Vsio propalo');
} else {
    btnNo.onclick = () => {
        alert('Так иди и учи!');
        popup.style.display = 'none';
    };
}

if (!btnYes) {
    alert('Vsio propalo');
} else {
    btnYes.onmouseover = () => {
        let cur_coord = popup.getBoundingClientRect();
        console.log(cur_coord);
        let x = cur_coord['left'];
        let y = cur_coord['top'];
        let height = cur_coord['height'];
        let width = cur_coord['width'];
        let center = { x: x + width / 2, y: y + height / 2 };
        let window_height = window.innerHeight;
        let window_width = window.innerWidth;
        let direction1 = Math.floor(Math.random() * 3) - 1;
        let direction2 = Math.floor(Math.random() * 3) - 1;
        console.log(direction1, direction2);
        if (center.x + direction1 * width > window_width - width / 2 || center.x + direction1 * width < width / 2) direction1 = -direction1;
        if (center.y + direction2 * height > window_height - height / 2 || center.y + direction2 * height < height / 2) direction2 = -direction2;
        popup.style.top = y + direction2 * height + 'px';
        popup.style.left = x + direction1 * width + 'px';
        console.log(window_height, popup.style.top, window_width, popup.style.left);
    };
}
