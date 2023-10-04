import './index.html';
import './style.css';
import { startGame } from './modules/startGame';
import flagImg from './assets/image/Flag-red_37145.png';
import bombImg from './assets/image/icons8-бомба-25.png';
import { saveGame, getSavingGame } from './modules/savingGame';
import volumeIcon from './assets/image/volum.png';

// Создаем внешний вид игры

const body = document.querySelector('body');
const container = document.createElement('div');
container.className = 'container';
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
const div = document.createElement('div');
div.className = 'minesweeper';
const scoreboard = document.createElement('div');
  scoreboard.className = 'scoreboard';
let width = 10;
let height = 10;
let fieldSize = 10;

let countClick = 0;
let field = document.createElement('div');
field.className = 'field';


  addLevels();
  createField();
  startGame();

const buttonGame = document.querySelector('.button-game');

buttonGame.addEventListener('click', reloadGame);
window.addEventListener('resize', changeLevel);

function changeLevel() {
  const levelLight = document.querySelector('.light');
  const levelMiddle = document.querySelector('.middle');
  const levelHard = document.querySelector('.hard');
  field.innerHTML = '';
  if (levelLight.classList.contains('active')) {
    width = 10;
    height = 10;
    fieldSize = width * height;
    
    createButtons(fieldSize)
    field.classList.remove('hard-level');
    field.classList.remove('middle-level')
    field.className = 'field';
  } else if (levelMiddle.classList.contains('active')) {
    width = 15;
    height = 15;
    field.classList.remove('hard-level');
    field.classList.add('middle-level');
    fieldSize = width * height;
    createButtons(fieldSize)
  } else if (levelHard.classList.contains('active')) {
    width = 25;
    height = 25;
    field.classList.remove('middle-level');
    field.classList.add('hard-level');
    fieldSize = width * height;
    createButtons(fieldSize)
  }
  let divWidth;
  
  if (window.screen.width >= 1200) {
    divWidth = 0.28 * window.screen.width;
  } else if (window.screen.width < 1200 && window.screen.width >= 1000) {
    divWidth = 0.5 * window.screen.width;
  } else if (window.screen.width < 1000 && window.screen.width >= 800) {
    divWidth = 0.64 * window.screen.width;
  } else if (window.screen.width < 800 && window.screen.width >= 600) {
    divWidth = 0.92 * window.screen.width;
  } else if (window.screen.width < 600) {
    divWidth = 0.9 * window.screen.width;
  }
    div.style.width = `${divWidth}px`;
    let fieldWidth = window.screen.width >= 1200 ? divWidth * 0.89 : divWidth * 0.9;
    field.style.gridTemplateColumns = `repeat(${width}, calc(${fieldWidth}px / ${width}))`;
    reloadGame();
    return field
}

function createButtons(fieldSize) {
  let divWidth;
  let fieldWidth;
  if (window.screen.width >= 1200) {
    divWidth = 0.28 * window.screen.width;
  } else if (window.screen.width < 1200 && window.screen.width >= 1000) {
    divWidth = 0.5 * window.screen.width;
  } else if (window.screen.width < 1000 && window.screen.width >= 800) {
    divWidth = 0.64 * window.screen.width;
  } else if (window.screen.width < 800 && window.screen.width >= 600) {
    divWidth = 0.92 * window.screen.width;
  } else if (window.screen.width < 600) {
    divWidth = 0.9 * window.screen.width;
  }
  fieldWidth = window.screen.width >= 1200 ? divWidth * 0.89 : divWidth * 0.9;
  div.style.width = `${divWidth}px`;
  for (let i = 0; i < fieldSize; i += 1) {
    const button = document.createElement('button');
    button.className = 'button';
    button.style.width = `calc(${fieldWidth}px / ${width})`;
    button.style.height = `calc(${fieldWidth}px / ${width})`;
    field.append(button);
  }
}

