const matrix = [];
let stepCount = 0;
const cols = 3;
const rows = 3;
let mark = 'X';
const elements = document.querySelectorAll('.cell');
const cells = Array.from(elements);
const startButton = document.querySelector('.button');

const initState = () => {
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = '';
    }
  }
};

const changeMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.textContent;
};

const deleteSigns = () => {
  cells.forEach((cell) => (cell.innerHTML = ''));
};

const increaseCounter = () => {
  stepCount += 1;
};

const modifyCell = (element) => {
  element.innerHTML = mark;
  element.removeEventListener('click', handleClick);
};

const setMark = () => {
  if (mark === 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
};

const handleClick = (event) => {
  increaseCounter(),
  modifyCell(event.target),
  setMark(),
  changeMatrixValue(event.target),
  checkWinner();
};

const addClickListener = () => {
  cells.forEach((cell) => cell.addEventListener('click', handleClick));
};

const removeAllClickListeners = () => {
  cells.forEach((cell) => cell.removeEventListener('click', handleClick));
};

const checkValues = (array) => array
  .map((row) => {
    if (row.every((cell) => cell === 'X')) {
      return true;
    } if (row.every((cell) => cell === 'O')) {
      return true;
    }
    return false;
  })
  .indexOf(true) !== -1;

const checkColumnValues = () => checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () => checkValues([
  matrix.map((array, i) => matrix[i][i]),
  matrix.map((array, i) => matrix[i][matrix[i].length - i - 1]),
]);

const checkWinner = () => {
  console.log(checkColumnValues());
  console.log(checkDiagonalValues());
  if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) { endGame(); }
};

const setMessage = (message) => {
  document.querySelector('.display__announce').innerHTML = message;
};

const startGame = () => {
  initState();
  addClickListener();
  newGame();
};

const endGame = () => {
  setMessage(`The winner is Player ${mark === 'X' ? 'O' : 'X'}.`);
  removeAllClickListeners();
};

const newGame = () => {
  startButton.addEventListener('click', () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage('Playing...');
    setMark();
  });
};
startGame();
