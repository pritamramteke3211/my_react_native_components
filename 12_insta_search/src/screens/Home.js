import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useLayoutEffect, useRef} from 'react';
import {rspF, rspH, rspW, scrn_height, scrn_width} from '../theme/responsive';
import colors from '../theme/colors';
import FeIcon from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import fontFamilys from '../theme/fontFamilys';
import _ from 'lodash';
import Video from 'react-native-video';

const Home = ({navigation}) => {
  const [activeSearch, setactiveSearch] = useState(false);
  const [searchWord, setsearchWord] = useState('');

  let vidLis = [
    require('../assets/videos/vid_1.mp4'),
    require('../assets/videos/vid_2.mp4'),
    require('../assets/videos/vid_3.mp4'),
  ];
  // let arr = new Array(20).fill(0)
  let arr = Array.from(Array(121).keys());

  const [dataList, setdataList] = useState([]);
  const [activeIndx, setactiveIndx] = useState(0);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    console.log('hor index', viewableItems[0]);
    setactiveIndx(viewableItems[0]?.index);
    // setselectedIndex(viewableItems[0]?.index);
  }).current;

  useLayoutEffect(() => {
    let lis = _.cloneDeep(arr);
    let tmp_lis = [];

    let rowset = 0;
    let rowsetm = 0;

    let k = 0;
    for (const itm of arr) {
      console.log('k', k);
      let itms = lis.splice(0, 5).map((v, indxs) => {
        let obj = {title: v, content: vidLis[k + indxs]};
        return obj;
      });
      // console.log("itms",itms)
      if (itm > 0 && rowset % 2 == 0 && itm % 5 == 0) {
        tmp_lis.push([itms, rowsetm % 2 == 0]);
        rowset += 1;
      } else if (itm > 0 && itm % 6 == 0) {
        let itms = lis.splice(0, 6).map((v, indxs) => {
          let obj = {title: v, content: vidLis[k + indxs]};
          return obj;
        });
        console.log('itms', itms);
        tmp_lis.push([itms, null]);
        rowset += 1;
        rowsetm += 1;
      }
      k+=1
      if (lis.length == 0) {
        break;
      }
    }

    setdataList(tmp_lis);
  }, []);

  const renderItem = ({item, index}) => {
    let type = 'all';
    if (item[0]?.length == 5) {
      if (item[1]) {
        type = 'end';
      } else {
        type = 'start';
      }
    }

    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          // backgroundColor:'red',
          width: scrn_width,
          height: rspW(item[0].length > 3 ? 66 : 33),
          flexDirection: 'row',
          // justifyContent:'space-between',
          flexWrap: 'wrap',
          marginBottom: rspH(0.2),
        }}>
        {type == 'all' &&
          item[0].length > 0 &&
          item[0].map((v, indx) => {
            let last = (indx + 1) % 3 == 0;

            let mb = indx < 3;
            return (
              <View
                style={{
                  height: rspW(32.8),
                  width: rspW(33),
                  backgroundColor: 'green',
                  marginRight: last ? 0 : rspH(0.24),
                  marginBottom: mb ? rspH(0.2) : 0,
                }}
                key={indx}>
                {/* <Video
                  source={v?.content}
                  pause={true}
                  repeat={true}
                  muted={true}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode={'cover'}
                /> */}
              </View>
            );
          })}

        {item[0].length > 0 && type == 'end' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: scrn_width,
            }}>
            <View
              key={index}
              style={{
                flexDirection: 'row',

                width: scrn_width / 1.5,
                height: rspW(66),
                flexWrap: 'wrap',
                marginBottom: rspH(0.2),
              }}>
              {item[0].slice(0, 4).map((v, indx) => {
                let last = (indx + 1) % 2 == 0;

                let mb = indx < 2;
                return (
                  <View
                    style={{
                      height: rspW(32.8),
                      width: rspW(33),
                      backgroundColor: 'green',
                      marginRight: last ? 0 : rspH(0.24),
                      marginBottom: mb ? rspH(0.2) : 0,
                    }}
                    key={indx}>
                    <Video
                      source={vidLis[indx]}
                      pause={true}
                      repeat={true}
                      muted={true}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode={'cover'}
                    />
                  </View>
                );
              })}
            </View>

            <View
              style={{
                backgroundColor: 'green',
                height: rspW(65.8),
                width: scrn_width / 3.03,
              }}>
              <Video
                source={vidLis[index+5]}
                repeat={true}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode={'cover'}
              />
            </View>
          </View>
        )}

        {item[0].length > 0 && type == 'start' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: scrn_width,
            }}>
            <View
              style={{
                backgroundColor: 'green',
                height: rspW(65.8),
                width: scrn_width / 3.03,
              }}>
              {/* <Video
                source={item[0][0].content}
                repeat={true}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode={'cover'}
              /> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: scrn_width / 1.5,
                height: rspW(66),
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                marginBottom: rspH(0.2),
              }}>
              {item[0]?.slice(1, 5).map((v, indx) => {
                let first = (indx + 1) % 2 != 0;
                let mb = indx < 2;

                return (
                  <View
                    style={{
                      height: rspW(32.8),
                      width: rspW(33),
                      backgroundColor: 'green',
                      marginRight: first ? rspH(0.3) : 0,
                      marginBottom: mb ? rspH(0.2) : 0,
                    }}
                    key={indx}>
                    {/* <Video
                      source={v.content}
                      pause={true}
                      repeat={true}
                      muted={true}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode={'cover'}
                    /> */}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {!activeSearch ? (
        <View>
          <Pressable
            onPress={() => {
              setactiveSearch(true);
            }}
            style={{
              marginVertical: rspH(1),
              borderRadius: rspW(2),
              alignItems: 'center',
              paddingHorizontal: rspW(3),
              // alignSelf:'center',
              flexDirection: 'row',
              width: rspW(92),
              marginLeft: rspW(3),

              height: rspH(5),
              backgroundColor: colors.antiFlash,
            }}>
            <FeIcon
              style={{paddingRight: rspW(3.4)}}
              name="search"
              size={rspF(4.4)}
              color={colors.arsenic}
            />
            <Text
              style={{
                color: colors.battleShipGrey,
                fontSize: rspF(5),
                lineHeight: rspF(6),
                fontFamily: fontFamilys.regular,
              }}>
              Search
            </Text>
          </Pressable>

          <View style={{width: scrn_width, height: rspH(93.2)}}>
            <FlatList
              getItemLayout={(data, index) => ({
                length: rspH(33),
                offset: rspH(33) * index,
                index,
              })}
              //   onViewableItemsChanged={viewableItemsChanged}
              keyExtractor={(item, index) => index}
              data={dataList}
              renderItem={renderItem}
            />
          </View>
        </View>
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MCIcon
            onPress={() => {
              setactiveSearch(false);
            }}
            style={{paddingHorizontal: rspW(3.4)}}
            name="keyboard-backspace"
            size={rspF(8)}
            color={colors.black}
          />
          <Pressable
            style={{
              marginVertical: rspH(1),
              borderRadius: rspW(2),
              alignItems: 'center',
              paddingHorizontal: rspW(3),
              // alignSelf:'center',
              flexDirection: 'row',
              width: rspW(80),
              // marginLeft: rspW(3),

              height: rspH(5),
              backgroundColor: colors.antiFlash,
            }}>
            <FeIcon
              style={{paddingRight: rspW(3.4), opacity: 0.3}}
              name="search"
              size={rspF(4.4)}
              color={colors.arsenic}
            />
            {/* <Text style={{color:colors.battleShipGrey, fontSize: rspF(5), lineHeight: rspF(6),
    fontFamily: fontFamilys.regular,
    }}>Search Active</Text> */}

            <TextInput
              placeholder={'Search Here'}
              placeholderTextColor={colors.battleShipGrey}
              value={searchWord}
              onChangeText={val => {
                setsearchWord(val);
              }}
              style={{
                color: colors.black,
                fontSize: rspF(5),
                // paddingTop: rspH(1),
                // lineHeight: rspF(8),
                fontFamily: fontFamilys.regular,
              }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