function createField() {
  const timer = document.createElement('div');
  timer.className = 'timer';
  timer.textContent = '000';
  scoreboard.append(timer);
  const divCounter = document.createElement('div');
  const counterFlags = createCounterFlags();
  const counterBombs = createCounterMines();
  divCounter.append(counterFlags)
  divCounter.append(counterBombs)
  scoreboard.append(divCounter);

  const score = document.createElement('div');
  score.className = 'score';
  score.textContent = countClick;
  scoreboard.append(score);

  div.append(scoreboard);

  const modal = document.createElement('div');
  modal.className = 'modal';
  if (field !== 'undefined') {
    field = addButtons();
  }
  const levels = document.querySelectorAll('.levels button');
  window.addEventListener('load', changeLevel)
  for (let level of levels) {
    level.addEventListener('click', () => {
      levels.forEach((item) => item.classList.remove('active'));
      level.classList.toggle('active');
      field = changeLevel();
    })
  }
  const modalResults = createTableResults();
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  div.append(field);
  wrapper.append(div);
  wrapper.append(modal);
  wrapper.append(modalResults);
  container.append(overlay);
  container.append(wrapper);
  body.append(container);
}

// Цвета цифр

export function addColorNumbers(number, cell) {
  if (number == 1) {
    cell.style.color = 'red';
  } else if (number == 2) {
    cell.style.color = 'blue';
  } else if (number == 3) {
    cell.style.color = 'orange';
  } else if (number == 4) {
    cell.style.color = 'green';
  } else if (number == 5) {
    cell.style.color = 'yellow';
  } else if (number == 6) {
    cell.style.color = 'white';
  } else if (number == 7) {
    cell.style.color = 'pink';
  } else if (number == 8) {
    cell.style.color = 'purple';
  }
}

function addLevels() {
  const title = document.createElement('h1');
  title.textContent = 'MINESWEEPER';
  title.className = 'title';
  const switcher = createSwitherTheme();
  const volumeBtn = createVolumeSwitcher();
  const levelsWrapper = document.createElement('div');
  levelsWrapper.className = 'levels-wrapper';
  const div = document.createElement('div');
  div.className = 'levels';
  const light = document.createElement('button');
  light.className = localStorage.getItem('light') ? localStorage.getItem('light') :  'light active';
  light.textContent = 'Easy';
  const middle = document.createElement('button');
  middle.className = localStorage.getItem('middle') ? localStorage.getItem('middle') :  'middle';
  middle.textContent = 'Medium';
  const hard = document.createElement('button');
  hard.className = localStorage.getItem('hard') ? localStorage.getItem('hard') :  'hard';
  hard.textContent = 'Hard';
  const countMines = document.createElement('div');
  countMines.className = 'count-mines';
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Mines:';
  const inputMines = document.createElement('input');
  inputMines.type = 'text';
  inputMines.className = 'count';
  inputMines.value = '10';
  inputMines.textContent = inputMines.value;
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'button-wrapper';
  const button = document.createElement('button');
  button.className = 'button-game';
  button.textContent = 'New game';
  const buttonResults = document.createElement('button');
  buttonResults.className = 'button-results';
  buttonResults.textContent = 'Results';
  buttonWrapper.append(button);
  buttonWrapper.append(buttonResults);
  countMines.append(titleLabel);
  countMines.append(inputMines);
  const divLevels = document.createElement('div');
  divLevels.className = 'level-buttons';
  divLevels.append(light);
  divLevels.append(middle);
  divLevels.append(hard);
  div.append(divLevels);
  div.append(countMines);
  levelsWrapper.append(buttonWrapper);
  levelsWrapper.append(div);
  wrapper.append(levelsWrapper);
  container.append(wrapper);
  container.append(volumeBtn)
  container.append(title);
  container.append(switcher);
  body.append(container)
  }

function addButtons() {
  fieldSize = width * height;
    for (let i = 0; i < fieldSize; i += 1) {
      const button = document.createElement('button');
      button.className = 'button';
      field.append(button);
    }
    return field;
  }

  export function reloadGame() {
    const field = document.querySelector('.field');
    const buttons = field.querySelectorAll('button');
    const timer = document.querySelector('.timer');
    const score = document.querySelector('.score');
    buttons.forEach((item) => {
      item.className = 'button';
      item.classList.remove('open-ceill');
      item.style.color = 'none';
      item.disabled = false;
      item.textContent = '';
      window.clearInterval(window.timerId);
      timer.textContent = '000';
      score.textContent = '0';
    });
  }

  function createSwitherTheme() {
  const label = document.createElement('label');
  label.className = 'switch';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = true;
  const span = document.createElement('span');
  span.className = 'slider';
  span.classList.add('move');
  label.append(input);
  label.append(span);
  return label;
  }


