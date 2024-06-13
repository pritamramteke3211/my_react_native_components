import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../theme/colors';
import {rspF, rspH, rspW} from '../theme/responsive';

const MyButton = ({title = '', onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.btnCont} onPress={onPress}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btnCont: {
    backgroundColor: colors.green,
    height: rspH(6.5),
    width: rspW(80),
    marginVertical: rspH(1.8),
    borderRadius: rspW(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: colors.white,
    fontSize: rspF(4),
  },
});
