import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

    const clearOnboarding = async ()  => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (err) {
            console.log('Error @clearOnboarding: ', err)
        }
    }
 
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})