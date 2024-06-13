import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import navgationStrings from './navgationStrings';
import * as screen from '../screens';

const MainScreen = Stack => {
  return (
    <>
      <Stack.Screen name={navgationStrings.HOME} component={screen.Home} />
    </>
  );
};

export default MainScreen;
