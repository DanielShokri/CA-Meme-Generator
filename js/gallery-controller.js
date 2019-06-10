'use strict'


function onInit() {
    createImgs();
    renderGallery();
}



function renderGallery() {
    let imgs = getImages();
    let strHtml = imgs.map(function (img) {
        return `
        <li>
        <a class="rig-cell" href="#">
        <img src="${img.url}" class="rig-img" onclick="imgOpenInEditor()"/>
                    <span class=" rig-overlay"></span>
            <span class="rig-text">Lorem Ipsum Dolor</span>
            </a>
            </li>
            `
    })

    document.querySelector('#rig').innerHTML = strHtml.join(' ');
}

function imgOpenInEditor(){
    
}