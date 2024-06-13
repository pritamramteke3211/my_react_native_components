import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {rspH, rspW} from '../theme/responsive';

const ScreenWrapper = ({children, padHor = 5, padTop = 2, extraStyle = {}}) => {
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        ...extraStyle,
        paddingTop: rspH(padTop),
        paddingHorizontal: rspW(padHor),
      }}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    zIndex: 0,
  },
});
