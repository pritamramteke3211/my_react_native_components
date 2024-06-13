import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'

 
const DocScanner = () => {
    const [scannedImage, setScannedImage] = useState();

    const scanDocument = async () => {
      // start the document scanner
      const { scannedImages } = await DocumentScanner.scanDocument({
        croppedImageQuality:  100,
      })
     
      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0])
      }
    }
    
  
    
    return (
        <View style={{flex:1}}>
            { scannedImage != null &&
            (
                <Image
                source={{uri : scannedImage}}
                style={{width:'100%', height: '50%'}}
                resizeMode='contain'
                />
            )
            }
           <TouchableOpacity
           style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'black',
            position: 'absolute',
            bottom: 20,
            alignSelf:'center',
           }}
           onPress={scanDocument} 
           >
            
            </TouchableOpacity>
    </View>
    )
}

export default DocScanner
const styles = StyleSheet.create({})