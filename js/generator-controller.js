'use strict';

let gCanvas;
let gCtx;
let gImg;
let gMemes;


function onInit() {
    gImg = new Image();
    gImg.crossOrigin = "Anonymous";
    defineCanvas();
    gMemes = userMemesSetting();
    console.log(gMemes);   
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
        dynamicText(gImg);
    };
    //Get random Picture every startup
    gImg.src = 'https://loremflickr.com/500/500/funny';
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

function drawText() {
    gCtx.beginPath();
    // gCtx.textAlign = "center";
    gCtx.font = gMemes.size + 'px ' + 'Impact';

    gCtx.fillStyle = gMemes.color;
    gCtx.lineWidth = 6;

    gCtx.strokeText(gMemes[0][0].line, gMemes[0][0].x, gMemes[0][0].y);
    gCtx.fillText(gMemes[0][0].line, gMemes[0][0].x, gMemes[0][0].y);

    gCtx.strokeText(gMemes[1][0].line, gMemes[1][0].x, gMemes[1][0].y);
    gCtx.fillText(gMemes[1][0].line, gMemes[1][0].x, gMemes[1][0].y);
}


function dynamicText(img) {
    document.querySelector('.line-top').addEventListener('keydown', function () {
        gMemes[0][0].line = this.value;
        drawOverlay(img);
        gCtx.fillText(gMemes[0][0].line, 70, 70);
        drawText();
    });
    document.querySelector('.line-bottom').addEventListener('keydown', function () {
        gMemes[1][0].line = this.value;
        drawOverlay(img);
        gCtx.fillText(gMemes[1][0].line, 70, 70);
        drawText();
    });
    document.querySelector('.font-size').addEventListener('input', function () {
        gMemes.size = document.querySelector('.font-size').value;
        drawOverlay(img);
        drawText();
    });
    document.querySelector('.user-color').addEventListener('change', function () {
        gMemes.color = document.querySelector('.user-color').value;
        drawOverlay(img);
        drawText();
    });
}


function onMoveRight(num) {
    let memeNum = gMemes.find(meme => {
        return num === meme[0].id
    });
    console.log(memeNum[0].x)
    memeNum[0].x += 5;
    drawOverlay(gImg);
    drawText();
}

function onMoveLeft(num) {
    let memeNum = gMemes.find(meme => {
        return num === meme[0].id
    });
    console.log(memeNum[0].x)
    memeNum[0].x -= 5;
    drawOverlay(gImg);
    drawText();
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

function onDownloadImg(elLink, ev) {
    ev.stopPropagation();
    let imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}