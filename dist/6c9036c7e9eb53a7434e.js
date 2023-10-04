import './index.html';
import './style.css';
import { startGame } from './modules/startGame';

// Создаем внешний вид игры

const body = document.querySelector('body');
const wrapper = document.createElement('div');
let width;
let height;
let countClick = 0;
let fieldSize;
addLevels();
createField();
startGame();
const levels = document.getElementsByName('level');
function change() {
  for (let i = 0; i < levels.length; i += 1) {
    levels[i].addEventListener('change', changeFieldSize);
  }
}
change();
function createField() {
  wrapper.className = 'wrapper';
  const div = document.createElement('div');
  div.className = 'minesweeper';
  const field = document.createElement('div');
  field.className = 'field';
  const scoreboard = document.createElement('div');
  scoreboard.className = 'scoreboard';
  const timer = document.createElement('div');
  timer.className = 'timer';
  timer.textContent = '00.00';
  scoreboard.append(timer);
  const score = document.createElement('div');
  score.className = 'score';
  score.textContent = countClick;
  scoreboard.append(score);
  div.append(scoreboard);
  const modal = document.createElement('div');
  modal.className = 'modal';
  fieldSize = changeFieldSize();
  console.log(fieldSize);
  for (let i = 0; i < fieldSize; i += 1) {
    const button = document.createElement('button');
    button.className = 'button';
    field.append(button);
  }
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  div.append(field);
  wrapper.append(div);
  wrapper.append(modal);
  body.append(overlay);
  body.append(wrapper);
}

// Цвета цифр

export function addColorNumbers(number, cell) {
  if (number === 1) {
    cell.style.color = 'red';
  } else if (number === 2) {
    cell.style.color = 'blue';
  } else if (number === 3) {
    cell.style.color = 'orange';
  } else if (number === 4) {
    cell.style.color = 'green';
  } else if (number === 5) {
    cell.style.color = 'yellow';
  } else if (number === 6) {
    cell.style.color = 'brown';
  } else if (number === 7) {
    cell.style.color = 'pink';
  } else if (number === 8) {
    cell.style.color = 'purple';
  }
}
export function addLevels() {
  const title = document.createElement('h1');
  title.textContent = 'MINESWEEPER';
  title.className = 'title';
  const div = document.createElement('div');
  div.className = 'levels';
  const light = document.createElement('div');
  const labelLight = document.createElement('label');
  const inputLight = document.createElement('input');
  inputLight.type = 'radio';
  inputLight.name = 'level';
  inputLight.className = 'light';
  inputLight.checked = 'true';
  labelLight.textContent = 'Light';
  light.append(inputLight);
  light.append(labelLight);
  const middle = document.createElement('div');
  const labelMiddle = document.createElement('label');
  const inputMiddle = document.createElement('input');
  inputMiddle.type = 'radio';
  inputMiddle.className = 'middle';
  inputMiddle.name = 'level';
  labelMiddle.textContent = 'Middle';
  middle.append(inputMiddle);
  middle.append(labelMiddle);
  const hard = document.createElement('div');
  const labelHard = document.createElement('label');
  const inputHard = document.createElement('input');
  inputHard.type = 'radio';
  inputHard.className = 'hard';
  inputHard.name = 'level';
  labelHard.textContent = 'Hard';
  hard.append(inputHard);
  hard.append(labelHard);
  const countMines = document.createElement('div');
  countMines.className = 'count-mines';
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Count of mines (10 - 99):';
  const inputMines = document.createElement('input');
  inputMines.type = 'text';
  inputMines.value = '10';
  inputMines.className = 'count';
  const button = document.createElement('button');
  button.className = 'button-game';
  button.textContent = 'New game';
  countMines.append(titleLabel);
  countMines.append(inputMines);
  div.append(light);
  div.append(middle);
  div.append(hard);
  div.append(countMines);
  div.append(button);
  wrapper.append(div);
  body.append(wrapper);
  body.append(title);
}
export function changeFieldSize() {
  const levelLight = document.querySelector('.light');
  const levelMiddle = document.querySelector('.middle');
  const levelHard = document.querySelector('.hard');
  if (levelLight.checked) {
    width = 10;
    height = 10;
    return width * height;
  }
  if (levelMiddle.checked) {
    width = 15;
    height = 15;
    return width * height;
  }
  if (levelHard.checked) {
    width = 25;
    height = 25;
    return width * height;
  }
}
const countMines = document.querySelector('.count');
countMines.addEventListener('keypress', setBomb);
function setBomb(event) {
  if (event.code === 'Enter') {
    console.log(event.code);
    localStorage.setItem('bomb', countMines.value);
    countMines.value = localStorage.getItem('bomb');
    startGame();
    countMines.blur();
  }
}
function getBomb() {
  countMines.value = localStorage.getItem('bomb');
}
window.addEventListener('load', getBomb);
export function reloadGame() {
  const field = document.querySelector('.field');
  const buttons = field.querySelectorAll('button');
  const timer = document.querySelector('.timer');
  const score = document.querySelector('.score');
  buttons.forEach(item => {
    item.className = 'button';
    item.classList.remove('open-ceill');
    item.style.color = 'none';
    item.disabled = false;
    item.textContent = '';
    window.clearInterval(window.timerId);
    timer.textContent = '00:00';
    score.textContent = '0';
  });
}