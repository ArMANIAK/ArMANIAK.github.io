$link = $('nav a');
$table = $('content > section');
$link.each((index, element) => {
    element.onclick = () => {
        $('.active').toggleClass('active').toggleClass('inactive');
        $table[index].classList.toggle('active');
        $table[index].classList.toggle('inactive');
    }
});

const competencies = [
    { tech: "HTML", level: 6, logo: './assets/html_logo.png' },
    { tech: "CSS", level: 5, logo: './assets/css_logo.png' },
    { tech: "JavaScript", level: 6, logo: './assets/js_logo.png' },
    { tech: "PHP", level: 4, logo: './assets/php_logo.png' },
    { tech: "SQL", level: 4, logo: './assets/sql_logo.png' },
    { tech: "TypeScript", level: 3, logo: './assets/ts_logo.png' },
    { tech: "React", level: 4, logo: './assets/react_logo.png' },
    { tech: "C++", level: 2, logo: './assets/cpp_logo.png' }
]

const relevantExperience = [
//    { startDate: new Date(2018, 08, 01), endDate: new Date(2019, 02, 01), title: 'Self-education. C++', tech: ['C++'], type: 'Courses', tip: "Self education. Learning C++ via different courses(e.g. Yandex professional course on Coursera, Hackerrank tasks)" },
//    { startDate: new Date(2019, 02, 15), endDate: new Date(2019, 04, 24), title: 'Harvard\'s CS50', tech: ['C', 'HTML', 'CSS', 'Javascript', 'Python', 'DJango', 'MySQL'], type: 'Courses', tip: "World famous Harvard's CS50 course provided by Brainbasket Foundation in Ukraine" },
//    { startDate: new Date(2019, 05, 22), endDate: new Date(2019, 06, 16), title: 'Ed-Era. Front-end', tech: ['HTML', 'CSS', 'Javascript'], type: 'Courses', tip: "Online course 'Web-development basics' on Ed-Era platform" },
    { startDate: new Date(2020, 01, 16), endDate: new Date(2020, 03, 16), title: 'BrainBasket. Front-end', tech: ['HTML', 'CSS', 'Javascript'], type: 'Courses', tip: "Web-development courses organized by BrainBasket Foundation" },
    { startDate: new Date(2020, 01, 29), endDate: new Date(2020, 06, 08), title: 'CyberBionic Systematics. Front-end', tech: ['HTML', 'CSS', 'Javascript', 'TypeScript', 'Angular'], type: 'Courses', tip: "Front-end developer professional courses by CyberBionic Systematics" },
    { startDate: new Date(2020, 02, 22), endDate: new Date(2020, 12, 17), title: 'IT Nation. Web Development', tech: ['HTML', 'CSS', 'Javascript', 'PHP', 'MySQL', 'React'], type: 'Courses', tip: "Educational program IT Nation included courses, webinars, bootcamp and hackathon" },
    { startDate: new Date(2020, 11, 01), endDate: new Date(2020, 12, 31), title: 'SupportYourApp. Internship', tech: ['HTML', 'CSS', 'Javascript', 'PHP', 'MySQL', 'React'], type: 'Internship', tip: "Internship in SupportYourApp on full-stack web-developer position. This two-month internship was a prize on hackathon 'IT hacks 2020' and I won it." },
    { startDate: new Date(2021, 02, 07}, endDate: new Date(), title: 'IT Dream Service', tech: ['HTML', 'CSS', 'Javascript', 'PHP', 'MySQL', 'AngularJS', 'CodeIgniter'], type: 'Project support', tip: "Support and development of existing commercial projects on ondemand basis, full-stack web-developer position." },
    { startDate: new Date(2021, 09, 08}, endDate: new Date(), title: 'Acropolium', tech: ['HTML', 'CSS', 'Javascript', 'PHP', 'MySQL', 'React', 'Laravel', 'AWS'], type: 'Fulltime job', tip: "Fulltime position on full-stack role. Development of existing project using Laravel, React, MySQL, AWS, Docker" },
 
]

let badges = document.querySelectorAll('.badge');
badges.forEach((el, ind) => el.innerText = competencies[ind].tech);

const createCard = tech => {
    let competency = competencies.filter(el => el.tech == tech)[0];
    let card = document.createElement('div');
    card.className = 'card';
    let logo = document.createElement('img');
    logo.src = competency.logo;
    logo.alt = tech + ' logo';
    let progressBar = document.createElement('progress');
    progressBar.value = competency.level;
    progressBar.max = 10;
    let title = document.createElement('h4');
    title.innerText = tech;
    card.append(logo, progressBar, title);
    document.getElementById('competencies-body').appendChild(card);
}

const createChart = tech => {
    let competency = competencies.filter(el => el.tech == tech)[0];
    let chartItem = document.createElement('div');
    chartItem.className = 'chart-item';
    let title = document.createElement('h4');
    title.innerText = tech;
    let progressBar = document.createElement('progress');
    progressBar.value = competency.level;
    progressBar.max = 10;
    progressBar.style.width = "80%";
    chartItem.append(title, progressBar);
    document.getElementById('competencies-body').appendChild(chartItem);
}

const createGanttChart = (data, parentElement) => {
    const allowedWidth = parentElement.offsetWidth * 0.8;
    const chartElement = document.createElement('div');
    chartElement.className = 'gantt-chart';
    const first = data.reduce((first, el) => first = first.startDate < el.startDate ? first : el);
    const last = data.reduce((last, el) => last = last.endDate > el.endDate ? last : el);
    
    const getPeriod = ({startDate, endDate}) => (endDate - startDate) * 1000 * 60 *60 * 24;

    let diff = getPeriod({startDate: first.startDate, endDate: last.endDate});
    let firstOffset = first.startDate.getDate();
    let graduation = allowedWidth / diff;

    const createGanttEl = ({startDate, endDate, type, tip}) => {
        let offset = firstOffset + getPeriod({startDate: first.startDate, endDate: startDate}) * graduation;
        let elLength = getPeriod({startDate, endDate});
        let elWidth = elLength * graduation;
        let el = document.createElement('div');
        el.className = 'gantt-item';
        el.innerText = type;
        console.log({startDate, offset, elWidth, endDate, duration: offset / graduation, graduation, elLength});
        el.setAttribute('style', `width: ${elWidth}px; left: ${offset}px; background-color: #00DD11`);
        let tipEl = document.createElement('div');
        tipEl.className = 'gantt-item-tip';
        tipEl.innerText = tip;
        el.appendChild(tipEl)
        return el;
    }

    data.forEach((el, ind) => chartElement.append(createGanttEl(el, ind)));
    parentElement.append(chartElement);
}

const renderCards = () => {
    competencies.forEach(el => createCard(el.tech));
}

const renderChart = () => {
    competencies.forEach(el => createChart(el.tech));
}

const abTesting = () => {
    if (Math.random() < 0.5) renderChart();
    else renderCards();
}

abTesting();
const experienceBlock = document.querySelector('#experience');
createGanttChart(relevantExperience, experienceBlock);
