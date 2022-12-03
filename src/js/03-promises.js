// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();
  let delayVal = parseInt(e.currentTarget.delay.value);
  const stepVal = parseInt(e.currentTarget.step.value);
  const amountVal = parseInt(e.currentTarget.amount.value);
  let delay = delayVal;
  for (let position = 1; position <= amountVal; position += 1) {
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += stepVal;
  }
}
function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
