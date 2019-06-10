'use strict';

let gImgs;
let gId = 1;




function createImgs() {
    gImgs = [
        createImg('./meme-imgs/2.jpg', ['happy']),
        createImg('/meme-imgs/003.jpg', ['happy']),
        createImg('/meme-imgs/004.jpg', ['happy']),
        createImg('/meme-imgs/005.jpg', ['happy']),
        createImg('/meme-imgs/5.jpg', ['happy']),
        createImg('/meme-imgs/X-Everywhere.jpg', ['happy']),
        createImg('/meme-imgs/One-Does-Not-Simply.jpg', ['happy']),
        createImg('/meme-imgs/meme1.jpg', ['happy']),
    ];
    console.log(gImgs);
}

function createImg(url, keyword) {
    return {
        id: gId++,
        url: url,
        keywords: keyword
    }
}

function getImages() {
    return gImgs;
}