let mock1 = {
    '2020-09-15': 25,
    '2020-09-17': 33,
    '2020-09-18': 45,
    '2020-09-22': 41,
    '2020-09-25': 21,
    '2020-09-27': 34,
    '2020-10-03': 35,
    '2020-10-05': 32,
    '2020-10-15': 26,
};

let mock2 = {
    15: 22,
    17: 54,
    20: 32,
    33: 28,
    41: 17,
    44: 0,
    48: 10,
    52: -10
};

let currentFunctioncall = null;
const currentMockup = mock1;
const padding = 10;

// Helper functions are here

const resize = () => {
    if (currentFunctioncall) currentFunctioncall(mock1);
}

window.onresize = resize;

const collectionMinMax = collection => {
    let range = Object.values(collection);
    const minMax = range.reduce((acc, el) => {
        if (el < acc.min) acc.min = el;
        if (el > acc.max) acc.max = el;
        return acc;
    }, {min: Infinity, max: -Infinity});
    return minMax;
}

// Drawing charts with div-blocks:

const drawItWithDiv = () => {
    currentFunctioncall = drawItWithDiv;
    let range = collectionMinMax(mock1);
    let heightDif = range.max - range.min;
    const output = document.querySelector('#output');
    output.innerHTML = '';
    let width = output.scrollWidth;
    let height = output.scrollHeight;
    let segmentWidth = parseFloat(width) / Object.keys(currentMockup).length - padding;
    let segmentHeight = parseFloat(height) / (range.max - range.min);
    for (let stat of Object.keys(currentMockup)) {
        let el = document.createElement('div');
        el.style.width = Math.floor(segmentWidth) + 'px';
        el.style.height = Math.floor(segmentHeight * (currentMockup[stat] - range.min)) + 'px';
        el.style.marginRight = padding + 'px';
        el.style.backgroundColor = 'red';
        output.appendChild(el);
    }
    return false;
}

// Drawing charts with canvas

// Drawing axes for charts

const drawAxis = (canvas, legendPadding, padding) => {
    let chart = canvas.getContext('2d');
    chart.clearRect(0, 0, canvas.width, canvas.height);
    chart.save();
    chart.translate(legendPadding, padding);
    chart.beginPath();
    chart.moveTo(0, 0);
    chart.lineTo(-5, 20);
    chart.moveTo(0, 0);
    chart.lineTo(5, 20);
    chart.moveTo(0, 0);
    chart.lineTo(0, canvas.height - legendPadding);
    chart.lineTo(canvas.width - legendPadding - padding, canvas.height - legendPadding);
    chart.translate(canvas.width - legendPadding - padding, canvas.height - legendPadding);
    chart.lineTo(-20, -5);
    chart.moveTo(0, 0);
    chart.lineTo(-20, 5);
    chart.stroke();
    chart.restore();
}

const chartDrawer = (type, ...args) => {
    switch (type) {
        case 'barChart':
            drawBarChart(...args);
            break;
        case 'polylineChart':
            drawPolylineChart(...args);
            break;
        default:
            drawPolylineChartWithPoints(...args);
            break;
    }
}

const drawBarChart = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {}

const drawPolylineChart = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {
    chart.beginPath();
    chart.moveTo(0, 0);
    for (let i = 0, n = axisX.length; i < n; i++) {
        if (i == 0) chart.moveTo(i, - segmentHeight * (currentMockup[axisX[i]] - range.min));
        else chart.lineTo((segmentWidth  + padding) * i, - segmentHeight * (currentMockup[axisX[i]] - range.min));
    }
    chart.stroke();
}

const drawPolylineChartWithPoints = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {
    drawPolylineChart(chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding);
    for (let i = 0, n = axisX.length; i < n; i++) {
        chart.beginPath();
        chart.moveTo(0, 0);
        chart.arc(
            (segmentWidth  + padding) * i, 
            -segmentHeight * (currentMockup[axisX[i]] - range.min),
            3,
            0,
            Math.PI * 2,
            true);
            chart.fill();
        }
}

const drawItWithCanvas = chartType => {
    currentFunctioncall = drawItWithCanvas;
    let legendPadding = 70;
    let range = collectionMinMax(mock1);
    let heightDif = range.max - range.min;
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = output.scrollWidth;
    canvas.height = output.scrollHeight;
    output.appendChild(canvas);
    let axisX = Object.keys(currentMockup);
    let segmentWidth = parseFloat(canvas.width - legendPadding) / axisX.length - padding;
    let segmentHeight = parseFloat(canvas.height - padding - legendPadding) / (heightDif);
    let chart = canvas.getContext('2d');
    drawAxis(canvas, legendPadding, padding);
    chart.translate(legendPadding, canvas.height - legendPadding + padding);
    chart.save();
    chartDrawer(chartType, chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding);
    chart.restore();
    
}
