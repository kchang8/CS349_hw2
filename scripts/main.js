var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var currentIndex = 0;

function setDetails(imageUrl, titleText) {
    'use-strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use-strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use-strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use-strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use-strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailArray() {
    'use-strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use-strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use-strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    frame.classList.remove(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use-strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if(event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function arrowKeyPressed(direction) {
    var thumbnailArray = getThumbnailArray();
    if(direction === "previous") {
        if(currentIndex === 0) {
            currentIndex = thumbnailArray.length - 1;
        } else {
            currentIndex = currentIndex - 1;
        }
    } else {
        if(currentIndex === thumbnailArray.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex = currentIndex + 1;
        }
    }
    setDetailsFromThumb(thumbnailArray[currentIndex]);
}

function addArrowKeyPressHandler() {
    'use-strict';
    document.body.addEventListener('click', function (event) {
        event.preventDefault();
        if(!event.target.matches(".image-button")) {
            return;
        }
        arrowKeyPressed(event.target.getAttribute("direction"));
    });
}

function initializeEvents() {
    'use-strict';
    var thumbnails = getThumbnailArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addArrowKeyPressHandler();
}

initializeEvents();
    