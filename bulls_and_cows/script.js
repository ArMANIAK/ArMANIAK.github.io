const button = document.querySelector('.button');
const tries = document.querySelector('.tries');
const result = document.querySelector('.result');
const guess = document.querySelectorAll('.figure');
const arrowsUp = document.querySelectorAll('.arrowUp');
const arrowsDown = document.querySelectorAll('.arrowDown');
const signals = document.querySelectorAll('.signals .lamp');
let counter = 1;
let task = Array(4);
button.innerText = 'Поехали!';

const increase = figure => {
    let num = parseInt(figure);
    return num === 9 ? 0 : ++num;
}

const decrease = figure => {
    let num = parseInt(figure);
    return num === 0 ? 9 : --num;
}

const start = () => {
    button.innerText = 'Проверить';
    tries.style.visibility = 'visible';
    tries.lastChild.innerHTML = counter;
    for (let i = 0, n = task.length; i < n; i++) {
        task[i] = Math.floor(Math.random() * 10);
    }
}

const checkValue = () => {
    let cows = 0;
    let bulls = 0;
    let skip = [];
    for (let i = 0; i < 4; i++) {
        if (guess[i].innerHTML == task[i]) {
            skip.push(i);
            bulls++;
        }
    }
    for (let i = 0, n = task.length; i < n; i++) {
        for (let j = 0, m = guess.length; j < m; j++) {
            if (i === j) continue;
            if (guess[j].innerHTML == task[i]) {
                if (skip.indexOf(i) !== -1) break;
                cows++;
                break;
            }
        }
    }
    return {'bulls': bulls, 'cows': cows};
}

const lightLamp = (bullsAndCows) => {
    signals.forEach(lamp => lamp.classList.remove('bull', 'cow'));
    for (let lamp of signals) {
        if (bullsAndCows.bulls-- > 0) lamp.classList.add('bull');
        else if (bullsAndCows.cows-- > 0) lamp.classList.add('cow');
        else break;
    }
}

for (let i = 0; i < 4; i++) {
    let figure = guess[i];
    arrowsUp[i].onclick = () => {
        figure.innerHTML = increase(figure.innerHTML);
    }
    arrowsDown[i].onclick = () => {
        figure.innerHTML = decrease(figure.innerHTML);
    }
}

button.onclick = () => {
    if (button.innerText === 'Проверить') {
        let res = checkValue();
        if (res.bulls === 4) {
            result.innerHTML = '<h2>Поздравляю, Вы справились за ' + counter + ' попыток!</h2>';
            button.innerText = 'Новая игра'
        }
        else {
            tries.lastChild.innerHTML = ++counter;
            lightLamp(res);
        }
    }
    else if (button.innerText == 'Поехали!') {
        start();
    }
    else if (button.innerText === 'Новая игра') {
        result.innerText = '';
        start();

    } else return false;

}