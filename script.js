//Retrieve HTML elements
let screen = document.getElementById('screen');
const colorPicker = document.getElementById('color');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');
const changeSizeButton = document.getElementById('sizeChange');

//Set defaults
const defaultColor = '#000000';
const defaultSize = 16;

let currentColor;
let currentSize;
let eraseActive = false;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
//Set up screen
function setScreen(size) {
    screen.innerHTML = "";
    screen.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    screen.style.gridTemplateRows = `repeat(${size}), 1fr`;

    for (let i = 0; i < size * size; i++) {
        const screenSquare = document.createElement('div');
        screenSquare.classList.add('screenSquare');
        screenSquare.addEventListener('mouseover', draw);
        screenSquare.addEventListener('mousedown', draw);
        screen.appendChild(screenSquare);
    }
}
//Make grid interactive
function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (eraseActive === false){
        e.target.style.backgroundColor = currentColor;
    } else if (eraseActive === true){
        e.target.style.backgroundColor = '#808080';
    }
}
//Change Color
function setColor() {
    eraserButton.classList.remove('active');
    eraseActive = false;
    currentColor = colorPicker.value;
}
//"Erase" function
function erase() {
    if (eraseActive === false) {
        eraserButton.classList.add('active');
        eraseActive = true;
        return;
    } else if (eraseActive === true) {
        eraserButton.classList.remove('active');
        eraseActive = false;
        return;
    }
}
//"Clear Button"
function reset () {
    eraseActive = false;
    eraserButton.classList.remove('active');
    setScreen(currentSize);
}
//"Change Size" function
function changeSize () {
    currentSize = prompt('Enter new size max: 100');
    while (currentSize == null || isNaN(currentSize) || currentSize <= 0 || currentSize > 100 || currentSize % 1 != 0) {
        alert('Invalid Entry!');
        currentSize = prompt('Enter new size max: 100');
    }
    reset();
}
//Make buttons interactive
colorPicker.addEventListener('input', setColor)
eraserButton.addEventListener('click', erase);
clearButton.addEventListener('click', reset);
changeSizeButton.addEventListener('click', changeSize);

window.onload = () => {
    currentSize = defaultSize;
    currentColor = defaultColor;
    setScreen(currentSize);
}