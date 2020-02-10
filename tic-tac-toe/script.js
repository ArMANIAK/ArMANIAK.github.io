const Flip = () => Math.floor(Math.random() * 2);

const tileOccupied = (el) => {
    return el.innerText;
}

const winningCondition = (field) => {
    if (field[0].innerText == field[1].innerText && field[0].innerText == field[2].innerText && field[0].innerText != '' ||
        field[3].innerText == field[4].innerText && field[3].innerText == field[5].innerText && field[3].innerText != '' ||
        field[6].innerText == field[7].innerText && field[6].innerText == field[8].innerText && field[6].innerText != '' ||
        field[0].innerText == field[3].innerText && field[0].innerText == field[6].innerText && field[0].innerText != '' ||
        field[1].innerText == field[4].innerText && field[1].innerText == field[7].innerText && field[1].innerText != '' ||
        field[2].innerText == field[5].innerText && field[2].innerText == field[8].innerText && field[2].innerText != '' ||
        field[0].innerText == field[4].innerText && field[0].innerText == field[8].innerText && field[0].innerText != '' ||
        field[2].innerText == field[4].innerText && field[2].innerText == field[6].innerText && field[2].innerText != '') {
            console.dir(field);
            return true;
        }
           
    return false;
}
const button = document.querySelector('button');
button.onclick = () => {
    let firstPlayerMove = true;
    const beginning = document.querySelector('.beginning');
    const instructions = document.querySelector('.instructions');
    const field = document.querySelector('.field');
    const tiles = document.querySelectorAll('.tile');
    Flip() ? instructions.innerHTML = '<p>It is tail. Now let,s start</p>' : instructions.innerHTML = '<p>It is head. Now let,s start</p>';
    beginning.style.display = 'none';
    instructions.style.display = field.style.display = 'block';
    tiles.forEach(element => {
        element.onclick = function() {
            if (tileOccupied(element)) {
                instructions.innerHTML = '<p>This tile is occupied. Are You blind? Choose another one </p>';
            }
            else {
                if (firstPlayerMove) element.innerText = 'x';
                else element.innerText = 'o';
                if (winningCondition(tiles)) {
                    let winner = firstPlayerMove ? 'Player one' : 'Player Two';
                    instructions.innerHTML = '<p> Congratulations ' + winner + '! You won';
                }
                else {
                    firstPlayerMove = !firstPlayerMove;
                }
            }
        }
    });

}