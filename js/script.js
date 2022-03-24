import tabs from "./modules/tabs";
    import timer from "./modules/timer";
    import cards from "./modules/cards";
    import calc from "./modules/calc";
    import form from "./modules/form";
    import modalWindow, { openModal } from "./modules/modalWindow";
    import slider from "./modules/slider";

window.addEventListener("DOMContentLoaded", () => {

const openModalForTime = setTimeout(() => openModal(".modal", openModalForTime), 5000000);

tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
timer(".timer", "2022-04-20");
cards();
calc();
form("form", openModalForTime);
modalWindow("[data-modal]", ".modal", openModalForTime);
slider({
    container: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    sliders: ".offer__slider",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slide__inner"
});


// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {
//         "Content-type": "aplication/json"
//     }
// })
//   .then(response => response.json())
//   .then(json => console.log(json));


// fetch(`http://localhost:3000/menu`)
// .then(data => data.json())
// .then(res => console.log(res));








//   showSlide(index);

//   if (slide.length < 10) {
//       total.textContent = `0${slide.length}`;
//   } else {
//       total.textContent = slide.length;
//   }

//   function showSlide(n) {
//       if (n > slide.length) {
//           index = 1;
//       }
//       if (n < 1) {
//           index = slide.length;
//       }

//       slide.forEach(item => {
//         item.classList.add("hide");
//         item.classList.remove("show");
//       });
//       slide[index - 1].classList.add("show");
//       slide[index - 1].classList.remove("hide");

//       if (slide.length < 10) {
//           current.textContent = `0${index}`;
//       } else {
//           current.textContent = index;
//       }
//   }

//   function plusSlide(n) {
//       showSlide(index += n);
//   }

//   prev.addEventListener("click", () => {
//     plusSlide(-1);
//   });
//   next.addEventListener("click", () => {
//     plusSlide(1);
//   });




});