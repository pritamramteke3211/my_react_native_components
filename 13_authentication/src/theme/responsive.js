import {Dimensions, StatusBar, PixelRatio, Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const insets = initialWindowMetrics?.insets;

const {width, height} = Dimensions.get('screen');

const scrn_width = width;
const scrn_height = height;

const act_hg = scrn_height - StatusBar.currentHeight - insets?.bottom;
let font_cal = scrn_height > scrn_width ? scrn_width : scrn_height;

const rspH = val => {
  return val * act_hg * 0.01;
};

const rspW = val => {
  return val * scrn_width * 0.01;
};

const rspF = val => {
  return val * font_cal * 0.01;
};

export {scrn_width, scrn_height, act_hg, rspF, rspH, rspW};
