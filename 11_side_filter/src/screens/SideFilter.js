import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Header from '../components/HeaderC'
import { rspW } from '../theme/responsive'
import colors from '../theme/colors'
import styles from './styles'

const SideFilter = () => {
  
  const [menus, setmenus] = useState([
    {'Workout type': ['Workout type 1','Workout type 2','Workout type 3','Workout type 4','Workout type 5','Workout type 6'], type:'normal'},
    {'Program Length': ['10 min','30 min','60 min','90 min'],type:'normal'},
    {'Level': ['Level 1','Level 2','Level 3'],type:'normal'},
    {'Price': ['100$','200$','500$','1000$','above 1000$'], type:'range'},
    {'Equipment': [['Equipment 1', false],['Equipment 2', false],['Equipment 3', true],['Equipment 4', false],['Equipment 5', true],['Equipment 6',false],['Equipment 7', false],['Equipment 8', false]],type:'normal'},
    {'Plan by': ['Farhan Qureshi','Raju Rastongi','Rachondas Chachad'],type:'normal'},
  ])

  

  const [sfilteridx, setsfilteridx] = useState(0)

  
  console.log("menus",Object.values(menus[sfilteridx]))

  let selectedItem = Object.values(menus[sfilteridx])

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title='Filters' />
      <View style={{ flex:1, justifyContent:'space-between', backgroundColor:'red', flexDirection:'row'}}>
    
    <View style={styles.filterCon}>
      {
        menus.map((v,idx)=>{
          let title = Object.keys(v)[0]
          let select = sfilteridx == idx
          return(
            <TouchableOpacity 
            onPress={()=>{
              setsfilteridx(idx)
            }}
            style={{...styles.filterItm, backgroundColor: select ? colors.lightPurple : colors.dimWhite}} key={idx}>
              <Text style={{...styles.filteTxt, fontWeight: select ? '600': '400'}}>{title}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
    {/* <View style={styles.dataCont}> */}
      <View style={styles.dataCont}>
{ selectedItem[1] != 'range' ?
  selectedItem[0].map((val, indx)=>{
    console.log("val",val)
    return(
          
      <TouchableOpacity style={{...styles.dataItem,
        backgroundColor: val[1] ? colors.purple : colors.least,
      }}>
      <Text style={{...styles.dataItemTxt, color: val[1] ? colors.white: colors.black}}>{val[0]}</Text>
      </TouchableOpacity>

    )
  })
  :
  <Text>range here</Text>
}
    </View>
    {/* </View> */}
      </View>
    </SafeAreaView>
  )
}

export default SideFilter
