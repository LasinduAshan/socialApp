import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../views/screens/SignInScreen';
import SignUpScreen from '../views/screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AppScreensStack() {
    return (
        // <NavigationContainer>
        
            <Stack.Navigator screenOptions={{header:()=>null}}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator> 
       
        // </NavigationContainer>
    )
}
