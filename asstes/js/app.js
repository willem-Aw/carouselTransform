class Carrousel {
    #children;

    /**
     * 
     * @param {HTMLElement} element : The HTML element that will be used as the carrousel container.
     * @param {Object} options : An object containing configuration options for the carrousel 
     * @param {Object} [options.slidesToScroll=1] : Number of slides to scroll at once.
     * @param {Object} [options.slidesVisible=1] : Number of slides visible at once. 
     * @param {boolean} [options.loop=false] : Indicates whether the carrousel should loop back to the start when reaching the end. 
     * @param {boolean} [options.isMobile=false] : Indicates whether the carrousel is being viewed on a mobile device.
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options);
        this.#children = [...this.element.children];
        // or
        // this.children = [].slice.call(this.element.children);

        this.currentItem = 0;
        this.isMobile = false;


        // DOM manipulation
        this.itemRoot = this.createElementWithClass('div', 'carrousel__item-root');
        this.carrouselContainer = this.createElementWithClass('div', 'carrousel__items-container');
        // this.carrouselContainer.style.width = `${100 * ratio}%`;
        this.itemRoot.appendChild(this.carrouselContainer);
        this.element.appendChild(this.itemRoot);
        this.itemRoot.setAttribute('tabindex', '0');

        this.items = this.#children.map((child) => {
            let item = this.createElementWithClass('div', 'carrousel__item');
            item.appendChild(child);
            this.carrouselContainer.appendChild(item);

            return item;
        });
        this.setStyle();
        this.createNavigation();
        this.onWindowResize();

        // Event

        window.addEventListener('resize', () => { this.onWindowResize() });
        this.itemRoot.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'Right') {
                this.next();
            } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
                this.prev();
            }
        });
    }

    /**
         * Creates a new HTML element with a specified class name.
         * @param {string} elementToCreate - The type of HTML element to create (e.g., 'div', 'span').
         * @param {string} className - The class name to assign to the created element
         * @returns {HTMLElement} The newly created HTML element with the specified class name.
         */
    createElementWithClass(elementToCreate, className) {

        let element = document.createElement(elementToCreate);
        element.classList.add(className);
        return element;
    }

    next() {
        this.gotoItem(this.currentItem + this.slidesToScroll);
    }

    prev() {
        this.gotoItem(this.currentItem - this.slidesToScroll);
    }

    /**
     * 
     * @param {number} index : The index of the item to navigate to in the carrousel.
     */
    gotoItem(index) {
        // Ensure the index is within bounds
        if (index < 0) {
            // index = this.options.loop ? this.items.length - this.options.slidesVisible : 0;
            if (this.options.loop) {
                index = this.items.length - this.slidesVisible;
            } else {
                index = 0;
                this.carrouselContainer.classList.add('carrousel__has-left-btn-hidden');
                this.carrouselContainer.classList.remove('carrousel__has-right-btn-hidden');
            }
        } else if (index >= this.items.length) {
            if (this.options.loop) {
                index = 0;
            } else {
                index = this.items.length - this.slidesVisible;
                this.carrouselContainer.classList.add('carrousel__has-right-btn-hidden');
                this.carrouselContainer.classList.remove('carrousel__has-left-btn-hidden');
            }
        } else {
            this.carrouselContainer.classList.remove('carrousel__has-left-btn-hidden');
            this.carrouselContainer.classList.remove('carrousel__has-right-btn-hidden');
        }
        let translateX;
        translateX = (index * -100) / this.items.length;
        this.carrouselContainer.style.transform = `translate3d(${translateX}%, 0, 0)`;
        this.currentItem = index;

    }

    /**
     * Sets the style of the carrousel container and its items based on the number of visible slides.
     * It calculates the width of the carrousel container and each item based on the number
     * of items and the number of slides visible at once.
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible;
        this.carrouselContainer.style.width = `${100 * ratio}%`;
        this.items.forEach((item) => {
            item.style.width = `${100 / this.slidesVisible}%`;
        });
    }

    createNavigation() {
        let nextButton = this.createElementWithClass('button', 'carrousel__next');
        this.element.appendChild(nextButton);

        let prevButton = this.createElementWithClass('button', 'carrousel__prev');
        this.element.appendChild(prevButton);

        nextButton.addEventListener('click', () => {
            this.next();
        });

        // or
        // Bind the next method to the current instance of Carrousel
        // nextButton.addEventListener('click', this.next.bind(this));

        prevButton.addEventListener('click', () => {
            this.prev();
        });

        let btnContainer = this.createElementWithClass('div', 'carrousel__btn-container');
        btnContainer.appendChild(prevButton);
        btnContainer.appendChild(nextButton);

        this.itemRoot.appendChild(btnContainer);
    }

    /**
     * @returns {number} The number of slides to scroll at once, adjusted for mobile view if applicable.
     */
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll;
    }
    /**
     * @returns {number} The number of slides visible at once, adjusted for mobile view if applicable.
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible;
    }

    /**
     * Handles window resize events to adjust the carrousel's style and current item based on the viewport width.
     */
    onWindowResize() {
        this.isMobile = window.innerWidth < 768;
        this.setStyle();
        this.gotoItem(this.currentItem);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Carrousel(document.querySelector('#carrousel'), {
        slidesToScroll: 2,
        slidesVisible: 2,
        loop: true
    });

    new Carrousel(document.querySelector('#carrousel2'), {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: false
    });
});