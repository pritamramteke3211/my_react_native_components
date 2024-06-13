import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
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

const PanHandler2 = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (e, c) => {
      c.startX = x.value;
      c.startY = y.value;
    },
    onActive: (e, c) => {
      x.value = c.startX + e.translationX;
      y.value = c.startY + e.translationY;
    },
    onEnd: (e, c) => {
      // console.log("x.value", x.value, x.value + boxValue , scrn_width)
      console.log('y.value', y.value);
      console.log(scrn_height, safe_height);
      if (x.value < 0) {
        x.value = withSpring(
          0,
          // {duration: 1000}
        );
      }
      if (x.value + boxValue > scrn_width) {
        x.value = withSpring(
          scrn_width - boxValue,
          //  {duration: 1000}
        );
      }

      if (y.value < 0) {
        y.value = withSpring(
          0,
          // {duration: 1000}
        );
      }

      if (y.value + boxValue > safe_height) {
        y.value = withSpring(
          safe_height - boxValue,
          // {duration: 1000}
        );
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {width: boxValue, height: boxValue, backgroundColor: 'orange'},
              animatedStyle,
            ]}
          />
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PanHandler2;

const styles = StyleSheet.create({});
