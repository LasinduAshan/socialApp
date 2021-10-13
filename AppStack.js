import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './app/src/views/screens/SignInScreen';
import SignUpScreen from './app/src/views/screens/SignUpScreen';
import Route from './app/src/route/Route';
import { LoginContext } from './utils/LoginProvider';
import LoadingScreen from './app/src/views/screens/LoadingScreen';
import HomePageTest from './app/src/views/screens/HomePageTest';


const Stack = createStackNavigator();

export default function AppStack() {

//const {user, isLoading} = useContext(LoginContext)

    return (
          <NavigationContainer>
                <Stack.Navigator screenOptions={{header:()=>null}}>
                    {isLoading ? (
                        <Stack.Screen name="Loading" component={LoadingScreen} />
                    ) : user ? (
                        <Stack.Screen name="HomeTest" component={HomePageTest} />
                    ) : (
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                    )};
                    
                    {/* <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="Navigate" component={Route} /> */}
                </Stack.Navigator>
           </NavigationContainer>


//         <NavigationContainer>
//       <Stack.Navigator screenOptions={{header:()=>null}}>
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Navigate" component={Route} />
//       </Stack.Navigator>
//       {/* <Route/> */}
//   </NavigationContainer>

    )
}
