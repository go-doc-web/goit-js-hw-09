import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
};

let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.disabled = false;
    if (selectedDates[0] <= options.defaultDate) {
      refs.startBtn.disabled = true;
      alert('Please choose a date in the future');
      return;
    }
    selectDate = selectedDates[0].getTime();
  },
};

const fp = flatpickr('input#datetime-picker', options);
// let selectDate = fp.selectedDates[0];

refs.startBtn.addEventListener('click', () => {
  setInterval(() => {
    const now = selectDate - Date.now();
    const update = convertMs(now);
    console.log(update);
    render(update);
  }, 1000);
});

function render({ days, hours, minutes, seconds }) {
  refs.valueDays.textContent = days;
  refs.valueHours.textContent = hours;
  refs.valueMinutes.textContent = minutes;
  refs.valueSeconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(14000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}