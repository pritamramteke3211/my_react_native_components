import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Joker1, Joker2 } from './assets'
import Animated,{ useSharedValue,useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated'

const FlipCard = () => {

    const spin = useSharedValue(0)
    const frontStyle = useAnimatedStyle(()=>{
      const spinValue = interpolate(spin.value, [0,1],[0,180])  
      return {
        transform: [{rotateY: withTiming(`${spinValue}deg`)}],
      };
    });

    const backStyle = useAnimatedStyle(()=>{
        const spinValue = interpolate(spin.value, [0,1],[180,360])  
        return {
          transform: [{rotateY: withTiming(`${spinValue}deg`)}],
        };
      });
  



  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <View>
            <Animated.View
            style={[{
                height: 400,
                width: 250,
                backgroundColor: '#D8D9CF',
                borderRadius: 16,
                position: 'absolute',
                alignItems: 'center',
                justifyContent:'center'
            },frontStyle]}
            >
      <Image
      source={Joker2}
      style={{width: '100%', height: '100%', borderRadius: 10}}
      />
      </Animated.View>
      <Animated.View
      style={[{
        height: 400,
        width: 250,
        backgroundColor: '#FF8787',
        borderRadius: 16,
        // position: 'absolute',
        backfaceVisibility:'hidden',
        alignItems: 'center',
        justifyContent:'center'
      },backStyle]}
      >
      <Image
      source={Joker1}
      style={{width: '100%', height: '100%', borderRadius: 10}}
      />
      </Animated.View>


      </View>
      <Text
      style={{
        marginTop: 50,
        borderWidth: 1,
        padding: 10,
        color: 'black',
        borderRadius: 10,
      }}
      onPress={()=> {
        spin.value = spin.value == 0 ? 1:0
      }}
      >
        Flip Card
      </Text>

    </View>
  )
}

export default FlipCard

const styles = StyleSheet.create({})