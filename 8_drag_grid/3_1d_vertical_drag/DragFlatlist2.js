import React, { useRef } from 'react';
import { View, Text, FlatList, PanResponder, Animated, StyleSheet } from 'react-native';

const DragFlatlist2 = () => {

  const data = [
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
    // Add more items as needed
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        scrollX.setValue(-dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;
        const threshold = 0.4;
        const itemWidth = 100; // Adjust the width of your list item
        const snapToOffset = Math.round(dx / itemWidth) * itemWidth;

        if (Math.abs(vx) >= threshold) {
          Animated.decay(scrollX, {
            velocity: vx,
            deceleration: 0.997,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(scrollX, {
            toValue: -snapToOffset,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          marginHorizontal: 8,
          alignSelf: 'flex-start',
        }}
      >
        <Text>{item.title}</Text>
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: scrollX }],
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />
      </Animated.View>
    </View>
  );

}

export default DragFlatlist2

const styles = StyleSheet.create({})