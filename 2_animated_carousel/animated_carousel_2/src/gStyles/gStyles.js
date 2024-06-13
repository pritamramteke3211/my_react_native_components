import {StyleSheet, Text, View} from 'react-native';
import {rspH, rspW, scrn_height, scrn_width} from '../theme/responsive';
const gStyles = StyleSheet.create({
  fullScrn: {
    height: scrn_height,
    width: scrn_width,
  },
  row_center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row_left: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  row_ac: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  row_sb: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row_sb_left: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  row_ar: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  col_center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  col_left: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  col_sb: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  col_sb_left: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  blackBoxShadow: {
    shadowColor: '#000',
    elevation: 10,
  },
});
export default gStyles;
