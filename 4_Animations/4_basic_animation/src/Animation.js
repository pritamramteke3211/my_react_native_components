import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useState} from 'react';

const Animation = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [btnClicked, setbtnClicked] = useState(false);

  const startAnimation = () => {
    Animated.spring(animation, {
      toValue: btnClicked ? 0 : 1,
      // duration: 700, // while timing
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          {width: 100, height: 100, backgroundColor: 'orange'},
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.5],
                }),
              },
            ],
            borderRadius: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 50],
            }),
          },
        ]}
      />

      <TouchableOpacity
        style={{
          marginTop: 50,
          width: 200,
          height: 50,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setbtnClicked(!btnClicked);
          startAnimation();
        }}>
        <Text style={{color: 'white'}}>Start Animation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});
