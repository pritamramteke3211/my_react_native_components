import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './StackNav'

const Routes = () => {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})