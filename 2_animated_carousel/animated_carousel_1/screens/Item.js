import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Paginator from './Paginator'

const Item = ({item}) => {
    const { width,height } = useWindowDimensions()
    
  return (
    <View style={[styles.container, { width }]}>

    
        <Image source={item.image} style={[styles.image,
        {
          width,
          height: height/2,
      resizeMode:'contain',
        }]} />
    
      <View 
      style={{flex:0.3}}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
      image:{
        flex: 0.7,
        justifyContent:'center',
      },
      title:{
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d84',
        textAlign:'center',
      },

      description:{
        fontSize: 16,
        fontWeight:'300',
        color: '#62656b',
        textAlign:'center',
        paddingHorizontal: 64,
      },
})