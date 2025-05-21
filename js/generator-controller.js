'use strict';

let gCanvas;
let gCtx;
let gImg;
let gImgIdx;

function onInit() {
    gImgIdx = loadFromStorage('img');
    gImg = new Image();
    if (!gImgIdx) gImg.src = 'meme-imgs/003.jpg';
    else gImg.src = gImgIdx.url;
    //Avoid difficulty with image download
    gImg.crossOrigin = "Anonymous";
    userMemesSetting();
    defineCanvas();
    renderControls();
}

function defineCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    let meme = getMemes();

    gImg.onload = function () {
        gCanvas.width = 500;
        gCanvas.height = 500;
        meme.txts[1].y = 470;
        drawCanvas();
    };
}

//Render the canvas with text and img
function drawCanvas() {
    gCtx.drawImage(gImg, 0, 0, gImg.naturalWidth, gImg.naturalHeight, 0, 0, gCanvas.width, gCanvas.height);
    let meme = getMemes();
    meme.txts.forEach(function (txt) {
        drawTxt(txt);
    });
}

function drawTxt(txt) {
    gCtx.beginPath();
    gCtx.font = txt.size + 'px ' + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.lineWidth = 3; // This might be for the fillText "border" effect, or a leftover. Task specifies strokeWidth for strokeText.
    gCtx.fillText(txt.line, txt.x, txt.y);

    gCtx.strokeStyle = txt.strokeColor;
    gCtx.lineWidth = txt.strokeWidth;
    gCtx.strokeText(txt.line, txt.x, txt.y);
}

//Change the text dynamically based on the data-attributes
function dynamicText(elInput, txtIdx) {
    let meme = getMemes();
    let tool = elInput.dataset.tool;
    let value;

    if (elInput.type === 'select-one') value = elInput.options[elInput.selectedIndex].value;
    else value = elInput.value; // The Default is number and Text

    meme.txts[txtIdx][tool] = value;
    drawCanvas();
}

//Render set's of control each line
function renderControls() {
    let meme = getMemes();
    let strHtml = meme.txts.map(function (txt, idx) {
        return `
        <div class="control-text">
        <button class="line-delete" onclick="onDeleteText(${idx})"><i class="fas trash fa-trash-alt"></i></button>
        <input class="text-input" type="text" data-tool="line" placeholder="${txt.line}" oninput="dynamicText(this,${idx})"/>
        <i class="fas fa-text-height"></i> <input type="range" value="${txt.size}"  min="10" step="2" data-tool="size" oninput="dynamicText(this ,${idx})">
        <label for="fillColor">Fill:</label><input type="color" id="fillColor" class="color-input" value="${txt.color}" data-tool="color" oninput="dynamicText(this,${idx})">
        <label for="strokeColor">Stroke:</label><input type="color" id="strokeColor" class="color-input" value="${txt.strokeColor}" data-tool="strokeColor" oninput="dynamicText(this,${idx})">
        <label for="strokeWidth">Stroke Width:</label><input type="range" id="strokeWidth" value="${txt.strokeWidth}"  min="0" max="10" step="1" data-tool="strokeWidth" oninput="dynamicText(this ,${idx})">

          <i class="fas fa-font"></i>: 
         <select data-tool="fontFamily" oninput="dynamicText(this,${idx})">
         <option style="font-family: Impact;" value="${txt.fontFamily}">${txt.fontFamily}</option>
         <option style="font-family: Tahoma;" value="Tahoma">Tahoma</option>
         <option style="font-family: lobster;" value="lobster">Lobster</option>
         <option value="Verdana">Verdana</option>
         </select>

         <i class="fas fa-arrows-alt-h"></i> <input type="number" class="left-right-input" value="${txt.x}"  min="0" step="5" data-tool="x" oninput="dynamicText(this ,${idx})">
         <i class="fas fa-arrows-alt-v"></i> <input type="number" class="left-right-input" value="${txt.y}"  min="0" step="5" data-tool="y" oninput="dynamicText(this ,${idx})">

         <select data-tool="align" oninput="dynamicText(this,${idx})">
         <option value="left">left</option>
         <option value="center">center</option>
         <option value="right">right</option>
          </select>

            </div>`
    })
    document.querySelector('.control-tools').innerHTML = strHtml.join(' ');
}

function onControlOpen() {
    document.querySelector('.control-section').classList.toggle('transform-control');
}

function onDeleteText(textIdx) {
    deleteText(textIdx);
    drawCanvas();
    renderControls();
}

function onAddNewLine() {
    addNewLine();
    drawCanvas();
    renderControls();
}

//Get Picture from computer
function renderCanvasImg(img) {
    gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, gCanvas.width, gCanvas.height);
}

function onFileInputChange(ev) {
    handleImage(ev, renderCanvasImg)
}

//Handel the img uploaded from the computer
function handleImage(ev, onImageReady) {
    let reader = new FileReader();
    let img = "";
    reader.onload = function (event) {
        img = new Image();
        img.onload = function () {
            gCanvas.width = img.naturalWidth;
            gCanvas.height = img.naturalHeight;
        }
        gImg.onload = onImageReady.bind(null, gImg)
        gImg.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

//Download canvas as .jpg
function onDownloadImg(elLink, ev) {
    ev.stopPropagation();
    let imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}



