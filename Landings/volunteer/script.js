let lifeSliderPrev = document.querySelector('#volunteer_life .left');
let lifeSlider = document.querySelector('#volunteer_life .slider');
let lifeSlides = document.querySelectorAll('#volunteer_life .slider-tile');
lifeSliderPrev.addEventListener('click', () => prevSlide(lifeSlider, lifeSlides));
let lifeSliderNext = document.querySelector('#volunteer_life .right');
lifeSliderNext.addEventListener('click', () => nextSlide(lifeSlider, lifeSlides));
let storySlider = document.querySelector('#share_story .slider');
let storySlides = document.querySelectorAll('#share_story .slider-tile');
let storySliderPrev = document.querySelector('#share_story .left');
storySliderPrev.addEventListener('click', () => prevSlide(storySlider, storySlides));
let storySliderNext = document.querySelector('#share_story .right');
storySliderNext.addEventListener('click', () => nextSlide(storySlider, storySlides));

function renderSlides(slider, slideList) {
    slider.innerHTML = '';
    slideList.forEach(el => slider.innerHTML += el.outerHTML);
}

function nextSlide(slider, sliderList) {
    sliderList.forEach((el, i) => {
        let order = el.style.order ? el.style.order : i;
        el.style.order = (order + sliderList.length + 1) % sliderList.length;
    });
    renderSlides(slider, sliderList);
}

function prevSlide(slider, sliderList) {
    sliderList.forEach((el, i) => {
        let order = el.style.order ? el.style.order : i;
        el.style.order = (order + sliderList.length - 1) % sliderList.length;
    });
    renderSlides(slider, sliderList);
}
window.onload = () => {
    if (window.screen.availWidth < 760) {
        console.log(window.screen.availWidth);
        setInterval(() => nextSlide(storySlider, storySlides), 2000);
        setInterval(() => nextSlide(lifeSlider, lifeSlides), 2000);
    }
}