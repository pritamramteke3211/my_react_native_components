import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DragFlatlist from './DragFlatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import DragFlatlist2 from './DragFlatlist2'

const App = () => {
  return (

    <GestureHandlerRootView style={{flex:1}}>
    <DragFlatlist/>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})