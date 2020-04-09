import {quiz} from './quiz.js';
document.querySelector('button').onclick = startGame;
document.querySelector('#startGame').onclick = startGame;
let isStarted = false;
let maxScore = 0;
let score;

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
    let gameField = document.querySelector('#game_field');
    gameField.style.display = 'flex';
    let questionCard = document.querySelector('#question_card');
    let questionNum = object.index > 9 ? object.index : ('0' + object.index);
    questionCard.src = 'img/cards/card-' + questionNum + '.png';
    questionCard.alt = object.question;
    document.querySelector('#question').innerHTML = object.question;
    document.querySelector('#question_sound').src = 'voice/card ' + object.index + '.mp3';
    let answers = [object.right, object.wrong1, object.wrong2, object.wrong3];
    shuffle(answers);
    for (let i = 0; i < 4; i++) {
        document.querySelector('#answer' + (i + 1)).innerHTML = answers[i];
    }
}

function nextCard() {
    if (quiz.length > 0) {
        let justification = document.querySelector('#justification');
        justification.style.display = 'none';
        justification.className = '';
        let nextQuestion = quiz.pop()
        maxScore += nextQuestion.points;
        generateCardHTML(nextQuestion);
        let confirmAnswer = document.querySelector('#confirm');
        confirmAnswer.innerText = 'Відповісти';
        confirmAnswer.onclick = function() {
            confirmAnswer.innerText = 'Наступне питання';
            let answer = document.querySelector('#answers > div.active_answer').innerText;
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
                }
            }
            confirmAnswer.onclick = nextCard;
        }
    }
    else endGame();
}

function toggleAnswer(event) { 
    event.stopPropagation();
    document.querySelector('.active_answer').classList.remove('active_answer');
    event.target.classList.add('active_answer');
}

function endGame() {
    document.querySelector('#game_field').style.display = 'none';
    document.querySelector('#greetings').style.display = 'flex';
    document.querySelector('#greetings > h2').innerText += ' ' + score + ' із ' + maxScore + ' балів.';
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
    document.querySelector('#greetings').style.display = 'none';
    if (isStarted) {
        if(confirm('Ти впевнений, що хочеш почати гру з початку, не дійшовши до кінця?')) {
            isStarted = false;
            startGame();
        }
    }
    else {
        isStarted = true;
        score = 0;
        document.querySelector('#banner').style.display = 'none';
        let articles = document.querySelectorAll('article');
        for (let i = 0, n = articles.length; i < n; i++) {
            articles[i].style.display = 'none';
        }
        shuffle(quiz);
        document.querySelector('#answers').addEventListener('click', toggleAnswer);
        nextCard();
    }
}