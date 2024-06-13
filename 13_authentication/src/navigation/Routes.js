import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import AuthScreen from './AuthScreen';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Routes = () => {
  const user_loggined_id = useSelector(
    state => state.authentication.user_loggined_id,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user_loggined_id ? <>{MainScreen(Stack)}</> : <>{AuthScreen(Stack)}</>}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
