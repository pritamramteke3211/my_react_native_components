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

const PinchHandler2 = () => {
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (e, c) => {
      c.startScale = scale.value;
    },
    onActive: (e, c) => {
      scale.value = c.startScale * e.scale;
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
      transform: [{scale: scale.value}],
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

export default PinchHandler2;

const styles = StyleSheet.create({});
