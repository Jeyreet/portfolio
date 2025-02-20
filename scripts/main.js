import {HeroTitleAnimator} from "./header_title_animator.js"

function updateBackgroundParallax() {
    bodyEl.style.setProperty('--backgroundParallax', -Number(documentEl.scrollTop / 2) + 'px')
}

async function writeHeroTitleText() {
    await heroTitleAnimator.write(heroTitleTextArr[heroTitleTextNum])
    await heroTitleAnimator.hide(heroTitleTextArr[heroTitleTextNum])

    setTimeout(() => {
        if (++heroTitleTextNum === heroTitleTextArr.length) {
            heroTitleTextNum = 0
        }
        writeHeroTitleText()
    }, 2000)
}

function animateHeroNotebookCode() {
    heroNotebookCodeElArr[heroNotebookCodeNum].classList.add('shown')

    setTimeout(() => {
        if (++heroNotebookCodeNum < heroNotebookCodeElArr.length) {
            animateHeroNotebookCode()
        }
    }, 30)
}

const documentEl = document.documentElement
const bodyEl = document.body;


const headerEl = document.querySelector('[data-js-header]')
const menuOpenButtonEl = document.querySelector('[data-js-menu-open-button]')


const heroTitleEl = document.querySelector('[data-js-hero-title]')
const heroTitleMeasureEl = document.querySelector('[data-js-hero-title-measures]')
const heroTitleTextArr = Array.from(heroTitleMeasureEl.children).map(el => el.innerText)
const heroTitleAnimator = new HeroTitleAnimator(heroTitleEl)
let heroTitleTextNum = 0


const heroNotebookCodeElArr = document.querySelectorAll('.notebook__code')
let heroNotebookCodeNum = 0


bodyEl.onscroll = () => {
    updateBackgroundParallax()
}

updateBackgroundParallax()
setTimeout(() => { bodyEl.classList.add('loaded') }, 500)


menuOpenButtonEl.onclick = () => {
    headerEl.classList.toggle('open')
}


headerEl.onscroll = () => {
    headerEl.scrollTop = 0
}

headerEl.onclick = (e) => {
    if (e.target.closest('a')) headerEl.classList.remove('open')
}


setTimeout(writeHeroTitleText, 1500)
setTimeout(animateHeroNotebookCode, 3200)