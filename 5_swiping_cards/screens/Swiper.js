import { StyleSheet, Text, View,PanResponder,Animated,TouchableOpacity,Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef, useCallback, startTransition } from 'react'
import SwipeCard from './SwipeCard'

const { height, width } = Dimensions.get('window')


const Swiper = () => {

  const [data, setData] = useState([
    {image: require('../images/hulk.webp'), id: 1, title: 'Hulk'},
    {image: require('../images/ironman.webp'), id: 2, title: 'Ironman'},
    {image: require('../images/thor.jpeg'), id: 3, title: 'Thor'},
    {image: require('../images/superman.webp'), id: 4, title: 'Superman'},
    {image: require('../images/groot.webp'), id: 5, title: 'Groot'},
    {
      image: require('../images/blackpanther.webp'),
      id: 6,
      title: 'Black Panther',
    },
    {image: require('../images/drstrange.jpeg'), id: 7, title: 'Dr Strange'},
    {image: require('../images/blackwidow.jpeg'), id: 8, title: 'Black Widow'},
  ]);

  const [refresh, setrefresh] = useState(false)

  useEffect(() => {
    if (!data.length) {
      setData([
        {image: require('../images/hulk.webp'), id: 1, title: 'Hulk'},
        {image: require('../images/ironman.webp'), id: 2, title: 'Ironman'},
        {image: require('../images/thor.jpeg'), id: 3, title: 'Thor'},
        {image: require('../images/superman.webp'), id: 4, title: 'Superman'},
        {image: require('../images/groot.webp'), id: 5, title: 'Groot'},
        {
          image: require('../images/blackpanther.webp'),
          id: 6,
          title: 'Black Panther',
        },
        {
          image: require('../images/drstrange.jpeg'),
          id: 7,
          title: 'Dr Strange',
        },
        {
          image: require('../images/blackwidow.jpeg'),
          id: 8,
          title: 'Black Widow',
        },
      ]);
    }
  }, [data.length]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const leftX = useRef(new Animated.Value(0)).current;
  const rightX = useRef(new Animated.Value(0)).current;
  const upY = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  const scaleAnimation = () => {
    Animated.timing(scaleValue, {
      fromValue: 0.9,
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(()=>{
      
    });
  };
 

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {

      const ym = dy < 0 ? dy : 0

      if (dx > -30 && dx < 30) {
    
        if (dy < 0) {
          upY.setValue(dy)   
        }
        leftX.setValue(0)
        rightX.setValue(0)
      }
      else{
        upY.setValue(0)  
        if (dx < -30) {
          rightX.setValue(dx)
        }
        if (dx > 30) {
          leftX.setValue(dx)
        }
      }
     
      //  setrefresh(!refresh)
      swipe.setValue({x: dx, y: ym});

      
    
    },
    onPanResponderRelease: (_, {dx, dy}) => {


      const direction = Math.sign(dx);
      const isActionActiove = Math.abs(dx) > 200;
      const isUp = Math.abs(dy) > 180;

      scaleAnimation()

      if (isActionActiove && !isUp) {
        Animated.timing(swipe, {
          toValue: {x: direction * 500, y: dy},
          useNativeDriver: true,

          duration: 200,
        }).start(removeCard);
      } 
      else if (isUp) {
        Animated.timing(swipe, {
          toValue: {x: dx, y: -500},
          useNativeDriver: true,
          duration: 200,
        }).start(removeCard);
      }
      else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();

      leftX.setValue(0)
      rightX.setValue(0)
      upY.setValue(0)
      }
      
    },
  });

  const removeCard = useCallback(() => {
    scaleValue.setValue(0.9)

    leftX.setValue(0)
      rightX.setValue(0)
      upY.setValue(0)
    setData(prevState => prevState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);



  const handleChoiceButtons = useCallback(
    direction => {
      scaleAnimation()
      if (direction == 0) {
        
        Animated.timing(swipe.y, {
          toValue: - 500,
          duration: 200,
          useNativeDriver: true,
        }).start(removeCard);     
      }
      else{
      Animated.timing(swipe.x, {
        toValue: direction * width,
        duration: 500,
        useNativeDriver: true,
      }).start(removeCard);
    }
    },
    [removeCard, swipe.x],
  );

  return (
    <View style={{flex:1}}> 
     {
      data.map((item, idx) => {
        const isFirst = idx === 0;
        const dragHandlers = isFirst ? panResponder.panHandlers : {}
        return (
        <SwipeCard
        key={idx} 
        item={item}
        isFirst={isFirst}
        swipe={swipe}
        scaleValue={scaleValue}
        leftX={leftX}
        rightX={rightX}
        upY={upY}
        {...dragHandlers}
        />
        )
      }).reverse() // To show in ascending order
     } 
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          bottom: 30,
          zIndex: -1,
        }}>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#fff',
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPressIn={()=> {
            
            rightX.setValue(-100)
          }}
          onPressOut={()=> {
            
            handleChoiceButtons(-1);
          }}
          >
          <Image
            source={require('../images/cancel.png')}
            style={{width: 34, height: 34, tintColor: '#FF0060'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#fff',
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // onPress={() => {
          //   handleChoiceButtons(0);
          // }}
          onPressIn={()=> {
           
            upY.setValue(-100)
          }}
          onPressOut={()=> {
            
            handleChoiceButtons(0);
          }}
          >
          <Image
            source={require('../images/logo_rating.png')}
            style={{width: 40, height: 40, 
              tintColor: '#008aed'
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#fff',
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          
          onPressIn={()=> {
           
            leftX.setValue(100)
          }}
          onPressOut={()=> {
            
            handleChoiceButtons(1);
          }}
          
          >
          <Image
            source={require('../images/heart.png')}
            style={{width: 40, height: 40, 
              tintColor: '#00eda6'
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
 
export default Swiper

const styles = StyleSheet.create({})