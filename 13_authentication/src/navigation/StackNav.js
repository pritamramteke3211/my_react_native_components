import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import * as screen from '../screens';
import navgationStrings from './navgationStrings';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={navgationStrings.LOGIN} component={screen.Login} />
      <Stack.Screen
        name={navgationStrings.REGISTRATION}
        component={screen.Registration}
      />
      <Stack.Screen name={navgationStrings.HOME} component={screen.Home} />
    </Stack.Navigator>
  );
};

export default StackNav;
