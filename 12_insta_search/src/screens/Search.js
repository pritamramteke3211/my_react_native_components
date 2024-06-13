import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const Search = () => {
  return (
    <View>
      <Video
        source={require(`../assets/videos/vid_4.mp4`)}
        style={{
          height: '100%',
          width: '100%',
        }}
        resizeMode={'cover'}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
