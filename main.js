/* eslint-disable import/extensions */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import {
  engLower, engUpper, engShift, engShiftLower, rusLower,
  rusUpper, rusShift, rusShiftLower, charKeys, keyCodes,
} from './extentions/layouts.js';

const body = document.querySelector('body');

// element creation
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';

const input = document.createElement('textarea');
input.className = 'text-area';
input.rows = 5;
input.cols = 50;

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

const row1 = document.createElement('div');
row1.className = 'row';

const row2 = document.createElement('div');
row2.className = 'row';

const row3 = document.createElement('div');
row3.className = 'row';

const row4 = document.createElement('div');
row4.className = 'row';

const row5 = document.createElement('div');
row5.className = 'row';

const keys = [];
for (let i = 0; i < 57; ++i) {
  keys[i] = document.createElement('button');
  keys[i].className = 's-key';
}

const backspace = document.createElement('button');
backspace.className = 'backspace';

const tab = document.createElement('button');
tab.className = 'tab';

const caps = document.createElement('button');
caps.className = 'caps';

const enter = document.createElement('button');
enter.className = 'enter';

const shift = document.createElement('button');
shift.className = 'shift';

const shiftR = document.createElement('button');
shiftR.className = 'shift-r';

const space = document.createElement('button');
space.className = 'space';

// first row
for (let i = 0; i < 13; ++i) {
  row1.appendChild(keys[i]);
}
row1.appendChild(backspace);
keyboard.appendChild(row1);

// second row
row2.appendChild(tab);
for (let i = 13; i < 27; ++i) {
  row2.appendChild(keys[i]);
}
keyboard.appendChild(row2);

// third row
row3.appendChild(caps);
for (let i = 27; i < 38; ++i) {
  row3.appendChild(keys[i]);
}
row3.appendChild(enter);
keyboard.appendChild(row3);

// fourth row
row4.appendChild(shift);
for (let i = 38; i < 49; ++i) {
  row4.appendChild(keys[i]);
}
row4.appendChild(shiftR);
keyboard.appendChild(row4);

// fith row
for (let i = 49; i < 52; ++i) {
  row5.appendChild(keys[i]);
}
row5.appendChild(space);
for (let i = 52; i < 57; ++i) {
  row5.appendChild(keys[i]);
}
keyboard.appendChild(row5);

// header
const header = document.createElement('h1');
header.innerText = 'RSS Virtual Keyboard';
header.className = 'title';

// Tooltip
const tooltip = document.createElement('h3');
tooltip.innerText = 'This keyboard was created for Windows OS\nTo switch language, press left Ctrl + left Shift';
tooltip.className = 'tooltip';

wrapper.appendChild(header);
wrapper.appendChild(input);
wrapper.appendChild(keyboard);
wrapper.appendChild(tooltip);
body.appendChild(wrapper);

let current = engLower;
let currentLang = 'eng';
let prev = [];
let currentLower = engLower;
let currentUpper = engUpper;
let currentShift = engShift;
let currentShiftLower = engShiftLower;
let langSwitch = false;

function lang() {
  if (currentLang === 'eng') {
    current = rusLower;
    if (prev === engLower) {
      prev = rusLower;
    } else {
      prev = rusUpper;
    }
    currentLang = 'rus';
    currentLower = rusLower;
    currentUpper = rusUpper;
    currentShift = rusShift;
    currentShiftLower = rusShiftLower;
  } else {
    if (prev === rusLower) {
      prev = engLower;
    } else {
      prev = engUpper;
    }
    current = engLower;
    currentLang = 'eng';
    currentLower = engLower;
    currentUpper = engUpper;
    currentShift = engShift;
    currentShiftLower = engShiftLower;
  }
}

