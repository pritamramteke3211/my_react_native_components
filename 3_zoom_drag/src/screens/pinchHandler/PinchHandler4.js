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

const PinchHandler4 = () => {
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [lastOffset, setLastOffset] = useState({x: 0, y: 0});
  const [lastScale, setLastScale] = useState(1);

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.lastOffsetX = translateX.value;
      context.lastOffsetY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.lastOffsetX + event.translationX;
      translateY.value = context.lastOffsetY + event.translationY;
    },
    onEnd: () => {
      // setLastOffset({
      // x: translateX.value,
      // y: translateY.value,
      // });
    },
  });

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (e, c) => {
      c.startScale = scale.value;
    },
    onActive: (e, c) => {
      scale.value = c.startScale * e.scale;
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

export default PinchHandler4;
