import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState, useRef, useLayoutEffect, useEffect} from 'react'
import { scrn_height, scrn_width } from '../styles/responsive'
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera'


const VisionCamera = () => {

    const [devicec, setdevicec] = useState('')
    const [hasCameraPermission, sethasCameraPermission] = useState(false)
    const [cameraActive, setcameraActive] = useState(true)

    const [images_list, setimages_list] = useState([])

    const cameraRef = useRef(null)
    // const devices = useCameraDevices()

    const device = useCameraDevice('back')
    // const device = devices[devicec]

    

    const checkCameraPer = async () =>{
     
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission) {
            sethasCameraPermission(true)  
            console.log("camera perm t") 
        }
        else{
            sethasCameraPermission(false)
            console.log("camera perm")
        }
    }

    const handleCapturePress = async () => {
        try {
            if (cameraRef.current) {
                const photo = await cameraRef.current.takePhoto({
                    flash: "on",
                })

                if (photo.path) {
                    let imgUri = "file://" + photo.path
                    console.log("imgUri",imgUri)
                    let lst = [...images_list]
                    lst.push(imgUri)
                    setimages_list(lst)
                }
            }
        } catch (error) {
            console.log("Camera Error",error)
        }
    }

    const deactivateCamera = () => {
        setcameraActive(false)
    }

    useLayoutEffect(() => {
    setdevicec('front')
      checkCameraPer()
      
    }, [])

    useEffect(() => {
      console.log("images_list",images_list)
    }, [images_list])
    

  return (
    <View style={{height: scrn_height, width: scrn_width}}>
      <Text>VisionCamera</Text>
      <TouchableOpacity

      onPress={()=>{
        handleCapturePress()
      }}
      style={{backgroundColor:'white', width:80, height: 80,
      borderRadius: 40,
      alignSelf:'center', position:'absolute',
    bottom: 100,
    zIndex: 2, 
    }}
      />
      {device && hasCameraPermission ? (
  
            <Camera
            photo={true}
            ref={cameraRef}
            style={{
                
                height: scrn_height * 0.9,
                width: scrn_width,
            }}
            device={device}
            isActive={cameraActive}
            />
        
      ):
      <View>
        <Text style={{color:'#fff'}}>dsdsdsd</Text>
      </View>
      }

   
        <View
        style={{
            flexDirection:'row', 
          height: 102,
          alignItems:'center',
          position: 'absolute',
          backgroundColor:'red',  zIndex:3, padding: 10, width: scrn_width}}
        >

               {
                images_list.length > 0 ?
                <ScrollView horizontal>
   {   images_list.map((img,idx) =>{
    return(
        <View 
        key={idx}
        style={{paddingRight: 5}}>
        <Image
            
            source={{ uri : img}}
            resizeMode='contain'
            style={{width: 100, height: 100}}
            />
            </View>
    )
   })
            }
            </ScrollView>
        :
        <View>
            <Text>No Image Selected</Text>
        </View>    
        }
            </View>
     
    </View>
  )
}

export default VisionCamera

const styles = StyleSheet.create({})