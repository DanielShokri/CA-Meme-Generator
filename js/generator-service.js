'use strict';

let gSettings;


function userMemesSetting() {
    return [[createText(0,'Your Line', 150, 70)], [createText(1,'Your Line', 150, 450)]]
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


function findMemeLine() {
    
}