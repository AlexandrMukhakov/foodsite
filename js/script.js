window.addEventListener("DOMContentLoaded", () => {


    //tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

        function hideTabsContent() {
            tabsContent.forEach(item => {
                item.classList.add("hide", "fade");
                item.classList.remove("show");
            });
            tabs.forEach(item => {
                item.classList.remove("tabheader__item_active");
            });
        }

        function showTabsContent(i = 0) {
            tabsContent[i].classList.add("show", "fade");
            tabsContent[i].classList.remove("hide");
            tabs[i].classList.add("tabheader__item_active");
        }

        hideTabsContent();
        showTabsContent();

        tabsParent.addEventListener("click", (e) => {
            const target = e.target;
            if(target && target.classList.contains("tabheader__item")) {
                tabs.forEach((item, i) => {
                    if(item == target) {
                        hideTabsContent();
                        showTabsContent(i);
                    }
                });
            }
        });




        
//timer

     const deadllne = "2022-03-20";
     
     function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 *24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
     }

     function getZero(num) {
         if (num >=0 && num < 10) {
             return `0${num}`;
         }
         else {
             return num;
         }
     }

     function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timerId = setInterval(updateClock, 1000);
            updateClock();

            function updateClock() {
                const t = getTimeRemaining(endtime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
                if (t <= 0) {
                    clearInterval(timerId);
                }
            }
     }
setClock(".timer", deadllne);




//modalwindov

const btnModal = document.querySelectorAll("[data-modal]"),
     modalContent = document.querySelector(".modal");
     
     const openModalForTime = setTimeout(openModal, 50000);

     function openModal() {
         modalContent.classList.add("show");
         modalContent.classList.remove("hide");
         document.body.style.overflow = "hidden";
         const q = clearInterval(openModalForTime);
     }

     btnModal.forEach(item => {
         item.addEventListener("click", openModal);
     });

     function closeModal() {
         modalContent.classList.add("hide");
         modalContent.classList.remove("show");
         document.body.style.overflow = "";
     }


     modalContent.addEventListener("click", (e) => {
         if(e.target === modalContent || e.target.getAttribute("data-close") == "") {
             closeModal();
         }
     });

     document.addEventListener("keydown", (e) => {
         if (e.code == "Escape" && modalContent.classList.contains("show")) {
             closeModal();
         }
     });

    window.addEventListener("scroll", () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    });

    


//class foe card

class MenuCard{
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.price = price;
        this.newPrice = 27;
        this.chengePrice();
    }
    chengePrice() {
        this.price = this.price * this.newPrice;
    }
    render() {
        const element = document.createElement("div");
        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        }
        else {
            this.classes.forEach(className => element.classList.add(className));
        }
        
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>`;
        this.parent.append(element);
    }

}

const getResurs = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
        throw new Error("Ты лох");
    }
    return await res.json();
};

getResurs(`http://localhost:3000/menu`)
.then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
});


//form

const forms = document.querySelectorAll("form");


forms.forEach(item => {
    bindPostForm(item);
});

const messege = {
    loading: "Загрузка",
    success: "Спасибо мы с вами свяжемся",
    fals: "Что-то пошло не так"
};

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    });
    return await res.json();
};

function bindPostForm(form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const messegText = document.createElement("div");
        messegText.classList.add("status");
        messegText.textContent = messegText.loading;
        form.append(messegText);
        
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData("http://localhost:3000/requests", json)
        .then(data => {
            console.log(data);
            showThanksModal(messege.success);
            messegText.remove();
        }).catch(() => {
            showThanksModal(messege.fals);
        }).finally(() => {
            form.reset();
        });


    });
}

