import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Registration, UserDetails, Users } from './paths';
import VisionCamera from '../components/VisionCamera';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerTitleAlign:'center'
    }}
    >
    <Stack.Screen name="Registration" component={Registration} />
    {/* <Stack.Screen name="VisionCamera" component={VisionCamera} /> */}

    
  </Stack.Navigator>
  )
}

export default StackNavigation

