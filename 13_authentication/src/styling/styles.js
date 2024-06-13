import {StyleSheet, Text, View} from 'react-native';
import {rspF, rspH, scrn_height, scrn_width} from '../theme/responsive';
import fontFamily from '../theme/fontFamily';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImg: {
    width: scrn_width * 1.4,
    height: scrn_height / 1.5,
    marginTop: -rspH(26),
    borderRadius: scrn_width * 2,
    // position: 'relative',
  },

  mainTitle: {
    fontSize: rspF(7.5),
    fontFamily: fontFamily.bold,
    color: colors.dimGreen,
  },
  subTitle: {
    fontSize: rspF(4),
    fontFamily: fontFamily.medium,
    color: colors.gray,
    textAlign: 'center',
  },
  linkTxt: {
    fontFamily: fontFamily.bold,
    fontSize: rspF(4),
    color: colors.green,
  },

  inputCont: {
    marginTop: rspH(3.2),
  },
});

export default styles;
