const start = document.querySelector('#start');
const modal = document.querySelector('.modal');
const submit = document.querySelector('.submit');
const idea = document.querySelector('.idea');
const header = document.querySelector('header');
let fName = '';
let lName = '';
let firstPart = 0;
let secondPart = 0;
let Type = ['Лендинг', 'Сайт-визитка', 'Блог', 'Интернет-магазин', 'Блог'];
let Description = ['носков', 'бушменов', 'вегетарианского мяса', 'огородного хозяйства', 'кружка ролевиков', 'неизвестно и скучного писателя', 'инженеров паровых саолетов', 'духовенства нерелигиозной секты'];

start.onclick = () => {
    modal.style.display = 'block';
    start.style.display = 'none';
}

submit.onclick = (ev) => {
    ev.preventDefault();
    fName = document.querySelector('#first_name');
    lName = document.querySelector('#last_name');
    fName = fName.value || 'Alexander';
    lName = lName.value || 'Alexandrov';
    for (let char of fName) {
        firstPart += char.charCodeAt();
    }
    for (let char of lName) {
        secondPart += char.charCodeAt();
    }
    idea.innerHTML = '<h3>Решено!</h3><p>Твоим проектом будет ' + Type[firstPart % Type.length] + ' ' + Description[secondPart % Description.length] + '</p>';
    modal.style.display = 'none';
    header.style.display = 'none';
}