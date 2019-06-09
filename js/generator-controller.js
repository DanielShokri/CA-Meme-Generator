'use strict';

let gCanvas;
let gCtx;
let gImg;


function onInit() {
    gImg = new Image();
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
    console.log(meme);


    gImg.onload = function () {
        gCanvas.width = gImg.naturalWidth;
        gCanvas.height = gImg.naturalHeight;
        meme.txts[1].y = gImg.height - 60;
        drawCanvas();
    };
    //Get random Picture on every startup
    gImg.src = 'https://loremflickr.com/500/500/funny';
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
    gCtx.lineWidth = 3;
    gCtx.fillText(txt.line, txt.x, txt.y);
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
        <input type="text" data-tool="line" placeholder="${txt.line}" oninput="dynamicText(this,${idx})"/>
        <i class="fas fa-text-height"></i> <input type="range" value="${txt.size}"  min="10" step="2" data-tool="size" oninput="dynamicText(this ,${idx})">
        <input type="color" class="color-input" value="${txt.color}" data-tool="color" oninput="dynamicText(this,${idx})">


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

//Resize the Canvas
window.addEventListener('resize', function () {
    gCtx.canvas.width = document.documentElement.clientWidth * 0.5;
    gCtx.canvas.height = document.documentElement.clientHeight * 0.5;
});


//Facebook Share APi Code

function uploadImg(elForm, ev) {
    ev.preventDefault();

    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })
        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}


// facebook api
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));