'use strict';

let gCanvas;
let gCtx;
let gImg;


function onInit() {
    gImg = new Image();
    gImg.crossOrigin = "Anonymous";
    defineCanvas();
    userMemesSetting();    
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
    let meme = getMemes();
    
    gCtx.beginPath();
    gCtx.textAlign = "left";
    gCtx.font = meme.size + 'px ' + meme[0].fontFamily;
    
    gCtx.lineWidth = 6;
    gCtx.fillStyle = meme.color;

    gCtx.strokeText(meme[0][0].line, meme[0][0].x, meme[0][0].y);
    gCtx.fillText(meme[0][0].line, meme[0][0].x, meme[0][0].y);
    
    gCtx.strokeText(meme[1][0].line, meme[1][0].x, meme[1][0].y);
    gCtx.fillText(meme[1][0].line, meme[1][0].x, meme[1][0].y);
}


function dynamicText(img) {
    let meme = getMemes();
    document.querySelector('.line-top').addEventListener('keydown', function () {
        meme[0][0].line = this.value;
        drawOverlay(img);
        gCtx.fillText(meme[0][0].line, 70, 70);
        drawText();
    });
    document.querySelector('.line-bottom').addEventListener('keydown', function () {
        meme[1][0].line = this.value;
        drawOverlay(img);
        gCtx.fillText(meme[1][0].line, 70, 70);
        drawText();
    });
    document.querySelector('.font-size').addEventListener('input', function () {
        meme.size = document.querySelector('.font-size').value;
        drawOverlay(img);
        drawText();
    });
    document.querySelector('.user-color').addEventListener('change', function () {
        meme.color = document.querySelector('.user-color').value;
        drawOverlay(img);
        drawText();
    });
}


function onMoveRight(num) {
    moveLineRight(num)
    drawOverlay(gImg);
    drawText();
}

function onMoveLeft(num) {
    moveLineLeft(num);
    drawOverlay(gImg);
    drawText();
}

function onMoveUp(num) {
    moveLineUp(num);
    drawOverlay(gImg);
    drawText();
}

function onMoveDown(num) {
    moveLineDown(num);
    drawOverlay(gImg);
    drawText();
}

function onChangeTextFamily(th, num) {
    changeTextFont(th.value ,num);
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