import { addColorNumbers } from "../index";
import { arrayResults, seconds } from "./startGame";

const body = document.querySelector('body');

export function saveGame() {
  const field = document.querySelector('.field');
  const cells = [...field.children];
  const time = document.querySelector('.timer');
  const clicks = document.querySelector('.score');
  const countFlags = document.querySelector('.count-flags');
  const counterMines = document.querySelector('.count-bombs');
  const levelLight = document.querySelector('.light');
  const levelMiddle = document.querySelector('.middle');
  const levelHard = document.querySelector('.hard');
  let arr = [];
  let arrText =[];
  let arrDisabled = [];

for (let i = 0; i < cells.length; i += 1) {
    arr.push(cells[i].className);
    arrText.push(cells[i].textContent);
    if (cells[i].disabled) {
      arrDisabled.push(true)
    } else {
      arrDisabled.push(false)
    }
}
localStorage.setItem('gameArr', arr);
localStorage.setItem('textGame', arrText);
localStorage.setItem('disable', arrDisabled);
localStorage.setItem('seconds', seconds);
localStorage.setItem('clicks', clicks.textContent);
localStorage.setItem('flags', countFlags.textContent);
localStorage.setItem('counterMines', counterMines.textContent);
localStorage.setItem('theme', body.className);
localStorage.setItem('light', levelLight.className);
localStorage.setItem('middle', levelMiddle.className);
localStorage.setItem('hard', levelHard.className);
localStorage.setItem('time', time.textContent);
}

export function getSavingGame() {
  const field = document.querySelector('.field');
  const cells = [...field.children];
  const time = document.querySelector('.timer');
  const clicks = document.querySelector('.score');
  const countFlags = document.querySelector('.count-flags');
  const countMines = document.querySelector('.count-mines');
  const counterMines = document.querySelector('.count-bombs');
  const levelLight = document.querySelector('.light');
  const levelMiddle = document.querySelector('.middle');
  const levelHard = document.querySelector('.hard');

  let newArr = localStorage.getItem('gameArr').split(',');
  let newText = localStorage.getItem('textGame').split(',');
  clicks.textContent = localStorage.getItem('clicks') ? localStorage.getItem('clicks') : '0';
  
  countFlags.textContent = localStorage.getItem('flags') ? localStorage.getItem('flags') : 0;
  counterMines.textContent = localStorage.getItem('counterMines') ? localStorage.getItem('counterMines') : '10';
  countMines.value = localStorage.getItem('bomb') ? localStorage.getItem('bomb') : '10';
  body.className = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-theme';
  if (localStorage.getItem('theme') === 'dark-theme') {
    document.querySelector('input[type = checkbox]').checked = false;
  }
  levelLight.className = localStorage.getItem('light') ? localStorage.getItem('light') : 'light active';
  levelMiddle.className = localStorage.getItem('middle') ? localStorage.getItem('middle') : 'middle';
  levelHard.className = localStorage.getItem('hard') ? localStorage.getItem('hard') : 'hard';
  time.textContent = localStorage.getItem('time') ? localStorage.getItem('time') : '000';

  let arrDisabled = localStorage.getItem('disable').split(',');

  for (let i = 0; i < newArr.length; i += 1) {
    if (localStorage.getItem('gameArr')) {
      cells[i].className = newArr[i];
      cells[i].textContent = newText[i];
      addColorNumbers(newText[i], cells[i]);
      if (arrDisabled[i] === 'true') {
        cells[i].disabled = true;
      } else {
        cells[i].disabled = false;
      }
    } else {
      cells[i].className = 'button';
    }
  }
}

function saveResults() {
  const countMines = document.querySelector('.count');
  const countClicks = document.querySelector('.score');
  const levelLight = document.querySelector('.light');
  const levelMiddle = document.querySelector('.middle');
  const levelHard = document.querySelector('.hard');
  let objResults = {};
  if (levelLight.classList.contains('active')) {
    objResults.level = 'easy';
  } else if (levelMiddle.classList.contains('active')) {
    objResults.level = 'medium';
  } else if (levelHard.classList.contains('active')) {
    objResults.level = 'hard';
  }
  objResults.mines = countMines.value;
  objResults.time = seconds;
  objResults.clicks = countClicks.textContent;
  if (arrayResults.length === 10) {
    arrayResults.shift();
    arrayResults.push(objResults);
  } else {
    arrayResults.push(objResults);
  }
  localStorage.setItem('arrResults', JSON.stringify(arrayResults));
}

export {saveResults}



