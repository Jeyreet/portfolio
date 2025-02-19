import {HeroTitleAnimator} from "./header_title_animator.js";

const headerEl = document.querySelector('[data-js-header]')
const menuOpenButtonEl = document.querySelector('[data-js-menu-open-button]')
const heroTitleEl = document.querySelector('[data-js-hero-title]')
const heroNotebookCodeElArr = document.querySelectorAll('.notebook__code')
const heroTitleAnimator = new HeroTitleAnimator(heroTitleEl)
const heroTitleTextArr = [
    'Здесь будет меняться какой-нибудь анимированный текст',
    'Короткий текст',
    'Длинный текст длинный текст длинный текст длинный текст длинный текст',
]

let heroTitleTextNum = 0

const writeHeroTitleText = async () => {
    await heroTitleAnimator.write(heroTitleTextArr[heroTitleTextNum])

    setTimeout(() => {
        if (++heroTitleTextNum === heroTitleTextArr.length) {
            heroTitleTextNum = 0
        }
        writeHeroTitleText()
    }, 2000)
}

let heroNotebookCodeNum = 0

const animateHeroNotebookCode = async () => {
    heroNotebookCodeElArr[heroNotebookCodeNum].classList.add('shown')

    setTimeout(() => {
        if (++heroNotebookCodeNum < heroNotebookCodeElArr.length) {
            animateHeroNotebookCode()
        }
    }, 30)
}

menuOpenButtonEl.onclick = () => {
    headerEl.classList.toggle('open');
}

setTimeout(() => { document.body.classList.add('loaded') }, 500)
setTimeout(writeHeroTitleText, 1500)
setTimeout(animateHeroNotebookCode, 3200)