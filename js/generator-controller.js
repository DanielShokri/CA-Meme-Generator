'use strict';

let gCanvas;
let gCtx;
let gImg = new Image();
let gTextTitle = '';
let gMemes;


function onInit() {
    defineCanvas();
    drawPlaceholder();
}

function defineCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = window.innerWidth - 600;
    gCanvas.height = window.innerHeight - 300;
}



function drawPlaceholder() {
    gImg.onload = function () {
        drawOverlay(gImg);
        drawText();
        dynamicText(gImg)
    };
    //Get random Picture every startup
    gImg.src = 'https://unsplash.it/400/400/?random';
}

function renderCanvasImg(img) {
    gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, gCanvas.width, gCanvas.height);
}

function onFileInputChange(ev) {
    handleImage(ev, renderCanvasImg)
}

function drawOverlay(img) {
    gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, gCanvas.width, gCanvas.height);
    gCtx.fillStyle = 'rgba(50, 144, 255, 0.01)';
}

function drawText(txtSize) {

    gCtx.beginPath();
    // gCtx.textAlign = "center";
    gCtx.font = txtSize + 'px ' + 'Impact';
    
    gCtx.fillStyle = 'white';
    gCtx.lineWidth = 6;

    gCtx.strokeText(gTextTitle, 70, 70);
    gCtx.fillText(gTextTitle, 70, 70);
}

function dynamicText(img) {
    document.querySelector('.name').addEventListener('keydown', function () {
        drawOverlay(img);
        drawText();
        gTextTitle = this.value;
        gCtx.fillText(gTextTitle, 70, 70);
    });
    document.querySelector('.font-size').addEventListener('input', function () {
        let txtSize = document.querySelector('.font-size').value;
        drawOverlay(img);
        drawText(txtSize);
    });
    // document.querySelector('.user-color').addEventListener('change', function () {
    //     console.log('Sucsses');
    //     drawOverlay(img);
    //     let txtColor = document.querySelector('user-color').value;
    //     drawText(txtColor);
    // });
}

function handleImage(ev, onImageReady) {
    let reader = new FileReader();
    let img = "";
    reader.onload = function (event) {
        img = new Image();
        img.onload = function () {
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            // gCtx.drawImage(img, 0, 0);
        }
        gImg.onload = onImageReady.bind(null, gImg)
        gImg.src = event.target.result;

        drawOverlay(img);
        drawText();
        dynamicText(img);
    }
    reader.readAsDataURL(ev.target.files[0]);
}

