export class HeroTitleAnimator {
    constructor(heroTitleElement) {
        this.heroTitleElement = heroTitleElement
        this.heroTitleVisibleElement = this.heroTitleElement.querySelector('.hero__title-visible')
        this.heroTitleInvisibleElement = this.heroTitleElement.querySelector('.hero__title-invisible')
    }

    write(text) {
        return new Promise(resolve => {
            this.heroTitleVisibleElement.textContent = ''
            this.heroTitleInvisibleElement.textContent = text
            this.heroTitleElement.classList.remove('hero__title--hiding')

            const interval = setInterval(() => {
                if (this.heroTitleInvisibleElement.textContent.length === 0) {
                    clearInterval(interval)
                    resolve()
                }
                else {
                    this.heroTitleVisibleElement.textContent += this.heroTitleInvisibleElement.textContent.substr(0, 1)
                    this.heroTitleInvisibleElement.textContent = this.heroTitleInvisibleElement.textContent.substr(1)
                }
            }, 50)
        })
    }

    hide() {
        return new Promise(resolve => {
            this.heroTitleElement.classList.add('hero__title--hiding')
            setTimeout(resolve, 2000)
        })
    }
}