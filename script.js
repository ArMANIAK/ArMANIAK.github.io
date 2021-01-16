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
    { tech: "SQL", level: 3, logo: './assets/sql_logo.png' },
    { tech: "TypeScript", level: 3, logo: './assets/ts_logo.png' },
    { tech: "React", level: 3, logo: './assets/react_logo.png' },
    { tech: "C++", level: 2, logo: './assets/cpp_logo.png' }
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
    console.log(tech);
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