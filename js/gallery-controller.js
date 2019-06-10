'use strict'


function onInit() {
    createImgs();
    renderGallery();
}



function renderGallery() {
    let imgs = getImages();
    let strHtml = imgs.map(function (img) {
        return `
        <li >
        <a class="rig-cell" href="#"  onclick="imgOpenInEditor(${img.id})">
        <img src="${img.url}" class="rig-img"/>
                    <span class=" rig-overlay"></span>
            <span class="rig-text">${img.desc}</span>
            </a>
            </li>
            `
    })
    document.querySelector('#rig').innerHTML = strHtml.join(' ');
}

function imgOpenInEditor(imgId){
    getImgById(imgId);
    location.replace('index.html');
}