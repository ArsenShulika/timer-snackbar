// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.getElementById('datetime-picker');
const btn = document.querySelector('[data-start="start"]');

const setDays = document.querySelector('[data-days]');
const setHours = document.querySelector('[data-hours]');
const setMinutes = document.querySelector('[data-minutes]');
const setSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   btn.setAttribute('disabled', 'true');
    btn.disabled = true;
    if (selectedDates.length === 0) return;

    userSelectedDate = selectedDates[0];

    if (userSelectedDate.getTime() > Date.now()) {
      btn.disabled = false;
      console.log(selectedDates[0]);
    } else {
      iziToast.error({
        title: 'Alert',
        message: '"Please choose a date in the future"',
        position: 'topRight',
      });
    }
  },
};

flatpickr(input, options);

let intervalId = null;

btn.addEventListener('click', handleStart);

function handleStart(e) {
  const initTime = userSelectedDate;
  btn.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = initTime - currentTime;

    if (diff <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
      return;
    } else {
      const { days, hours, minutes, seconds } = convertMs(diff);

      setDays.textContent = days;
      setHours.textContent = hours;
      setMinutes.textContent = minutes;
      setSeconds.textContent = seconds;
    }
  }, 1000);
}

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');

  // Remaining hours
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');

  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
};

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
