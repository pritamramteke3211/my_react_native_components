import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import IoIcon from 'react-native-vector-icons/Ionicons'
import { rspF, rspH, rspW } from '../theme/responsive'
import colors from '../theme/colors'

const Header = ({title='', backPress=null}) => {
  return (
    <View style={styles.cont}>
        <TouchableOpacity>
            <IoIcon
            name={'chevron-back'}
            size={rspF(12)}
            color={colors.black}
            />
        </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text>{'   '}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  cont:{
    flexDirection:'row', justifyContent:'space-between',
  paddingHorizontal: rspW(2),
  height: rspH(7),
  backgroundColor: colors.extraLightPurple,
  alignItems:'center'},
  title:{
    fontSize: rspF(11),
    color: colors.black,
  },
})