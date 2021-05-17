import './styles/styles.css'

const images = document.querySelectorAll('.slider .slider-line .bg.img');
const sliderLine = document.querySelector('.slider .slider-line');
const width = document.querySelector('.slider').offsetWidth;
const slider = document.querySelector('.slider');
const firstPageButton = document.querySelector('.first-page-btn');
const header = document.querySelector('.header-a');
let count = 0;

//slider-swiper

function init() {
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    });
    rollSlider(count);
}

init();

// Распознавание touch, сравнивание с расстоянием в какую сторону был свайп
let startPos = null;


function touchStart(evt) {
    startPos = evt.changedTouches[0].clientX
}


function touchEnd(evt) {
    let endPos = evt.changedTouches[0].clientX
    // Где 45, это проверка на какое расстояние был перемещен свайп, более 45 - сделать свайп, менее 45 - тач
    if (startPos > endPos && startPos-endPos > 45) {
        if (count === 2) {
            count = 0
        } else {
            count++
        }
    }
    if (startPos < endPos && endPos-startPos > 45) {
        if (count > 0) {
            count--
        }
    }
    rollSlider(count)

}

slider.addEventListener('touchstart',touchStart);
slider.addEventListener('touchend',touchEnd)

//
//
//

//roll slider - перенос на следующий элемент страницы (1024px)
function rollSlider(count) {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}

//ModalWindow
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

//Слайдер текста в модальном окне
let firstSlide = document.getElementById("firstSlide");
let secondSlide = document.getElementById("secondSlide");
let btnBack = document.getElementById("btnBack");
let btnForward = document.getElementById("btnForward");
let ellipse = document.getElementById("pag_ellipse-3")

btnBack.onclick = function () {
    firstSlide.style.display = "block";
    secondSlide.style.display = "none";
    ellipse.style.display = "none";
}

btnForward.onclick = function () {
    secondSlide.style.display = "block";
    firstSlide.style.display = "none";
    ellipse.style.display = "block";
}

firstPageButton.addEventListener('click', function () {
    rollSlider(count=1);
});

header.addEventListener('click', function () {
    rollSlider(count=0);
});

let sliderR = document.getElementById('slider-body')
let sliderBtn = document.getElementById('slider-btn')
let bodyTextP = document.getElementById('body-text-p')
let bodyText = document.getElementById('body-text')

sliderR.addEventListener('touchmove', function (evt) {
    let btnHeight = sliderBtn.getBoundingClientRect().height
    let touchY = evt.changedTouches[0].pageY
    let sliderRect = sliderR.getBoundingClientRect()
    let sliderTouchPos = touchY-sliderRect.y
    let bodyHeight = bodyText.getBoundingClientRect().height
    let textHeight = bodyTextP.getBoundingClientRect().height

    let sliderPos = sliderRect.height - btnHeight
    let windowPos = textHeight - bodyHeight
    let WPos = windowPos/sliderPos * sliderTouchPos

    let bottomBorder = sliderRect.height -btnHeight/2
    let topBorder = btnHeight/2

    let bodyBottomBorder = bodyHeight-btnHeight/2-30
    //30px - margin of body-text//
    let bodyTopBorder = 0

    if (sliderTouchPos>bottomBorder){
        sliderTouchPos = bottomBorder
    }
    if (sliderTouchPos<topBorder){
        sliderTouchPos = topBorder
    }

    if (WPos>bodyBottomBorder) {
        WPos = bodyBottomBorder
    }

    if (WPos < bodyTopBorder) {
        WPos = bodyTopBorder
    }

    sliderBtn.style.top = `${sliderTouchPos - btnHeight/2}px`
    bodyTextP.style.top = `${-WPos}px`

});





