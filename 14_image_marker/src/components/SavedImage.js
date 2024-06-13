import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const SavedImage = ({sImage}) => {
  return (
    <>
      <Image
      source={{uri: sImage}}
      style={{width: 200, height: 200, backgroundColor: 'red'}}
      />
    </>
  )
}

export default memo(SavedImage)

const styles = StyleSheet.create({})