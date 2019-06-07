'use strict';

let gCanvas;
let gCtx;
let gImg;
let gTextTitle = '';
let gTextTitleBottom = '';
let gColor = '#FFFFFF';
let gMemes;


function onInit() {
    gImg = new Image();
    gImg.crossOrigin = "Anonymous";
    defineCanvas();
    drawPlaceholder();
}

function defineCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
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

    gCtx.fillStyle = gColor;
    gCtx.lineWidth = 6;

    gCtx.strokeText(gTextTitle, 100, 70);
    gCtx.fillText(gTextTitle, 100, 70);

    gCtx.strokeText(gTextTitleBottom, 100, 450);
    gCtx.fillText(gTextTitleBottom, 100, 450);
}

function dynamicText(img) {
    document.querySelector('.line-top').addEventListener('keydown', function () {
        gTextTitle = this.value;
        drawOverlay(img);
        gCtx.fillText(gTextTitle, 70, 70);
        drawText();
    });
    document.querySelector('.line-bottom').addEventListener('keydown', function () {
        gTextTitleBottom = this.value;
        drawOverlay(img);
        gCtx.fillText(gTextTitleBottom, 200, 100);
        drawText();
    });
    document.querySelector('.font-size').addEventListener('input', function () {
        let txtSize = document.querySelector('.font-size').value;
        drawOverlay(img);
        drawText(txtSize);
    });
    document.querySelector('.user-color').addEventListener('change', function () {
        let txtColor = document.querySelector('.user-color').value;
        drawOverlay(img);
        gColor = txtColor;
        drawText();
    });
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

function onDownloadImg(elLink,ev) {
    ev.stopPropagation();
    let imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}