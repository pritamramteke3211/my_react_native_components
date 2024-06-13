import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import { scrn_height, scrn_hor_pad, scrn_ver_pad, scrn_width } from '../styles/responsive'

import colors from '../styles/colors'

import PicUploader from '../components/PicUploader'
import VisionCamera from '../components/VisionCamera'



const Registration = ({navigation}) => {
 
    const [pic, setpic] = useState(null)
    const [pic_blr, setpic_blr] = useState(false)
    const [form_error, setform_error] = useState("")
    

    useEffect(() => {
       
      if (pic_blr && pic == null) {
        setform_error('Please Upload Your Picture')
      }
      else{
        setform_error('')
      }

    }, [ pic_blr, pic])
    
    
  return (
    <SafeAreaView styles={{
      height: scrn_height,
      with: scrn_width,
      // flex:1,
      
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center'
      }}>
          
 
 <VisionCamera/>
 
      {/* <PicUploader
selectedImage ={pic}
setSelectedImage ={setpic}
setselectedImageBlr={setpic_blr}
selectedImageBlr={pic_blr}
compress={true}
/> */}

 
{/* <FullPagePicUploader
selectedImage ={pic}
setSelectedImage ={setpic}
setselectedImageBlr={setpic_blr}
selectedImageBlr={pic_blr} */}
{/* /> */}

{/* <View style={{marginBottom:5, alignSelf:'center'}}>
        <Text style={{
          color: colors.error,
        }}>
          {form_error}
        </Text>
        </View> */}
        

      
      
      
    </SafeAreaView>
  )
}

export default Registration

const styles = StyleSheet.create({})