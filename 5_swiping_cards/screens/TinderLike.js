import {View, Text} from 'react-native';
import React,{useState,useLayoutEffect} from 'react';

const TinderLike = ({type, superLikeOpacity}) => {

  const [color, setcolor] = useState('#fff')
  const [rotate, setrotate] = useState('0deg')

  useLayoutEffect(() => {
    if (type == 'Like') {
      setcolor('#00eda6')
      setrotate('-30deg')
    }
    else if (type == 'Nope') {
      setcolor('#FF0060')
      setrotate('30deg')
    }
    else {
      setcolor('#0d6df3')
      setrotate('0deg')
    }

    
  }, [])
  

  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          textTransform: 'uppercase',
          letterSpacing: 4,
          fontWeight: 'bold',
          color: color,
          borderWidth: 5,
          borderColor: color,
          padding: 5,
          borderRadius: 10,
          transform: [{rotate: rotate}],
        }}>
        {type}
      </Text>
    </View>
  );
};

export default TinderLike;
