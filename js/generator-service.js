'use strict';

let gMemes;


function userMemesSetting() {
    gMemes = [[createText(0, 'Your Line', 150, 70)], [createText(1, 'Your Line', 150, 450)]]
    console.log(gMemes)
}


function createText(id, line, x, y) {
    return {
        id: id,
        line: line,
        size: 50,
        align: 'left',
        color: '#FFFFFF',
        fontFamily: 'Impact',
        x: x,
        y: y
    };
}

function getMemes() {
    return gMemes;
}

function moveLineRight(num) {
    let memeNum = gMemes.find(meme => {
        return num === meme[0].id
    });
    memeNum[0].x += 5;
}

function moveLineLeft(num) {
    let memeNum = gMemes.find(meme => {
        return num === meme[0].id
    });
    memeNum[0].x -= 5;
}

function moveLineUp(num) {
    let memeNum = gMemes.find(meme => {
        return num === meme[0].id
    });
    memeNum[0].y -= 5;
}

function moveLineDown(num) {
    let memeNum = gMemes.find(meme => {
        return num === meme[0].id
    });
    memeNum[0].y += 5;
}

function changeTextFont(val, num) {
    let memeNumObj = gMemes.find(meme => {
        return num === meme[0].id
    });
    let memeNum = gMemes.findIndex(meme => {
        return num === meme[0].id
    });
    console.log(memeNumObj, memeNum,val);

    // gMemes[memeNum].fontFamily = val;
    memeNumObj.fontFamily = val;
}
