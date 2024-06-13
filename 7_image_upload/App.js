import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation'
import Registration from './src/screens/Registration';

const App = () => {
  return (
 <NavigationContainer>
  <StackNavigation/>
 </NavigationContainer>
  )
}

export default App