const switcher = document.querySelector('.switch');


  function switchTheme() {
    if (document.querySelector('input[type = checkbox]').checked){
      document.body.className = 'light-theme';
    } else {
      document.body.className = 'dark-theme';
    }
  }
window.addEventListener('load', switchTheme)
 
switcher.addEventListener('change', switchTheme);

function createCounterFlags() {
  const div = document.createElement('div');
  div.className = 'wrapper-counter';
  const span = document.createElement('span');
  const img = document.createElement('img');
  img.src = flagImg;
  span.className = 'count-flags';
  span.textContent = '0';
  div.append(span);
  div.append(img);
  return div;
}

function createCounterMines() {
  const div = document.createElement('div');
  div.className = 'wrapper-counter';
  const span = document.createElement('span');
  const img = document.createElement('img');
  img.src = bombImg;
  span.className = 'count-bombs';
  span.textContent = localStorage.getItem('counterMines') ? localStorage.getItem('counterMines') : '10';
  div.append(span);
  div.append(img);
  return div;
}

window.addEventListener('beforeunload', saveGame);

window.addEventListener('load', getSavingGame)

const buttonResults = document.querySelector('.button-results');
const modalResults = document.querySelector('.modal-results');
const overlay = document.querySelector('.overlay');

buttonResults.addEventListener('click', () => {
  modalResults.classList.add('open');
  modalResults.classList.remove('fadeOut');
  modalResults.classList.add('fadeIn');
  overlay.classList.add('show');
  body.classList.add('scroll');
  getResults();
})

function closeModalResults(e) {
  if(modalResults.classList.contains('open')) {
      const modalBorders = e.composedPath().includes(modalResults);
      if(! modalBorders) {
         modalResults.classList.remove('open');
         modalResults.classList.remove('fadeIn');
         modalResults.classList.add('fadeOut');
         overlay.classList.remove('show');
         body.classList.remove('scroll');
      }
 }
}

overlay.addEventListener('click', closeModalResults);

function createTableResults() {
  const results = document.createElement('div');
  results.className = 'modal-results';
  const resultNumber = document.createElement('div');
  resultNumber.textContent = '№';
  const resultLevel = document.createElement('div');
  resultLevel.textContent = 'Level';
  const resultMines = document.createElement('div');
  resultMines.textContent = 'Mines';
  const resultTime = document.createElement('div');
  resultTime.textContent = 'Time';
  const resultClicks = document.createElement('div');
  resultClicks.textContent = 'Moves';
  results.append(resultNumber);
  results.append(resultLevel);
  results.append(resultMines);
  results.append(resultTime);
  results.append(resultClicks);
  for (let i = 1; i <= 50; i += 1) {
    const div = document.createElement('div');
    results.append(div);
  }
  return results;
}



function getResults() {
  const arrayResults = localStorage.getItem('arrResults') ? JSON.parse(localStorage.getItem('arrResults')) : 0;
  const results = document.querySelectorAll('.modal-results div');
  if (arrayResults.length === 0) {
    return
  }
  let count = 0;
  let len = results.length / 10 * arrayResults.length;
  for (let i = 5; i < len; i += 1) {
    if (i % 5 === 0) {
      results[i].textContent = count + 1;
      count++;
        results[i + 1].textContent = arrayResults[count - 1].level;
        results[i + 2].textContent = arrayResults[count - 1].mines;
        results[i + 3].textContent = arrayResults[count - 1].time;
        results[i + 4].textContent = arrayResults[count - 1].clicks;
    }
  }
}
getResults()

function createVolumeSwitcher() {
  const div = document.createElement('div');
  div.className = 'volume-btn';
  const img = document.createElement('img');
  img.className = 'volume-icon';
  img.src = volumeIcon;
  div.append(img);
  return div;
}

