// Подключение функционала
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener("click", documentActions);
function documentActions(e) {
    const targetElement = e.target;

    // Показ выпадающего меню с языками
    if (targetElement.classList.contains('language__link') || targetElement.closest('.language__link')) {
        e.preventDefault();
        document.querySelector('.language__menu').classList.toggle('_active');
    } else if (!targetElement.closest('.language__menu') && document.querySelector('.language__menu._active')) {
        document.querySelector('.language__menu').classList.remove('_active');
    } else {
        document.querySelector('.language__menu').classList.remove('_active');
    }
    // Показ выпадающего меню с языками
}

// Настройки fancybox
Fancybox.bind("[data-fancybox]", {
    autoFocus: false
});

// Отступ main из-за фиксированной шапки
const header = document.querySelector('.header');
const main = document.querySelector('.page');
const headerOffset = header.offsetHeight + 'px';
main.style.paddingTop = headerOffset;

document.addEventListener("scroll", function (e) {
    const scrollTop = window.scrollY;

    if (scrollTop > 120) {
        header.classList.add('_header-scroll');
        const headerOffset = header.offsetHeight + 'px';
        main.style.paddingTop = headerOffset;
    } else {
        header.classList.remove('_header-scroll');
        const headerOffset = header.offsetHeight + 'px';
        main.style.paddingTop = headerOffset;
    }
})

const cookie = document.getElementById("cookie");
const cookieClose = document.querySelector('.cookie__btn .popup-link');

cookieClose.addEventListener('click', function (e) {
    Fancybox.destroy();
    localStorage.setItem('cookieconsent', true);
    e.preventDefault();
})


if (!localStorage.getItem('cookieconsent')) {
    setTimeout(() => {
        Fancybox.show(
            [
                {
                    type: "html",
                    src: cookie,
                }
            ],
            {
                mainClass: "cookie-wrapper",
                autoFocus: false,
                touch: false,
            }
        )
    }, 3000);
}