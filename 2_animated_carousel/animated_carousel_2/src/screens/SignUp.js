/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
const { width, height } = Dimensions.get('window');



import { getMovies } from './api';
import Genres from './Genres';
import Rating from './Rating';
import LinearGradient from 'react-native-linear-gradient';
import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from '../assets';
import { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Paginator from './Paginator';
import gStyles from '../gStyles/gStyles';



const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;

export default function SignUp() {
  const [movies, setMovies] = React.useState([Img1,Img2,Img3,Img4,Img5,Img6,Img7,Img8]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [currentIndx, setcurrentIndx] = React.useState(0)

  const [offSet, setoffSet] = React.useState(0)

  const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    // To set current Item index to show active carousel item
    const viewableItemsChanged = React.useRef(({ viewableItems }) => {
      setcurrentIndx(viewableItems[0]?.index);
    }).current;


  return (
    <View style={styles.container}>
      
      <View style={{width:width, alignSelf:'center'}}>
      <Animated.FlatList

        
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item, index) => index}
        horizontal
        
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={width}

        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemsChanged}

        // snapToAlignment='start'
        

        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        
        pagingEnabled
        scrollEventThrottle={32}
        renderItem={({ item, index }) => {

          console.log("\n",index)
          console.log(" (index - 1) * width", (index - 1) * width)
          console.log("index * width",  index * width)

          console.log("(index + 1) * width",(index + 1) * width)

          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          let otuRng = ['15deg', '0deg', '-15deg']

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: otuRng,
            extrapolate: 'clamp',
          });

          console.log(translateX)

          
          

          return (
            <View style={{ width: width, alignItems:'center', justifyContent:'center',height: height/1.5,
            // backgroundColor:'red',
           
             }}>
            
              <Animated.View
              
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,

                  alignItems: 'center',
                  transform: [{ rotateZ: translateX }],
                //  marginRight: leftCard ? - (width * 0.2) : 0,
                  // position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: 34,
                  width: ITEM_SIZE,
                  shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
                }}
              >
                <Image
                  source={item}
                  style={styles.posterImage}
                />
                
               
                
              </Animated.View>
            </View>
          );
        }}
      />
      <View style={{marginTop:20}}>
      <Paginator
                      data={movies}
                      currentIndex={currentIndx}
                    />
                    </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
    //  width: 200,
    //  height: 300,
  },
});