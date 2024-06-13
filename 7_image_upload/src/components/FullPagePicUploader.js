import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { scrn_height, scrn_width } from '../styles/responsive';
import colors from '../styles/colors';
import { Image as CompImage } from 'react-native-compressor';
import { stat } from 'react-native-fs';




const FullPagePicUploader = ({selectedImage, setSelectedImage,selectedImageBlr,setselectedImageBlr}) => {

  const [modalVisible, setmodalVisible] = useState(false)

  const [compressImage, setcompressImage] = useState(null)

  const [n_size, setn_size] = useState(0)
  const [c_size, setc_size] = useState(0)

  const getSize = async (img) =>{
    console.log("img",img)
    const statResult = await stat(img);
    return statResult.size/1024/1024

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
    };

    try {
      launchCamera(
        {
          title: 'Take a Photo',
          mediaType: 'photo',
         ...options,
        },
        (response) => {
          console.log("response", response)
          handleImagePickerResponse(response);
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
      setn_size(bf_size)
      
      // Compressor
      const result = await CompImage.compress(response.assets[0].uri, {
        // quality: 0.8,
        compressionMethod:'auto',
      });

      const af_size = await getSize(result)
      console.log("af_size",af_size)
      setc_size(af_size)

      setSelectedImage(rsp_img);
      setcompressImage(result)
      
    }
    setmodalVisible(false)
  };

  return (
    <View style={styles.container}>
      <Text>Normal Image Size {n_size} MB</Text>
      <TouchableOpacity 
      onPress={()=>{
        setmodalVisible(true)
        setselectedImageBlr(true)
      }}
      style={{...styles.profileImageContainer, borderColor: selectedImageBlr ? 
      selectedImage != null ?  colors.blue: colors.error:colors.grey}}>
        {selectedImage ? (
          <Image source={{uri : selectedImage}} 
          resizeMode='contain'
          style={styles.profileImage} />
        ) : (
          <View style={{...styles.profileImagePlaceholder,
          
          }}>
            <Text style={{color: colors.black}}>Select an image</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Text>Compressed Image Size {c_size} MB</Text>

      <TouchableOpacity 
      onPress={()=>{
        setmodalVisible(true)
        setselectedImageBlr(true)
      }}
      style={{...styles.profileImageContainer, borderColor: selectedImageBlr ? 
      compressImage != null ?  colors.blue: colors.error:colors.grey}}>
        {compressImage ? (
          <Image source={{uri : compressImage}} 
          resizeMode='contain'
          style={styles.profileImage} />
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
                onPress={pickImageFromCamera}
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
    // marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: scrn_width,
    height: scrn_height/2.15,
    // borderRadius: 75,
    overflow: 'hidden',
    // marginBottom: 20,
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

export default FullPagePicUploader;
