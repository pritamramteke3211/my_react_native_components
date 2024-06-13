import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'

const ColorSelector = ({cColor, setcColor}) => {


    const rainbowColors = [
        "#000000",
        "#FF0000", // Red
        "#FF7F00", // Orange
        "#FFFF00", // Yellow
        "#00FF00", // Green
        "#0000FF", // Blue
        "#4B0082", // Indigo
        "#9400D3", // Violet
        "#FFFFFF",
    ];

    const renderItem = useCallback(
        ({item})=>{
          return(
            <TouchableOpacity
            onPress={()=> setcColor(item)}
            style={{width: 30, height:30, borderRadius:15, borderWidth:1, borderColor:'#000000', backgroundColor: item, marginRight: 5}} />
          )
        },
        [rainbowColors],
      )
      
    
    
  return (
    <FlatList
    data={rainbowColors}
    horizontal
    renderItem={renderItem}
    keyExtractor={(item,index)=> index}
    />
  )
}

export default memo(ColorSelector)

const styles = StyleSheet.create({})