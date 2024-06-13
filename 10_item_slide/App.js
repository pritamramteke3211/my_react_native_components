import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated,{useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import ADIcon from 'react-native-vector-icons/AntDesign'

const App = () => {

  const animation = useSharedValue(0)
  

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
        ctx.startX = animation.value
    },
    onActive:(event, ctx)=>{
      animation.value = ctx.startX + event.translationX;
    },
    onEnd:(event, ctx)=>{
      animation.value = withSpring(0)
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }]
    }
  })
  
  const animatedIconLeft= useAnimatedStyle(()=>{
    return{
      transform: [
        {scale: animation.value > 60 ? withSpring(2) : withSpring(1)},
      ],
    }
  })

  const animatedIconRight= useAnimatedStyle(()=>{
    return{
      transform: [
        {scale: animation.value < -50 ? withSpring(2) : withSpring(1)},
      ],
    }
  })

  return (
    <GestureHandlerRootView
    style={{flex:1}}
    >
      <View style={{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
}}>
  <PanGestureHandler
  onGestureEvent={gestureHandler}
  onHandlerStateChange={({ nativeEvent }) => {
    // Handle gesture state change here
    console.log("nativeEvent.state",nativeEvent.state)
    if (nativeEvent.state === 5) {
      // Gesture ended (5 is the state for "END")
      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
      console.log("END")
    }
  }}
  >
      <Animated.View style={[{
        backgroundColor: 'green',
        width: '100%',
        height: 100,
        elevation: 5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius: 10,
      }]}>
        <Animated.View style={[{
          width: 14, 
        height: 14,
           marginLeft: 20,
           }, animatedIconLeft]}>
            <Image
            source={{uri:'https://png.pngtree.com/element_our/sm/20180626/sm_5b321ca31dc13.jpg'}}
            style={{width:'100%', height:'100%'}}
            />
           </Animated.View>

           <Animated.View style={[{
          width: 14, 
        height: 14,
           marginRight: 20,
           },animatedIconRight]}>
            <Image
            source={{uri:'https://png.pngtree.com/element_our/sm/20180626/sm_5b321ca31dc13.jpg'}}
            style={{width:'100%', height:'100%'}}
            />
           </Animated.View>
        <Animated.View
        style={[{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
        borderRadius: 10,
          flexDirection:'row',
          alignItems:'center',
        },
        animatedStyle
      ]}
        >
          <View
          style={{
            width: 50,
            height: 50,
            backgroundColor:'purple',
            borderRadius: 25,
            marginLeft: 20,
            justifyContent:'center',
            alignItems:'center',
          }}
          >
            <Text
            style={{color:'white', fontSize: 30,  fontWeight: '600'}}
            >A</Text>
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize:20, fontWeight:'700', color:'black'}}>Demo title</Text>
            <Text>Demo title</Text>

          </View>
        </Animated.View>
      </Animated.View>
      </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  }
})