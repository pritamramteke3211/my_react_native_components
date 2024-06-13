import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import navgationStrings from './navgationStrings';
import * as screen from '../screens';

const AuthScreen = Stack => {
  return (
    <>
      <Stack.Screen name={navgationStrings.LOGIN} component={screen.Login} />
      <Stack.Screen
        name={navgationStrings.REGISTRATION}
        component={screen.Registration}
      />
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
