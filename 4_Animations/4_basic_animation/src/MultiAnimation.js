import {StyleSheet, Text, View, TouchableOpacity, Animated, Easing} from 'react-native';
import React, {useRef, useState} from 'react';

const ButtonA = ({name, funct, aniS}) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 5,
        width: 200,
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        funct();
      }}>
      <Text style={{color: 'white'}}> {aniS ? name : 'Stop ' + name} </Text>
    </TouchableOpacity>
  );
};

const MultiAnimation = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const trany_ani = useRef(new Animated.Value(0)).current;
  const tranx_ani = useRef(new Animated.Value(0)).current;
  const rotate_ani = useRef(new Animated.Value(0)).current;
  const radiud_ani = useRef(new Animated.Value(0)).current;
  
  const [rot_ani, setrot_ani] = useState(false)
  const [x_ani, setx_ani] = useState(false)




  const jumpFun = () => {
    Animated.timing(trany_ani, {
      toValue: 1,
      duration: 500, // while timing
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(trany_ani, {
        toValue: 0,
        duration: 500, // while timing
        useNativeDriver: true,
      }).start(() => {});
    });
  };

  const moveFun = () => {
           
    Animated.timing(tranx_ani, {
      toValue: 1,
      duration: 500, // while timing
      useNativeDriver: true,
    }).start()

  };

  const rotateFun = () => {
    Animated.loop(
      Animated.timing(rotate_ani, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const jumpA = trany_ani.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });

  const moveA = tranx_ani.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const scalA = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  const bRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const rotA = rotate_ani.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          {width: 100, height: 100, backgroundColor: 'orange', bottom: 50},
          {
            transform: [
              {
                translateY: jumpA,
              },
              {
                rotate: rotA,
              },
              {
                translateX: moveA,
              },
              {
                scale: scalA,
              },
            ],
            borderRadius: bRadius,
          },
        ]}
      />

      <ButtonA
        name={'Jump'}
        funct={() => {
          jumpFun();
        }}
        aniS={true}
      />

<ButtonA
        name={'Move'}
        funct={() => {
            if (!x_ani) {
                moveFun();  
                setx_ani(true)    
            }
            else{
                tranx_ani.setValue(0)
                setx_ani(false)
            }
          
        }}
        aniS={!x_ani}
      />


      <ButtonA
        name={'Rotate'}
        funct={() => {
        if (!rot_ani) {
            rotateFun();
            setrot_ani(true)    
        }
        else{
            rotate_ani.setValue(0)
            setrot_ani(false)
        }
        
        }}
        aniS={!rot_ani}
      />
    </View>
  );
};

export default MultiAnimation;

const styles = StyleSheet.create({});
