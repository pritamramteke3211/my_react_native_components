

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import navigationStrings from './navigationStrings';
import * as screens from '../screens'

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
    screenOptions={{
    headerShown: false,
      animationEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
      cardOverlayEnabled: true,
      presentation: 'modal',
    }}>
        <Stack.Screen name={navigationStrings.SIGNUP} component={screens.SignUp} />
    </Stack.Navigator>
  )
}

export default StackNav

const styles = StyleSheet.create({})