import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IOIcon from 'react-native-vector-icons/Ionicons';
import {rspH, rspW} from '../theme/responsive';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';

const BackButton = () => {
  const navigaton = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigaton.goBack();
      }}
      style={{
        width: rspW(8),
        height: rspW(8),
        borderRadius: rspW(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grayGreen,
        position: 'absolute',
        left: rspW(0),
        top: rspH(2),
      }}>
      <IOIcon name={'chevron-back'} size={rspW(4)} color={colors.green} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