function langLoad() {
  if (currentLang === 'rus') {
    current = rusLower;
    if (prev === engLower) {
      prev = rusLower;
    } else {
      prev = rusUpper;
    }
    currentLang = 'rus';
    currentLower = rusLower;
    currentUpper = rusUpper;
    currentShift = rusShift;
    currentShiftLower = rusShiftLower;
  } else {
    if (prev === rusLower) {
      prev = engLower;
    } else {
      prev = engUpper;
    }
    current = engLower;
    currentLang = 'eng';
    currentLower = engLower;
    currentUpper = engUpper;
    currentShift = engShift;
    currentShiftLower = engShiftLower;
  }
}

const buttons = document.getElementsByTagName('button');

const text = document.querySelector('.text-area');

for (let i = 0; i < buttons.length; ++i) {
  // eslint-disable-next-line no-loop-func
  buttons[i].addEventListener('mousedown', () => {
    if (i === 54 || i === 63 || i === 59) {
      body.dispatchEvent(new KeyboardEvent('keydown', { key: current[i], location: 2 }));
    } else if (i === 42 || i === 55 || i === 58) {
      body.dispatchEvent(new KeyboardEvent('keydown', { key: current[i], location: 1 }));
    } else {
      body.dispatchEvent(new KeyboardEvent('keydown', { key: current[i] }));
    }
  });
}

function keyRender() {
  for (let i = 0; i < 64; ++i) {
    buttons[i].innerText = current[i];
  }
}
keyRender();

function setLocalStorage() {
  localStorage.setItem('lang', currentLang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    currentLang = localStorage.getItem('lang');
    langLoad();
    keyRender();
  }
}
window.addEventListener('load', getLocalStorage);

for (let i = 0; i < buttons.length; ++i) {
  buttons[i].addEventListener('mouseup', () => {
    if (i === 54 || i === 63 || i === 59) {
      body.dispatchEvent(new KeyboardEvent('keyup', { key: current[i], location: 2 }));
    } else if (i === 42 || i === 55 || i === 58) {
      body.dispatchEvent(new KeyboardEvent('keyup', { key: current[i], location: 1 }));
    } else {
      body.dispatchEvent(new KeyboardEvent('keyup', { key: current[i] }));
    }
  });
}

text.focus();

let shiftFlag = true;

text.addEventListener('blur', () => text.focus());
text.value = 'This is a test';

