let DIGITS = 2;

function makeCollection(str, char) {
    if (str.length < 2) return str;
    let result = [];
    let positions = makeArrayOfPositions(str.length - 1);
    for(let position in positions) result.push(createString(str, char, position));
    return result;
}

function createString(str, char, deviderPositionsArray) {
    if (str.length < 2) return str;
    let resultStr = '';
    for (let i = 0, n = str.length - 1; i < n; i++) {
        resultStr += deviderPositionsArray[i] ? str[i] + char : str[i];
    }
    resultStr += str[str.length - 1];
    return resultStr;
}

function makeArrayOfPositions(length) {
    if (length < 2) return [];
    let resultedArray = [];
    let positions = new Array(length).fill(DIGITS - 1);
    for (let i = length - 1, currentDepth = i - 1, maxDepth = currentDepth; ; ) {
        if (positions[i] > 0) {
            positions[i]--;
            resultedArray.push(positions.slice());
        }
        else {
            positions[i] = DIGITS - 1;
            resultedArray.push(positions.slice());
            if (positions[currentDepth] > 0) {
                positions[currentDepth]--;
            }
        }
    }
    return resultedArray;
}

console.log(makeArrayOfPositions(4));