import {HeroTitleAnimator} from "./header_title_animator.js";

const heroTitleElement = document.querySelector('.hero__title')
const heroTitleAnimator = new HeroTitleAnimator(heroTitleElement)
const heroTitleTextArray = [
    'Здесь будет меняться какой-нибудь анимированный текст',
    'Короткий текст',
    'Длинный текст длинный текст длинный текст длинный текст длинный текст',
]

let heroTitleTextNumber = 0

const writeHeroTitleText = async () => {
    await heroTitleAnimator.write(heroTitleTextArray[heroTitleTextNumber])

    setTimeout(() => {
        if (++heroTitleTextNumber === heroTitleTextArray.length) {
            heroTitleTextNumber = 0
        }
        writeHeroTitleText()
    }, 2000)
}

setTimeout(() => {
    document.body.classList.add('loaded')

    writeHeroTitleText()
}, 1000)
