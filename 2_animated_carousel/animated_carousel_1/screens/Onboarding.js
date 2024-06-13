import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Item from './Item'
import Paginator from './Paginator'
import NextButton from './NextButton'
import AsyncStorage from '@react-native-async-storage/async-storage'


const slides = [
    {
        id: 1,
        title:'Quick & Easy Payments',
        description: 'Grow your business by accepting card payments with the new card reader.',
        image: require('../assets/images/slide.png'),
    },
    {
        id: 2,
        title:'Smart Point of Sale',
        description: 'Complete point of sale  software tailored to your business needs.',
        image: require('../assets/images/slide2.png'),
    },
    {
        id: 3,
        title:'Instant Notifications',
        description: 'Instant notification let your quickly see new purchases and messges.',
        image: require('../assets/images/slide3.png'),
    },
]

const Onboarding = () => {

  const [currentIndex, setcurrentIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current

  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems}) =>{
    setcurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index : currentIndex + 1 })
    }
    else{
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true')
      } catch (err) {
        console.log(`Error @setItem : `, err)
      }
    }
  }

  return (
    <View 
     style={styles.container}
    >
      <View style={{flex: 3}}>
        <FlatList
          data={slides}
          renderItem={({item}) => <Item item={item}/> }
          keyExtractor={(innerItem) => innerItem.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{ nativeEvent:{ contentOffset: {x : scrollX}} }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length) } />
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0daceb9f',
    alignItems: 'center',
    justifyContent: 'center',
  },
})