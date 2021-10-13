import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './app/src/views/screens/SignInScreen';
import SignUpScreen from './app/src/views/screens/SignUpScreen';

const Stack = createStackNavigator();

const MainStackScreen = () => (
    <Stack.Navigator screenOptions={{header:()=>null}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
);