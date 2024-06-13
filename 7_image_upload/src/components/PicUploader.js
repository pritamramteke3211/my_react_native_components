import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { scrn_width } from '../styles/responsive';
import colors from '../styles/colors';
import { Image as CompImage } from 'react-native-compressor';
import { stat } from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';


const PicUploader = ({selectedImage, setSelectedImage,selectedImageBlr,setselectedImageBlr, compress=false}) => {

  const [modalVisible, setmodalVisible] = useState(false)

  const getSize = async (img) =>{
    console.log("img",img)
    const statResult = await stat(img);
    return statResult.size/1024/1024

  }

  const pickCropImageFromCamera = ( ) =>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      multiple: true,
    }).then(image => {
      console.log("crop Image",image);
    });
  }

  const pickImageFromGallery = () => {

    const options = {
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
    };
    
    launchImageLibrary(
      {
        title: 'Select Image',
        ...options,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      (response) => {
        handleImagePickerResponse(response);
      
      }
    );
  };

  const pickImageFromCamera = () => {

    const options = {
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
      // multiple: true,
   
    };

    try {
      launchCamera(
        {
          title: 'Take a Photo',
          mediaType: 'photo',
          
         ...options,
        },
        (response) => {
          // To Know Image Size in Kb or Image Quality inderectly
          console.log("response", Math.round(response.assets[0].fileSize/1024))
          // handleImagePickerResponse(response);
        }
      );
    } catch (error) {
      console.log(error)
    }
   
  };

  const handleImagePickerResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      let rsp_img = response.assets[0].uri
      const bf_size =await getSize(rsp_img)
      console.log("bf_size",bf_size)
      
      
      // Compressor
      const result = await CompImage.compress(response.assets[0].uri, {
        // quality: 0.8,
        compressionMethod:'auto',
      });

      const af_size = await getSize(result)
      console.log("af_size",af_size)

      if (compress) {
       setSelectedImage(result) 
      }
      else{
        setSelectedImage(rsp_img);
      }
      
    }
    setmodalVisible(false)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={()=>{
        setmodalVisible(true)
        setselectedImageBlr(true)
      }}
      style={{...styles.profileImageContainer, borderColor: selectedImageBlr ? 
      selectedImage != null ?  colors.blue: colors.error:colors.grey}}>
        {selectedImage ? (
          <Image source={{uri : selectedImage}} style={styles.profileImage} />
        ) : (
          <View style={{...styles.profileImagePlaceholder,
          
          }}>
            <Text style={{color: colors.black}}>Select an image</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Modal
      visible={modalVisible}
      
      >

        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{
          setmodalVisible(false)
        }}
        style={{

          flex: 1,
         alignItems:'center',
          justifyContent:'center',
      backgroundColor:'#00000036'
      }}>
            <TouchableWithoutFeedback style={{
              backgroundColor: '#fff',
              alignItems:'center',
          justifyContent:'center',
          height: scrn_width / 2,
          width: scrn_width / 1.2,
              }}>
                <View style={{backgroundColor:'#fff',
               alignItems:'center',
               justifyContent:'center',
                   height: scrn_width / 2,
                   width: scrn_width / 1.2
              }}>
                <TouchableOpacity style={{marginBottom:20}}
                onPress={pickImageFromGallery}
                >
                    <Text style={{fontSize: 18, fontWeight:'600', color: colors.blue}}>Pick from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginBottom:20}}
                onPress={ () => {
                  pickImageFromCamera()
                  // pickCropImageFromCamera()
                }}
                >
                    <Text style={{fontSize: 18, fontWeight:'600', color: colors.blue}}>Take a Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginBottom:20}}
                onPress={()=>{
                  setmodalVisible(false)
                }}
                >
                    <Text style={{fontSize: 18, fontWeight:'600', color: colors.blue}}>Cancel</Text>
                </TouchableOpacity>
            
        </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth:2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  
});

export default PicUploader;
