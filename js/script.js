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
new MenuCard("img/tabs/vegy.jpg", 
"vegy", 
`Меню "Фитнес"`, 
`Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 
9, 
".menu .container",
).render();

new MenuCard("img/tabs/elite.jpg", 
"elite", 
`Меню “Премиум”`, 
`В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`, 
7, 
".menu .container", 
).render();

new MenuCard("img/tabs/post.jpg", 
"post", 
`Меню "Постное"`, 
`Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 
10, 
".menu .container", 
).render();



//form

const forms = document.querySelectorAll("form");


forms.forEach(item => {
    postForm(item);
});

const messege = {
    loading: "Загрузка",
    success: "Спасибо мы с вами свяжемся",
    fals: "Что-то пошло не так"
};

function postForm(form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const messegText = document.createElement("div");
        messegText.classList.add("status");
        messegText.textContent = messegText.loading;
        form.append(messegText);
        
        const formData = new FormData(form);

        const obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });


        fetch("server.php", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj)
        }).then(data => data.text())
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


fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify({name: 'Alex'}),
    headers: {
        "Content-type": "aplication/json"
    }
})
  .then(response => response.json())
  .then(json => console.log(json));








});