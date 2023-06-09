import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;