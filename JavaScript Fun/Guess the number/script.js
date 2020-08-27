let task = document.querySelector('.task');
let button = document.querySelector('.start');
let number = document.querySelector('#guess');
let guess = undefined;
let isStarted = false;

let Start = () => {
    isStarted = true;
    guess = Math.floor(Math.random() * 100);
    console.log(guess);
    number.style.display = 'block';
    button.innerHTML = 'Try to Guess!';
    button.onclick = () => {
        let effort = number.value;
        if (effort == guess) {
            isStarted = false;
            task.innerHTML = '<h2>CONGRATULATIONS! You have done it<h2> It was ' + effort;
            task.style.textAlign = 'center';
            number.style.display = 'none';
            button.innerHTML = 'Once again?';
            button.onclick = Start;
        }
        else if (effort < guess) {
            task.innerHTML = 'Try a bigger than ' + effort + ' number';
        }
        else {
            task.innerHTML = 'Try a lesser than ' + effort + ' number';
        }
    }
}

button.onclick = Start;