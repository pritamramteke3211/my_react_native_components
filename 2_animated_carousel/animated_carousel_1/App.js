import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from './screens/Onboarding'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from './screens/Home'


const Loading = () => {
 <View>
  <ActivityIndicator size={"large"} />
 </View> 
}

const App = () => {
  
  const [loading, setLoading] = useState(true)
  const [viewedOnboarding, setViewedOnboarding] = useState(false)

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding') 

      if (value != null) {
        setViewedOnboarding(true)
      }

    } catch (err){
      console.log('Error @checkOnboarding: ', err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, [])
  


  return (
    <View 
    style={styles.container}>
      {loading ? <Loading/> : viewedOnboarding ?  <Home/> : <Onboarding/> }
      <StatusBar style="auto" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})