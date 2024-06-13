const {Dimensions, Platform} = require('react-native');
import {initialWindowMetrics} from 'react-native-safe-area-context';

const insets = initialWindowMetrics.insets;

const safe_height =
  Dimensions.get('window').height -
  (Platform.OS == 'android' ? insets.top : insets.bottom + insets.top);

const {width, height} = Dimensions.get('window');

export {width as scrn_width, height as scrn_height, safe_height};
