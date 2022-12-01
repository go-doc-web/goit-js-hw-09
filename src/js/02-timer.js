import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
};

startBtnToglle();

let intervalID = null;
let deltaTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtnToglle();
  },
};

const fp = flatpickr('input#datetime-picker', options);

const timer = {
  start() {
    const selectDate = fp.selectedDates[0].getTime();

    intervalID = setInterval(() => {
      const currentTime = Date.now();
      deltaTime = selectDate - currentTime;
      const timeComponents = convertMs(deltaTime);
      console.log(deltaTime);

      console.log(timeComponents);
      if (deltaTime <= 1000) {
        clearInterval(intervalID);

        Notify.info('Happy End!!!');
      }
      render(timeComponents);
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
  startBtnToglle();
  Notify.success('Timer GO!');
});

function render({ days, hours, minutes, seconds }) {
  refs.valueDays.textContent = days;
  refs.valueHours.textContent = hours;
  refs.valueMinutes.textContent = minutes;
  refs.valueSeconds.textContent = seconds;
}

function addLeadingZero(value, num) {
  return String(value).padStart(num, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const daysNum = Math.floor(ms / day);
  let days = '';

  if (daysNum >= 0 && daysNum < 100) {
    days = addLeadingZero(daysNum, 2);
  } else {
    days = addLeadingZero(daysNum, 3);
  }
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour), 2);
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute), 2);
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second),
    2
  );

  return { days, hours, minutes, seconds };
}

function startBtnToglle() {
  const isDisabledBtn = refs.startBtn.hasAttribute('disabled');
  if (isDisabledBtn) {
    refs.startBtn.removeAttribute('disabled');
  } else {
    refs.startBtn.setAttribute('disabled', true);
  }
}
