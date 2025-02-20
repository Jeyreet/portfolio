export class Slider {
    sliderListEl
    slideElArr
    paginationButtonElArr
    position = 0
    maxPosition
    paginationUpdateTimeout

    constructor(sliderEl) {
        this.sliderListEl = sliderEl.querySelector('.slider__list')
        this.slideElArr = this.sliderListEl.querySelectorAll('.slider__item')
        this.maxPosition = this.slideElArr.length - 1

        this.slideElArr[0].setAttribute('data-selected', '')

        let paginationButtonListEl = sliderEl.querySelector('.slider__pagination-list')
        let paginationButtonItemEl = sliderEl.querySelector('.slider__pagination-item')

        for (let i = 0; i < this.maxPosition; i++) {
            paginationButtonItemEl = paginationButtonItemEl.cloneNode(true)
            paginationButtonItemEl.children[0].setAttribute('data-position', String(i + 1))
            paginationButtonItemEl.children[0].children[0].textContent = `Слайд ${i + 1}`
            paginationButtonListEl.appendChild(paginationButtonItemEl)
        }

        this.paginationButtonElArr = paginationButtonListEl.querySelectorAll('.slider__pagination-button')
        this.paginationButtonElArr[0].setAttribute('data-selected', '')

        sliderEl.onclick = (e) => {
            let target

            if (e.target.closest('.slider__rotate-left')) {
                this.rotate(false)
            }
            else if (e.target.closest('.slider__rotate-right')) {
                this.rotate(true)
            }
            else if ((target = e.target.closest('.slider__pagination-button')) || (target = e.target.closest('.slider__item'))) {
                let targetPosition = Number(target.getAttribute('data-position'))

                if (targetPosition !== this.position) {
                    this.position = targetPosition;
                    this.slide()
                }
            }
        }

        this.sliderListEl.onscroll = (e) => {
            let sliderListElRect = this.sliderListEl.getBoundingClientRect()
            let pointX = sliderListElRect.left + sliderListElRect.width / 2
            let pointY = sliderListElRect.top + sliderListElRect.height / 2
            let newPosition = document.elementFromPoint(pointX, pointY).closest('.slider__item')?.dataset.position

            if (newPosition && Number(newPosition) !== this.position) {
                this.paginationButtonElArr[this.position].removeAttribute('data-selected')
                this.slideElArr[this.position].removeAttribute('data-selected')
                this.position = Number(newPosition)
                this.paginationButtonElArr[this.position].dataset.selected = ''
                this.slideElArr[this.position].dataset.selected = ''
            }
        }

        this.slideElArr.forEach((slideEl, position) => {
            slideEl.dataset.position = String(position)
        })

        this.paginationButtonElArr.forEach((paginationButtonEl, position) => {
            paginationButtonEl.dataset.position = String(position)
        })
    }

    rotate(right = true) {
        if (right) {
            if (++this.position > this.maxPosition) {
                this.position = 0
            }
        }
        else {
            if (--this.position < 0) {
                this.position = this.maxPosition
            }
        }

        this.slide()
    }

    slide() {
        let sliderListElLeft = this.sliderListEl.offsetLeft
        let slideElLeft = this.slideElArr[this.position].offsetLeft
        let slideElWidth = this.slideElArr[this.position].offsetWidth

        this.sliderListEl.scrollTo({
            left:slideElLeft - sliderListElLeft - slideElWidth / 2,
            behavior: 'smooth'
        });
    }
}