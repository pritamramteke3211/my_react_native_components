const {Dimensions} = require('react-native');

const {width, height} = Dimensions.get('screen');

const rspH = val => val * height * 0.01;
const rspW = val => val * width * 0.01;

const rspF = val => val * height/width 

export {width as scrn_width, height as scrn_height, rspH, rspW,rspF};
