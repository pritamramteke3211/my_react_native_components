import { FlashList } from '@shopify/flash-list';
import {
  Box,
  BoxShadow,
  Canvas,
  Fill,
  Image,
  ImageFormat,
  Mask,
  Path,
  rect,
  rrect,
  Skia,
  SkImage,
  
  useCanvasRef,
} from '@shopify/react-native-skia';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Image as RNImage, View,Text, TouchableOpacity,} from 'react-native';
import { FlatList, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import {launchCamera} from 'react-native-image-picker';
import { runOnJS } from 'react-native-reanimated';
import SavedImage from './components/SavedImage';
import ColorSelector from './components/ColorSelector';

const generateSkiaImage = async (path) => {
  return await Skia.Data.fromURI(path).then(data =>
    Skia.Image.MakeImageFromEncoded(data),
  );
};

const ImageMarker = () => {
  const [image, setImage] = useState();
  const [savedImage, setsavedImage] = useState('');
  const canvasRef = useCanvasRef();
const [editable, seteditable] = useState(false)

  const [paths, setPaths] = useState([]);


const [cColor, setcColor] = useState("#000")



  const pan = Gesture.Pan().runOnJS(true);

  pan.onStart((g) => {
      // const newPaths = [...paths];

      paths.push({
        segments: [[`M ${g.x} ${g.y}`]],
        // color: paths?.length % 2 == 0 ? "blue" :'green',
        color: cColor,
      })
      runOnJS(setPaths)(paths)
    })
    .onUpdate((g) => {
      
    if (editable) {
 
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (paths?.[index]?.segments) {
        paths[index].segments.push(`L ${g.x} ${g.y}`);
       runOnJS(setPaths)(newPaths)
      }
    }

     
    }).minDistance(1);


    const clearMark = ()=>{
      setPaths([])
    }

   

  const onCaptureImg = async () =>{
    seteditable(false)
    clearMark()

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  


    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
        
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        // setSelectedImage(imageUri);
        console.log('imageUri',imageUri);
        generateSkiaImage(
          imageUri
        ).then(value => {
          if (value) {
            setImage(value);
          }
        });
      }
    });
  }



  return (
    <GestureHandlerRootView style={styles.container}>

      {/* <Text>dssd</Text> */}
      <Button
        title="Capture Image"
        onPress={onCaptureImg}
      />
 { image ?
 <>
 <Text>Editing {editable ? 'Enable' : 'Disable'}</Text>
 <View style={{ height: 300 , width:300 }}>
      <GestureDetector gesture={pan}>
      <View style={{ height: 300 , width:300, backgroundColor: "yellow" }}>
  
      <Canvas ref={canvasRef} style={{width: 300, height: 300}}>
        {/* <Fill color="blue" /> */}
        <Mask mask={<Box box={rrect(rect(0, 0, 300, 300), 0, 0)}></Box>}>
          {image ? (
            <Image
              x={0}
              y={0}
              image={image}
              width={300}
              height={300}
              fit="contain"
            />
          ) : null}
           {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}


        </Mask>
      </Canvas>
      </View>
      </GestureDetector>
    </View>
    </>
  :
  <View
  style={{ height: 300 , width:300 }}
  />  
  }

    

<View style={{marginVertical: 5, flexDirection:'row', justifyContent:'space-between', alignItems:'center', width: '100%', paddingHorizontal:10, flexWrap: 'wrap'}}>
      

{
  image &&
  <>
  <Button
      title={`${editable ? 'Disable' : 'Enable'} Edit`}
      onPress={()=>{

        seteditable(!editable)
      }}
      />

      {
      editable  &&
      <>
     { 
     paths.length > 0 &&
     <Button
      title="Clear"
      onPress={clearMark}
      />}

      <Button
        title="Save Image"
        onPress={() => {
          seteditable(false)
          // setshowClear(false)
          const skImg = canvasRef.current?.makeImageSnapshot();
          if (skImg) {
            const base64 = skImg.encodeToBase64(ImageFormat.PNG, 100);
            setsavedImage('data:image/png;base64,' + base64);
          }
        }}
      />
      </>
      }
      </>
      }

     
</View>

      {savedImage ? (
        <SavedImage
        sImage={savedImage}
        />
      ) : null}
  
  <ColorSelector
  cColor={cColor}
  setcColor={setcColor}
  />

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageMarker;
