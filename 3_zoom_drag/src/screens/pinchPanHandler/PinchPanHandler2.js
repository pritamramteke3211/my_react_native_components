import React, {useRef, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {scrn_height, scrn_width} from '../../styles/rStyle';

const imageUri =
  'https://images.pexels.com/photos/17059449/pexels-photo-17059449/free-photo-of-wooden-armchair-and-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const PinchPanHandler2 = () => {
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const pinchPointers = useSharedValue(1);

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, c) => {
      if (pinchPointers.value == 1) {
        c.startX = translateX.value;
        c.startY = translateY.value;
      }
    },
    onActive: (e, c) => {
      console.log('Pan Active', pinchPointers.value);
      if (pinchPointers.value == 1) {
        translateX.value = c.startX + e.translationX;
        translateY.value = c.startY + e.translationY;
      }
    },
    onEnd: () => {
      //   console.log("translateX.value", translateX.value)
      //   console.log("scale.value * -30",  -30 * scale.value )
      //   console.log("dif", translateX.value - (-30 * scale.value))
      //   if (scale.value < 1.2) {
      // if (translateX.value <  scale.value * -30
      //     // || translateX.value > scale.value *  30
      //     ) {
      //     translateX.value = withSpring(0)
      //   }
      //   if (translateY.value < -60 || translateY.value > 60) {
      //     translateY.value = withSpring(0)
      //   }
      //   }
    },
  });

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (e, c) => {
      pinchPointers.value = e.numberOfPointers;
      if (e.numberOfPointers) {
        c.startScale = scale.value;
      }
    },
    onActive: (e, c) => {
      pinchPointers.value = e.numberOfPointers;

      if (e.numberOfPointers > 1) {
        scale.value = c.startScale * e.scale;
      }
    },
    onEnd: () => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
      }
      // else if (scale.value > 3) {
      //   scale.value = withSpring(3);
      // }
    },
  });

  const panStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const pinchStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        ref={pinchRef}
        simultaneousHandlers={panRef}
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchGestureEvent}>
        <Animated.View style={[styles.imageContainer, pinchStyle]}>
          <PanGestureHandler
            ref={panRef}
            simultaneousHandlers={pinchRef}
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanGestureEvent}>
            <Animated.Image
              source={{uri: imageUri}}
              style={[styles.image, panStyle]}
            />
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: scrn_width,
    height: scrn_height,
    resizeMode: 'contain',
  },
});

export default PinchPanHandler2;