function showThanksModal(mess) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");

    thanksModal.innerHTML = `
    <div class="modal__content">
    <div class='modal__close' data-close>×</div>
    <div class="modal__title">${mess}</div>
    </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        closeModal();
    }, 4000);
}


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

//slide

const slide = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slideWraper = document.querySelector(".offer__slider-wrapper"),
    slidesFild = document.querySelector(".offer__slide__inner"),
    width = window.getComputedStyle(slideWraper).width;

  let index = 1;
  let offset = 0;

   slidesFild.style.width = 100 * slide.length + "%";
   slidesFild.style.display = "flex";
   slidesFild.style.transition = "0.5s all";
   slideWraper.style.overflow = "hidden";

   slide.forEach(item => {
    item.width = width;
   });

   slider.style.position = `relative`;
   const indicators = document.createElement("ol");
   indicators.classList.add(`carousel-indicators`);
   slider.append(indicators);
   const dots = [];

   for (let i = 0; i < slide.length; i++) {
       const dot = document.createElement("li");
       dot.classList.add("dot");
       dot.setAttribute("data-slide-to", i + 1);
       indicators.append(dot);

       if (i == 0) {
           dot.style.opacity = 1;
       }
       dots.push(dot);
   }

   if (slide.length < 10) {
       total.textContent = `0${slide.length}`;
       current.textContent = `0${index}`;
   } else {
       total.textContent = slide.length;
       current.textContent = index;
   }

   function deleteStr(str) {
        return +str.replace(/\D/g, '');
   }

   function plusZero(cur) {
    if (slide.length < 10) {
         cur.textContent = `0${index}`;
    } else {
        cur.textContent = index;
    }
   }

   function plusOne(ind) {
    if (index == ind) {
        index = 1;
    } else {
         index++;
    }
   }

   next.addEventListener("click", () => {
    if (offset == deleteStr(width) * (slide.length - 1)) {
        offset = 0;
    }else {
        offset += deleteStr(width);
    }
    slidesFild.style.transform = `translateX(-${offset}px)`;

    plusOne(slide.length);

    plusZero(current);

    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[index - 1].style.opacity = 1;
   });

   prev.addEventListener("click", () => {

    if (offset == 0) {
        offset = deleteStr(width) * (slide.length - 1);
    }
    else {
        offset -= deleteStr(width);
    }
    slidesFild.style.transform = `translateX(-${offset}px)`;

    if (index == 1) {
        index = slide.length;
    }else {
        index--;
    }

    plusZero(current);

    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[index - 1].style.opacity = 1;

   });

   dots.forEach(item => {
    item.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        index = slideTo;
        offset = deleteStr(width) * (slideTo - 1);
        slidesFild.style.transform = `translateX(-${offset}px)`;

        plusZero(current);
    
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[index - 1].style.opacity = 1;

    });
   });

   
   











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



//calc


const result = document.querySelector(".calculating__result span");
let sex, height, weight, age, ratio;

if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
} else {
    sex = "female";
    localStorage.setItem("sex", "female");
}
if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
} else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
}

function initLolalStor(selector, activClass) {
    const element = document.querySelectorAll(selector);
  element.forEach(elem => {
    elem.classList.remove(activClass);
    if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activClass);
    }
    if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activClass);
    }
  });
}
initLolalStor("#gender div", 'calculating__choose-item_active');
initLolalStor(".calculating__choose_big div", 'calculating__choose-item_active');

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = "____";
        return;
    } 
    if (sex === "female") {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }

}

calcTotal();

function getStatitInfo(selector, activClass) {
    const element = document.querySelectorAll(selector);
    element.forEach(elem => {
        elem.addEventListener("click", (e) => {
            if (elem.getAttribute("data-ratio")) {
                ratio = e.target.getAttribute("data-ratio");
                localStorage.setItem("ratio", e.target.getAttribute("data-ratio"));
            } else {
                sex = e.target.getAttribute("id");
                localStorage.setItem("sex", e.target.getAttribute("id"));
            }
            element.forEach(elem => {
                elem.classList.remove(activClass);
            });
            e.target.classList.add(activClass);
            calcTotal();
            console.log(sex, ratio);
        });
    });
}
getStatitInfo("#gender div", 'calculating__choose-item_active');
getStatitInfo(".calculating__choose_big div", 'calculating__choose-item_active');

function getDinamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
        } else {
            input.style.border = "none";
        }
        switch(input.getAttribute("id")) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }
        calcTotal();
    });
}

getDinamicInfo("#height");
getDinamicInfo("#weight");
getDinamicInfo("#age");








});