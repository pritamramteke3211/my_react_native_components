import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const SearchBox = () => {

    const animation = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(()=>{
        return{
      width  :  animation.value == 1? withTiming(300, {duration: 500})
      :
      withTiming(0, {duration: 500})
    }
    })

    const [value, setvalue] = useState(0)

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Animated.View
      style={[{
        width: 300,
        height: 50,
        backgroundColor:'#E7E7E7',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems:'center',
        // justifyContent:'center',
      },
      animatedStyle
    ]}
      >
        <TextInput style={{width : '85%'}} placeholder={'Search here...'} />
        <TouchableOpacity onPress={() => {
            if (animation.value == 1) {
                animation.value = 0;
                setvalue(0)
            }
            else{
                animation.value = 1;
                setvalue(1)
            }
        }}>
          
            <Image
            source={value == 1 ?
                 require('./clear.png')
                : require('./search.png')
                
                }
            style={{width: value == 1 ? 20:30, height: value == 1 ? 20:30, 
              tintColor: '#415ee2'
            }}
            />
            
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create({})