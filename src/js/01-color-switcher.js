const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.body,
};
let getTimeoutID = null;
isToggleDisabled(refs.stopBtn, true);

refs.startBtn.addEventListener('click', onStartClick);

refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  getTimeoutID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    isToggleDisabled(refs.startBtn, true);
    isToggleDisabled(refs.stopBtn, false);
  }, 1000);
}

function onStopClick() {
  clearInterval(getTimeoutID);
  isToggleDisabled(refs.startBtn, false);
  isToggleDisabled(refs.stopBtn, true);
}

function isToggleDisabled(refs, param) {
  refs.disabled = param;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
