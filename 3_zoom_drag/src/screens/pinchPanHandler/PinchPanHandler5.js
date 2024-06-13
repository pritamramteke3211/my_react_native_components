import React, {useRef, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
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
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import {scrn_height, scrn_width} from '../../styles/rStyle';

const imageUri =
  'https://images.pexels.com/photos/17059449/pexels-photo-17059449/free-photo-of-wooden-armchair-and-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

const PinchPanHandler5 = () => {
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const limitX = useSharedValue(false);

  const pinchPointers = useSharedValue(1);

  const pnREf = useRef(null);
  const boxRef = useRef(null);

  const check = () => {
    boxRef.current.measure((x, y, width, height, pageX, pageY) => {
      // console.log("boxRef",'pageX',pageX)
    });

    pnREf.current.measure((x, y, width, height, pageX, pageY) => {
      // For Horizontal
      let diff = width - scrn_width;
      let rt = width / scrn_width;
      let tx = scrn_width * 0.147 * rt + diff * 0.03;
      let pageX2 = pageX + diff;
      let percXp = (pageX / scrn_width) * 100;
      let percXpm = (pageX2 / scrn_width) * 100;

      if (percXp > 14.75) {
        translateX.value = withTiming(tx);
      } else if (percXpm < -14.75) {
        translateX.value = withTiming(-tx);
      }

      // For Vertical
    });
  };

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, c) => {
      if (pinchPointers.value == 1) {
        c.startX = translateX.value;
        c.startY = translateY.value;
      }
    },
    onActive: (e, c) => {
      // console.log("Pan Active", pinchPointers.value)

      if (pinchPointers.value == 1) {
        translateX.value = c.startX + e.translationX;
        translateY.value = c.startY + e.translationY;
      }
    },
    onEnd: () => {
      console.log('\n');
      // console.log('translateX.value', translateX.value);

      runOnJS(check)();

      // console.log("limitX", limitX.value)

      // if (translateX.value < -limitX) {
      //   translateX.value = withSpring(-limitX);
      // }
      // if (translateX.value > limitX) {
      //   translateX.value = withSpring(limitX);
      // }

      // if (translateY.value < scale.value * -40) {
      //   translateY.value = withSpring(scale.value * -40);
      // }
      // if (translateY.value > scale.value * 40) {
      //   translateY.value = withSpring(scale.value * 40);
      // }
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
      if (e.numberOfPointers) {
        // scale.value = c.startScale * e.scale;
        scale.value = c.startScale * e.scale;
      }
    },
    onEnd: (e, c) => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
      }

      if (scale.value > 2) {
        scale.value = withSpring(2);
      }
    },
  });

  const panStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const pinchStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={panRef}
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchGestureEvent}>
          <Animated.View
            style={[styles.imageContainer, pinchStyle, {elevation: 20}]}>
            <PanGestureHandler
              ref={panRef}
              simultaneousHandlers={pinchRef}
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={onPanGestureEvent}>
              <Animated.Image
                ref={pnREf}
                source={{uri: imageUri}}
                style={[styles.image, panStyle]}
              />
            </PanGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>

      <View
        ref={boxRef}
        style={{
          position: 'absolute',
          top: 175,
          left: 60,
          elevation: 30,
          height: scrn_height / 1.8,
          width: scrn_width - 120,
          borderWidth: 1,
          borderColor: 'red',
        }}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    width: scrn_width,
    height: scrn_height,
    resizeMode: 'contain',
  },
});

export default PinchPanHandler5;
