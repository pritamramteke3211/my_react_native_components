import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

const UpTransitionView = () => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateUp();
  }, []);

  const animateUp = () => {
    Animated.timing(translateY, {
      toValue: 1, // Adjust the value to control the amount of the upward transition
      duration: 5000, // Adjust the duration as needed
      easing: Easing.ease, // You can use different easing functions for different effects
      useNativeDriver: false, // Required for some animations
    }).start();
  };

  const heg = translateY.interpolate({
    inputRange: [0,1],
    outputRange: [0,400]
  })

  return (
    
    
      <Animated.View style={{  marginTop: 100,backgroundColor: 'blue', height: heg, width: 100 }}>
        <Text>Transition Up</Text>
      </Animated.View>

  );
};

export default UpTransitionView;