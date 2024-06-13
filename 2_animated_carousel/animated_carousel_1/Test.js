import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Test = () => {
  return (
    <View>
      <Text style={styles.description}>Grow your business by accepting card payments with the new card reader.</Text>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
    description:{
        fontSize: 16,
        fontWeight:'300',
        color: '#62656b',
        textAlign:'center',
        paddingHorizontal: 64,
      },
})