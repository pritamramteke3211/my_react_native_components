import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import gStyles from '../gStyles/gStyles'
import fontFm from '../theme/fontFm'
import { rspF, rspFL } from '../theme/responsive'
import colors from '../theme/colors'

const Home = () => {
  return (
    <View style={{...styles.container}}>
      <Text style={{...styles.title}}>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,...gStyles.col_center
  },
  title:{
    fontFamily: fontFm.bold, fontSize:rspF(20), lineHeight: rspFL(20),
    color: colors.black,
  }
})