body.addEventListener('keydown', (e) => {
  e.preventDefault();
  text.focus();
  if (charKeys.includes(e.keyCode)) {
    buttons[keyCodes.indexOf(e.keyCode)].classList.add('active');
    const cursor = text.selectionEnd;
    text.value = text.value.substr(0, text.selectionEnd)
      + current[keyCodes.indexOf(e.keyCode)] + text.value.substr(text.selectionEnd);
    text.setSelectionRange(cursor + 1, cursor + 1);
  } else {
    if (e.keyCode === 20) {
      buttons[29].classList.toggle('active');
      if (current === currentLower) {
        current = currentUpper;
      } else if (current === currentUpper)current = currentLower;
      keyRender();
    }
    if (e.keyCode === 18 && e.location === 1)buttons[57].classList.add('active');
    if (e.keyCode === 18 && e.location === 2)buttons[59].classList.add('active');
    if (e.keyCode === 16 && e.location === 1) {
      buttons[42].classList.add('active');
      if (shiftFlag) {
        prev = current;
        if (current === currentLower) {
          current = currentShift;
        } else {
          current = currentShiftLower;
        }
        keyRender();
        shiftFlag = false;
      }
    }
    if (e.keyCode === 16 && e.location === 1 && e.ctrlKey) {
      if (!langSwitch) {
        lang();
        keyRender();
        langSwitch = true;
      }
    }
    if (e.keyCode === 16 && e.location === 2) {
      buttons[54].classList.add('active');
      if (shiftFlag) {
        prev = current;
        if (current === currentLower) {
          current = currentShift;
        } else {
          current = currentShiftLower;
        }
        keyRender();
        shiftFlag = false;
      }
    }
    if (e.keyCode === 46)buttons[28].classList.add('active');
    if ((e.keyCode === 17 || e.key === 'Ctrl') && e.location === 1)buttons[55].classList.add('active');
    if ((e.keyCode === 17 || e.key === 'Ctrl') && e.location === 2)buttons[63].classList.add('active');
    if (e.keyCode === 91)buttons[56].classList.add('active');
    if (e.keyCode === 37 || e.key === '◄') {
      buttons[60].classList.add('active');
      text.setSelectionRange(text.selectionEnd - 1, text.selectionEnd - 1);
    }
    if (e.keyCode === 40 || e.key === '▼') {
      buttons[61].classList.add('active');
      text.setSelectionRange(text.selectionEnd + 98, text.selectionEnd + 98);
    }
    if (e.keyCode === 39 || e.key === '►') {
      buttons[62].classList.add('active');
      text.setSelectionRange(text.selectionEnd + 1, text.selectionEnd + 1);
    }
    if (e.keyCode === 38 || e.key === '▲') {
      buttons[53].classList.add('active');
      text.setSelectionRange(text.selectionEnd - 98, text.selectionEnd - 98);
    }
    if (e.keyCode === 46 || e.key === 'Del') {
      buttons[28].classList.add('active');
      const cursor = text.selectionEnd;
      text.value = text.value.substr(0, text.selectionEnd)
        + text.value.substr(text.selectionEnd + 1);
      text.setSelectionRange(cursor, cursor);
    }
    if (e.keyCode === 8) {
      buttons[13].classList.add('active');
      const cursor = text.selectionEnd;
      text.value = text.value.substr(0, text.selectionEnd - 1)
        + text.value.substr(text.selectionEnd);
      text.setSelectionRange(cursor - 1, cursor - 1);
    }
    if (e.keyCode === 13) {
      buttons[41].classList.add('active');
      const cursor = text.selectionEnd;
      text.value = `${text.value.substr(0, text.selectionEnd)}\n${text.value.substr(text.selectionEnd)}`;
      text.setSelectionRange(cursor + 1, cursor + 1);
    }
    if (e.keyCode === 9) {
      buttons[14].classList.add('active');
      const cursor = text.selectionEnd;
      text.value = `${text.value.substr(0, text.selectionEnd)}    ${text.value.substr(text.selectionEnd)}`;
      text.setSelectionRange(cursor + 4, cursor + 4);
    }
  }
}, false);

body.addEventListener('keyup', (e) => {
  if (charKeys.includes(e.keyCode)) {
    buttons[keyCodes.indexOf(e.keyCode)].classList.remove('active');
  } else {
    if (e.keyCode === 18 && e.location === 1)buttons[57].classList.remove('active');
    if (e.keyCode === 18 && e.location === 2)buttons[59].classList.remove('active');
    if (e.keyCode === 16 && e.location === 1) {
      buttons[42].classList.remove('active');
      current = prev;
      keyRender();
      shiftFlag = true;
    }
    if (e.keyCode === 16 && e.location === 1 && e.ctrlKey) {
      langSwitch = false;
    }
    if (e.keyCode === 16 && e.location === 2) {
      buttons[54].classList.remove('active');
      current = prev;
      keyRender();
      shiftFlag = true;
    }
    if (e.keyCode === 46)buttons[28].classList.remove('active');
    if (e.keyCode === 17 && e.location === 1)buttons[55].classList.remove('active');
    if (e.keyCode === 17 && e.location === 2)buttons[63].classList.remove('active');
    if (e.keyCode === 91)buttons[56].classList.remove('active');
    if (e.keyCode === 37)buttons[60].classList.remove('active');
    if (e.keyCode === 40)buttons[61].classList.remove('active');
    if (e.keyCode === 39)buttons[62].classList.remove('active');
    if (e.keyCode === 38)buttons[53].classList.remove('active');
    if (e.keyCode === 13)buttons[41].classList.remove('active');
    if (e.keyCode === 8)buttons[13].classList.remove('active');
    if (e.keyCode === 9)buttons[14].classList.remove('active');
  }
  e.preventDefault();
});
