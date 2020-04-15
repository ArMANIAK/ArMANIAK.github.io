import {quiz} from './quiz.js';
document.querySelector('button#game').onclick = showModal;
document.querySelector('#startGame').onclick = showModal;
let cards;
let isStarted = false;
let maxScore = 0;
let score;

function showModal() {
    document.querySelector('.modal_confirmation').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.querySelector('span.dismiss').onclick = dismissModal;
    document.querySelector('.turn_on').onclick = turnAutoplayOn;
    document.querySelector('.turn_off').onclick = turnAutoplayOff;
}

function dismissModal() {
    document.querySelector('.modal_confirmation').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function turnAutoplayOn() {
    document.querySelector('audio#question_sound').setAttribute('autoplay', true);
    let soundToggle = document.querySelector('div.toggleSound');
    soundToggle.dataset.sound = 'on';
    soundToggle.innerHTML = '\u{1F50A}';
    dismissModal();
    startGame();
}

function turnAutoplayOff() {
    document.querySelector('audio#question_sound').removeAttribute('autoplay');
    let soundToggle = document.querySelector('div.toggleSound');
    soundToggle.dataset.sound = 'off';
    soundToggle.innerHTML = '\u{1F507}';
    dismissModal();
    startGame();
}

function toggleSound() {
    let audio = document.querySelector('audio#question_sound');
    let soundToggle = document.querySelector('div.toggleSound');
    if (soundToggle.dataset.sound == 'on') {
        audio.removeAttribute('autoplay');
        audio.pause();
        soundToggle.dataset.sound = 'off';
        soundToggle.innerHTML = '\u{1F507}';
    }
    else {
        audio.setAttribute('autoplay', true);
        audio.play();
        soundToggle.dataset.sound = 'on';
        soundToggle.innerHTML = '\u{1F50A}';
    }
}

function shuffle(array) {
    for (let i = 0, n = array.length; i < n; i++) {
        let newIndex = Math.floor(Math.random() * n);
        if (newIndex !== i) {
            let temp = array[i];
            array[i] = array[newIndex];
            array[newIndex] = temp;
        }
    }
}

function generateCardHTML(object) {
    let questionCard = document.querySelector('#question_card');
    let questionNum = object.index > 9 ? object.index : ('0' + object.index);
    questionCard.src = 'img/cards/card-' + questionNum + '.png';
    questionCard.alt = object.question;
    document.querySelector('.toggleSound').onclick = toggleSound;
    document.querySelector('#question_sound').src = 'voice/card ' + object.index + '.mp3';
    let answers = [object.right, object.wrong1, object.wrong2, object.wrong3];
    shuffle(answers);
    for (let i = 0; i < 4; i++) {
        let answerDiv = document.querySelector('#answer' + (i + 1));
        answerDiv.innerHTML = answers[i];
    }
    let element = document.querySelector('.active_answer');
    if (element) element.classList.remove('active_answer');
}

function nextCard() {
    if (cards.length > 0) {
        let justification = document.querySelector('#justification');
        justification.style.display = 'none';
        justification.className = '';
        let nextQuestion = cards.pop()
        maxScore += nextQuestion.points;
        generateCardHTML(nextQuestion);
        document.querySelector('#answers').addEventListener('click', toggleAnswer);
        document.querySelector('#answers').addEventListener('keydown', toggleAnswerWithSpace);
        let confirmAnswer = document.querySelector('#confirm');
        confirmAnswer.innerText = 'Відповісти';
        confirmAnswer.onclick = function() {
            let answer = document.querySelector('#answers > div.active_answer');
            if (answer) {
                confirmAnswer.innerText = 'Наступне питання';
                document.querySelector('#answers').removeEventListener('click', toggleAnswer);
                document.querySelector('#answers').removeEventListener('keydown', toggleAnswerWithSpace);
                answer = answer.innerText;
                justification.style.display = 'flex';
                if (answer === nextQuestion.right) {
                    justification.classList.add('correct');
                    let scoreIndicator = document.querySelector('#score');
                    score += nextQuestion.points;
                    scoreIndicator.innerText = 'Твій рахунок: ' + score;
                }
                else {
                    justification.classList.add('incorrect');
                }
                for (let prop in nextQuestion) {
                    if (nextQuestion[prop] === answer) {
                        justification.innerText = nextQuestion[prop + 'Explanation'];
                        justification.focus();
                    }
                }
                confirmAnswer.onclick = nextCard;
            }
            
        }
    }
    else endGame();
}

function toggleAnswerWithSpace (event) {
    if (event.keyCode == 32 || event.keyCode == 13) {
        toggleAnswer(event);
    }
}

function toggleAnswer(event) { 
    event.stopPropagation();
    let element = document.querySelector('.active_answer');
    if (element) element.classList.remove('active_answer');
    event.target.classList.add('active_answer');
}

function endGame() {
    isStarted = false;
    document.querySelector('audio#question_sound').pause();
    document.querySelector('#game_field').style.display = 'none';
    document.querySelector('#greetings').style.display = 'flex';
    document.querySelector('#greetings > h2').innerText = 'Вітаю! Ти набрав:  ' + score + ' із ' + maxScore + ' балів.';
    let evaluation = document.querySelector('#evaluation');
    if (score > maxScore * 2 / 3) {
        evaluation.innerText = 'На більшість питань ти відповів правильно. Тож ти знаєш, як надавати першу допомогу. Але нехай твої знання залишаться виключно теоретичними';
    }
    else if (score > maxScore / 3) {
        evaluation.innerText = 'В деяких ситуаціях ти зможеш надати першу допомогу. Але, щоб бути більш впевненим в своїх діях, ми радимо пройти тренінг з Першої допомоги. Реєструйся за посиланням вище.';
    }
    else evaluation.innerText = 'Навички надання першої допомоги вкрай важливі в нашому житті. Щоб бути корисним та впевненим в кризовій ситуації, пройди тренінг з Першої допомоги. Реєструйся за посиланням вище.';
}

function startGame() {
    if (isStarted) {
        if(confirm('Ти впевнений, що хочеш почати гру з початку, не дійшовши до кінця?')) {
            isStarted = false;
            startGame();
        }
    }
    else {
        isStarted = true;
        cards = quiz.slice(0);
        score = 0;
        maxScore = 0;
        document.querySelector('#game_field').style.display = 'flex';
        document.querySelector('#greetings').style.display = 'none';
        document.querySelector('#banner').style.display = 'none';
        let articles = document.querySelectorAll('article');
        for (let i = 0, n = articles.length; i < n; i++) {
            articles[i].style.display = 'none';
        }
        shuffle(cards);
        let navLink = document.querySelector('#startGame');
        navLink.onclick = backToMain;
        navLink.innerText = "Повернутися до головної";
        nextCard();
    }
}

function backToMain() {
    document.querySelector('#banner').style.display = 'block';
    document.querySelector('#game_field').style.display = 'none';
    document.querySelector('#greetings').style.display = 'none';
    let navLink = document.querySelector('#startGame');
    navLink.onclick = showModal;
    navLink.innerText = "Почати гру";
    isStarted = false;
    document.querySelector('audio#question_sound').pause();
    let articles = document.querySelectorAll('article');
    for (let i = 0, n = articles.length; i < n; i++) {
        articles[i].style.display = 'block';
    }
}