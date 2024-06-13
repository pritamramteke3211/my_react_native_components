import {Dimensions, Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';


const insets = initialWindowMetrics?.insets;

const {width, height} = Dimensions.get('screen');

const scrn_width = width;
const scrn_height = height;

// f_hight = figma screen height
const f_height = 800;
const f_width = 360;

const fl_per = 1.2;

const safe_top = insets?.top;
const safe_bottom = insets?.bottom;

const act_hg =
  scrn_height - (Platform.OS == 'android' ? insets?.top + insets?.bottom : 0);


const rspF = val => {
  let res = (val / f_height) * scrn_height
  // let res = moderateScale(val);
  return res;
};
const rspFL = val => {
  let res = (val / f_height) * scrn_height * fl_per;
  return res;
};

const rspH = val => {
  let res = (val / f_height) * scrn_height;
  return res;
};


const rspW = val => {
  let res = (val / f_width) * scrn_width;
  return res;
};

export {
  scrn_width,
  scrn_height,
  act_hg,
  rspH,
  rspW,
  rspF,
  rspFL,
  safe_top,
  safe_bottom,
};
