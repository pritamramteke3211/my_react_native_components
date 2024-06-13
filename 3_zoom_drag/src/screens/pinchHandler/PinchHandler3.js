import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {safe_height, scrn_height, scrn_width} from '../../styles/rStyle';

const boxValue = 140;
const imageUri =
  'https://images.pexels.com/photos/17059449/pexels-photo-17059449/free-photo-of-wooden-armchair-and-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const PinchHandler3 = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (e, c) => {
      c.startScale = scale.value;
    },
    onActive: (e, c) => {
      scale.value = c.startScale * e.scale;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    },
    onEnd: (e, c) => {
      console.log('scale.value', scale.value);
      if (scale.value < 1) {
        scale.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -scrn_width / 2},
        {translateY: -scrn_height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: scrn_width / 2},
        {translateY: scrn_height / 2},
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <PinchGestureHandler onGestureEvent={gestureHandler}>
          <Animated.Image
            source={{uri: imageUri}}
            style={[
              {
                width: scrn_width,
                height: safe_height,
              },
              animatedStyle,
            ]}
            // resizeMode='contain'
          />
        </PinchGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PinchHandler3;

const styles = StyleSheet.create({});
