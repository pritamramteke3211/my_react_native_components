import { StyleSheet, Text, View,Animated, Image, Dimensions } from 'react-native'
import React, { useCallback,useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TinderLike from './TinderLike'

const { height, width } = Dimensions.get('window')

const SwipeCard = ({item, isFirst, swipe,leftX,rightX,upY,scaleValue, ...rest}) => {


  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = leftX.interpolate({
    inputRange: [20, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const superLikeOpacity = 
  upY.interpolate({
    inputRange: [-100, -20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const rejectOpacity = rightX.interpolate({
    inputRange: [-100, -20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });


 

  const renderChoice = useCallback(() => {

    return (
      <>
        <Animated.View
          style={[
            {position: 'absolute', top: 100, left: 20},
            {opacity: likeOpacity},
          ]}>
          <TinderLike type={'Like'}  />
        </Animated.View>
        
        <Animated.View
          style={[
            {position: 'absolute', top: 100, right: 20},
            {opacity: rejectOpacity},
          ]}>
          <TinderLike type={'Nope'} />
        </Animated.View>

  
        <Animated.View
          style={[
            {position: 'absolute', top: 400},
            {opacity:  superLikeOpacity},
          ]}>
            
          <TinderLike type={'Super Like'} />
        </Animated.View>
        
      </>
    );
  }, []);



  return (
    <Animated.View style={[{
      width: width - 20,
      height: height - 200,
      position: 'absolute',
      top: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center', 
      transform: [{
        scale: !isFirst ? scaleValue : 1,
      }]
    },
    isFirst && {
      transform: [
        ...swipe.getTranslateTransform(),
         {rotate: rotate}
        ],
    },
    ]} key={item.id}
    {...rest}
    >
      <Image source={item.image} style={{width: '100%', height: '100%',borderRadius: 20}} />
      {isFirst && renderChoice()}

      {/* To Add Blur Effect on Image */}
      <LinearGradient
        colors={['transparent', 'transparent', 'rgba(0,0,0,0.5)']}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          borderRadius: 20,
        }}>
        <Text
          style={{
            position: 'absolute',
            bottom: 20,
            left: 30,
            fontSize: 40,
            color: '#FFF',
          }}>
          {item.title}
        </Text>
      </LinearGradient>
    </Animated.View>
  )
}

export default SwipeCard

const styles = StyleSheet.create({})