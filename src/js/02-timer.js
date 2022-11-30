import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputDate: document.querySelector('input#datetime-picker'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.disabled = false;
    if (selectedDates[0] <= new Date()) {
      refs.startBtn.disabled = true;
      alert('Please choose a date in the future');
    }
    //  console.log(selectedDates[0].getTime());
  },
};

flatpickr('input#datetime-picker', options);
