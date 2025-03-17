// // Описаний у документації
// import iziToast from 'izitoast';
// // Додатковий імпорт стилів
// import 'izitoast/dist/css/iziToast.min.css';

// const btn = document.querySelector('.btn');
// const form = document.querySelector('.form');
// const input = document.querySelector('.delay');
// const fulfilledBtn = document.querySelector('[value="fulfilled"]');

// btn.addEventListener('click', handleSubmit);

// function handleSubmit(e) {
//   e.preventDefault();
//   const delay = Number(input.value);
//   const state = fulfilledBtn.checked ? 'fulfilled' : 'rejected';

//   createPromise(delay, state)
//     .then()
//     .catch(error => error);
// }

// function createPromise(delay, state) {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (state === 'fulfilled') {
//         resolve(
//           iziToast.success({
//             title: 'OK',
//             message: `✅ Fulfilled promise in ${delay}ms`,
//           })
//         );
//       } else {
//         reject(
//           iziToast.error({
//             title: 'Error',
//             message: `❌ Rejected promise in ${delay}ms`,
//           })
//         );
//       }
//     }, delay);
//   });
//   return promise;
// }

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements.delay.value;
  const delay = Number(delayInput);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
