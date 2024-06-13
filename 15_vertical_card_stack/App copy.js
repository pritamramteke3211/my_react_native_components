import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardAnim from './src/screens/CardAnim'


const App = () => {

  const dataList = [
    {
    "name": 'Josh Nelson',
    "age": 30,
    "location": 'San Francisco, CA',
    "pImg": 'https://images.pexels.com/photos/1683492/pexels-photo-1683492.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    "name": "Emily Smith",
    "age": 28,
    "location": "New York, NY",
    "pImg": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    "name": "Michael Johnson",
    "age": 35,
    "location": "Los Angeles, CA",
    "pImg": "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    "name": "Sarah Brown",
    "age": 32,
    "location": "Chicago, IL",
    "pImg": "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=600"
  },

  {
  "name": "David Lee",
  "age": 29,
  "location": "Austin, TX",
  "pImg": "https://images.pexels.com/photos/936773/pexels-photo-936773.jpeg?auto=compress&cs=tinysrgb&w=600"
},
{
  "name": "Jessica Martinez",
  "age": 27,
  "location": "Miami, FL",
  "pImg": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600"
},
{
  "name": "Daniel Kim",
  "age": 31,
  "location": "Seattle, WA",
  "pImg": "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600"
},

]

  return (
    <CardAnim
    // dataList={dataList}
    // cardDistance={134}
    // cardColor={'#59d843'}
    // renderContent={(item,index) => (
    //     <ImageBackground source={{uri: item.pImg}} style={{width: '100%', height: '100%', justifyContent:'flex-end'}} >
    //     <View style={{height:'25%', backgroundColor:'#00000084', paddingHorizontal: 15, alignItems:'flex-start', justifyContent:'center'}}>
    //   <Text style={{fontSize: 16,
    //   lineHeight: 17,
    //     fontWeight: 'bold',
    //     color: '#cde9e4'}}>{item.name}</Text>
    //     <View style={{flexDirection:'row'}}>
    //     <Text style={{fontSize: 14,
    //     color: '#cde9e4'}}>{item.age} yrs . </Text>
    //     <Text style={{fontSize: 14,
    //     color: '#cde9e4'}}>{item.location}</Text>
    //     </View>
    //     </View>
    //     </ImageBackground>
    //   )
    // }
 
    />
  )
}

export default App

const styles = StyleSheet.create({})