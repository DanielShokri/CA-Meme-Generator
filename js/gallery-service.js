'use strict';

let gImgs;
let gId = 1;




function createImgs() {
    gImgs = [
        createImg('meme-imgs/2.jpg', ['happy'], 'Happy Women'),
        createImg('meme-imgs/003.jpg', ['happy'], 'Donald Trump'),
        createImg('meme-imgs/004.jpg', ['happy'], 'Puppies'),
        createImg('meme-imgs/005.jpg', ['happy'], 'Puppy and Baby'),
        createImg('meme-imgs/5.jpg', ['happy'], 'Motivate Kid'),
        createImg('meme-imgs/X-Everywhere.jpg', ['happy'], 'Baz and Woody'),
        createImg('meme-imgs/One-Does-Not-Simply.jpg', ['happy'], 'Precise'),
        createImg('meme-imgs/meme1.jpg', ['happy'], 'Matrix'),
    ];
}

function createImg(url, keyword, desc) {
    return {
        id: gId++,
        url: url,
        keywords: keyword,
        desc: desc
    }
}

function getImages() {
    return gImgs;
}

function getImgById(id) {
    let imgIdx =gImgs.find(img =>{
        return img.id === id
    });
    console.log(imgIdx);
    
    saveToStorage('img', imgIdx);
}