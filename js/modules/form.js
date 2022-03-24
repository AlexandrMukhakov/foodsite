import {closeModal, openModal} from "./modalWindow";
import {postData} from "../servise/servises";

function form(formSelector, openModalForTime) {

    const forms = document.querySelectorAll(formSelector);

    const messege = {
        loading: "Загрузка",
        success: "Спасибо мы с вами свяжемся",
        fals: "Что-то пошло не так"
    };



    forms.forEach(item => {
        bindPostForm(item);
    });

    function bindPostForm(form) {

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let messegText = document.createElement("div");
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
        openModal(".modal", openModalForTime);

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
            closeModal(".modal");
        }, 4000);
    }
}

export default form;