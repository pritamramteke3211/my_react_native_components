import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import {createStackNavigator} from '@react-navigation/stack';
import {useOrientation} from './src/hooks/screen';

const App = () => {
  const Stack = createStackNavigator();
  const orient = useOrientation();

  React.useEffect(() => {
    StatusBar.setBackgroundColor('#ffffff');
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
