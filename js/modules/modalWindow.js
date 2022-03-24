function openModal(modalSelector, openModalForTime) {
    const modalContent = document.querySelector(modalSelector);
    modalContent.classList.add("show");
    modalContent.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (openModalForTime) {
        clearInterval(openModalForTime);
    }
    
}

function closeModal(modalSelector) {
    const modalContent = document.querySelector(modalSelector);
    modalContent.classList.add("hide");
    modalContent.classList.remove("show");
    document.body.style.overflow = "";
}

function modalWindow(triggerSelector, modalSelector, openModalForTime) {

    const btnModal = document.querySelectorAll(triggerSelector),
        modalContent = document.querySelector(modalSelector);


    btnModal.forEach(item => {
        item.addEventListener("click", () => openModal(modalSelector, openModalForTime));
    });

    modalContent.addEventListener("click", (e) => {
        if (e.target === modalContent || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modalContent.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalSelector, openModalForTime);
                window.removeEventListener("scroll", showModalByScroll);
            }
        });

    }

    window.addEventListener("scroll", showModalByScroll);
    
}

export default modalWindow;
export {closeModal};
export {openModal};