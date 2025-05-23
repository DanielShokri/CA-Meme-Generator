'use strict';

let gMemes;
let gId = 1;

function userMemesSetting() {
    gMemes = {
        txts: [createText('Your Line', 150, 85), createText('Your Line', 165, 430)]
    }
}


function createText(line, x, y) {
    return {
        id: gId++,
        line: line,
        size: 50,
        align: 'left',
        color: '#FFFFFF',
        fontFamily: 'Impact',
        strokeColor: '#000000',
        strokeWidth: 1,
        x: x,
        y: y
    }
}

function getMemes() {
    return gMemes;
}

function deleteText(textIdx) {
    gMemes.txts.splice(textIdx, 1);
}

function addNewLine() {
    gMemes.txts.push(createText('New Line', 150, 150));
}