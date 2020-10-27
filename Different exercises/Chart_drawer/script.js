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
    36: 22,
    41: 17,
    44: 0,
    48: 10,
    52: -10
};

let currentFunctioncall = null;
const currentMockup = mock1;
const padding = 10;
const arrowLength = 20;
const arrowWidth = 6;

// Helper functions are here

const resize = () => {
    if (currentFunctioncall) currentFunctioncall(currentMockup);
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
    let range = collectionMinMax(currentMockup);
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
    chart.lineTo(-arrowWidth / 2, arrowLength);
    chart.moveTo(0, 0);
    chart.lineTo(arrowWidth / 2, arrowLength);
    chart.moveTo(0, 0);
    chart.lineTo(0, canvas.height - legendPadding);
    chart.lineTo(canvas.width - legendPadding - padding, canvas.height - legendPadding);
    chart.translate(canvas.width - legendPadding - padding, canvas.height - legendPadding);
    chart.lineTo(-arrowLength, -arrowWidth / 2);
    chart.moveTo(0, 0);
    chart.lineTo(-arrowLength, arrowWidth / 2);
    chart.stroke();
    chart.restore();
}

const makeLegendForAxisX = (chart, axisX, segmentWidth, padding) => {
    let fontSize = 16;
    chart.font = `${fontSize}px serif`;
    let legendLength = axisX.reduce((acc, el) => acc += chart.measureText(el).width, 0);
    let rows = Math.ceil(legendLength / (segmentWidth * axisX.length));
    chart.textBaseline = 'top';
    chart.textAlign = 'right';
    for (let i = 0, n = axisX.length; i < n; i++) {
        let verticalPosition = i % rows;
        chart.fillText(axisX[i], (i + 1) * (segmentWidth + padding), fontSize / 2 + fontSize * verticalPosition);
        chart.beginPath();
        chart.moveTo(0, 0);
        chart.arc(
            (segmentWidth  + padding) * (i + 1), 
            0,
            3,
            0,
            Math.PI * 2,
            true);
            chart.fill();
    }
};

const makeLegendForAxisY = (chart, axisX, currentMockup, range, segmentHeight, padding, legendPadding) => {
    let fontSize = 16;
    chart.font = `${fontSize}px serif`;
    chart.textBaseline = 'middle';
    chart.textAlign = 'right';
    let legendValues = Object.values(currentMockup);
    legendValues.sort((a, b) => {
        if (a < b) return -1;
        else if (a == b) delete a;
        else return 1;
    });
    let uniqueValues = legendValues.filter((el, ind, array) => array.indexOf(el) === ind);
    for (let i = 0, n = uniqueValues.length; i < n; i++) {
        chart.fillText(uniqueValues[i], -5, -segmentHeight * (uniqueValues[i] - range.min), legendPadding);
            chart.beginPath();
            chart.moveTo(0, 0);
            chart.arc(
                0, 
                -segmentHeight * (uniqueValues[i] - range.min),
                3,
                0,
                Math.PI * 2,
                true);
                chart.fill();
    }
}

// Choose the function to render chart depending on chart type

const drawChart = (type, ...args) => {
    switch (type) {
        case 'barChart':
            drawBarChart(...args);
            break;
        case 'polylineChart':
            drawPolylineChart(...args);
            break;
        case 'besierChart':
            drawBesierChart(...args);
            break;
        default:
            drawPolylineChartWithPoints(...args);
            break;
    }
}

// Drawing bar chart

const drawBarChart = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {
    for (let i = 0, n = axisX.length; i < n; i++) {
        chart.fillRect(padding + i * (segmentWidth + padding), 0, segmentWidth, -segmentHeight * (currentMockup[axisX[i]] - range.min));
    }
}

// Drawing Polyline chart with edges

const drawPolylineChart = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {
    chart.beginPath();
    chart.moveTo(0, 0);
    for (let i = 0, n = axisX.length; i < n; i++) {
         chart.lineTo((segmentWidth  + padding) * (i + 1), -segmentHeight * (currentMockup[axisX[i]] - range.min));
    }
    chart.stroke();
}

// Draw polyline chart with smooth line

const drawBesierChart = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {
    chart.beginPath();
    chart.moveTo(0, 0);
    for (let i = 0, n = axisX.length; i < n; i++) {
        let endPointX = (segmentWidth + padding) * (i + 1);
        let dX = endPointX - (segmentWidth  + padding) * i;
        let endPointY = -segmentHeight * (currentMockup[axisX[i]] - range.min);
        chart.bezierCurveTo(
            (segmentWidth  + padding) * i + dX / 2,
            i == 0 ? 0 : -segmentHeight * (currentMockup[axisX[i - 1]] - range.min),
            (segmentWidth  + padding) * i + dX / 2,
            endPointY,
            endPointX, 
            endPointY
        );
    }
    chart.stroke();
}

// Draw polyline chart with smooth line and points on the chart

const drawPolylineChartWithPoints = (chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding) => {
    drawPolylineChart(chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding);
    for (let i = 0, n = axisX.length; i < n; i++) {
        chart.beginPath();
        chart.moveTo(0, 0);
        chart.arc(
            (segmentWidth  + padding) * (i + 1), 
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
    let range = collectionMinMax(currentMockup);
    let heightDif = range.max - range.min;
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = output.scrollWidth;
    canvas.height = output.scrollHeight;
    output.appendChild(canvas);
    let axisX = Object.keys(currentMockup);
    let segmentWidth = parseFloat(canvas.width - legendPadding - arrowLength- padding) / axisX.length - padding;
    let segmentHeight = parseFloat(canvas.height - padding - legendPadding - arrowLength) / heightDif;
    let chart = canvas.getContext('2d');
    drawAxis(canvas, legendPadding, padding);
    chart.translate(legendPadding, canvas.height - legendPadding + padding);
    chart.save();
    drawChart(chartType, chart, axisX, currentMockup, range, segmentWidth, segmentHeight, padding, legendPadding);
    chart.restore();
    makeLegendForAxisX(chart, axisX, segmentWidth, padding);
    makeLegendForAxisY(chart, axisX, currentMockup, range, segmentHeight, padding, legendPadding);
}
