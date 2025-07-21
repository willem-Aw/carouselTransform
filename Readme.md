# Carousel Transform

A responsive, touch-enabled carousel component built with HTML, CSS, and JavaScript. This project demonstrates a flexible carousel implementation supporting navigation, pagination, infinite scrolling, and touch/mouse drag gestures.
Link to the project : [easysnap](https://willem-aw.github.io/carouselTransform/)

## Features

- Responsive design with customizable visible slides
- Touch and mouse drag/swipe support ([`CarrouselTouchManager`](asstes/js/app.js))
- Infinite scrolling and loop modes
- Pagination controls
- Keyboard navigation (arrow keys)
- Customizable via options

## Usage

1. **Clone or Download** this repository.
2. Open `index.html` in your browser.

The carousel is initialized automatically for elements with IDs `#carrousel` and `#carrousel2` as shown in [index.html](index.html).

## Customization

You can create a new carousel by adding a container in your HTML:

```html
<div class="wrapper" id="myCarousel">
  <div class="item"> ... </div>
  <div class="item"> ... </div>
  <!-- more items -->
</div>

```

And initialize it in JavaScript:

```javascript
new Carrousel(document.querySelector('#myCarousel'), {
  slidesToScroll: 2,
  slidesVisible: 2,
  loop: true,
  pagination: true,
  infinite: false
});

```

### Options

- `slidesToScroll`(number): Number of slides to scroll per navigation.
- `slidesVisible`(number): Number of slides visible at once.
- `loop`(boolean): Enable/disable looping at ends.
- `pagination`(boolean): Show/hide pagination controls.
- `infinite`(boolean): Enable/disable infinite scrolling.
