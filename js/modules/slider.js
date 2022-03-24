function slider({container, sliders, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    //slide

    const slide = document.querySelectorAll(container),
        slider = document.querySelector(sliders),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slideWraper = document.querySelector(wrapper),
        slidesFild = document.querySelector(field),
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
        } else {
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
        } else {
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
}

export default slider;