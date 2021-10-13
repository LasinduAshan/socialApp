/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createContext, useEffect, useMemo, useReducer, useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './app/src/views/screens/SignInScreen';
import SignUpScreen from './app/src/views/screens/SignUpScreen';
import Route from './app/src/route/Route';
import AppScreensStack from './app/src/route/AppScreensStack';
import HomePageTest from './app/src/views/screens/HomePageTest';
import LoadingScreen from './app/src/views/screens/LoadingScreen';
import LoginProvider from './utils/LoginProvider';
import AppStack from './AppStack';
import auth from '@react-native-firebase/auth';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import MessageTest from "./app/src/views/screens/MessageTest";

const Stack = createStackNavigator();

export const AuthContext = createContext();

// GoogleSignin.configure({
//   webClientId: '396306317695-2ag5nf0t30keb8nn9ve1ko0c8jr7044a.apps.googleusercontent.com',
// });


const App = () => {
  

  // const initialLoginState = {
  //   isLoading: true,
  //   userName: null,
  //   userToken: null,
  // };

  // const loginReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case "RETRIVE_TOKEN":
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case "LOGIN":
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //         userName: action.id,
  //       };
  //     case "LOGOUT":
  //       return {
  //         ...prevState,
  //         userToken: null,
  //         isLoading: false,
  //         userName: null,
  //       };
  //     case "REGISTER":
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //         userName: action.id,
  //       };
  //   }
  // };

  // const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  // const authContex = useMemo(
  //   () => ({
  //     siginIn: async user => {
  //       let userToken;
  //       userToken = null;
  //       if (user != null) {
  //         userToken = "123";
  //         try {
  //           await AsyncStorage.setItem("userToken", userToken);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
  //       dispatch({ type: "LOGIN", id: user, token: userToken });
  //     },
  //     signOut: async () => {
  //       try {
  //         await AsyncStorage.removeItem("userToken");
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       dispatch({ type: "LOGOUT" });
  //     },
  //     signUp: () => {
  //       setUserToken("123");
  //     },
  //     checkValue: () => {
  //       console.log("Wade set");
  //     },
  //   }),
  //   []
  // );

  // useEffect(() => {
  //   setTimeout(async () => {
  //     let userToken;
  //     userToken = null;
  //     try {
  //       userToken = await AsyncStorage.getItem("userToken");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     dispatch({ type: "REGISTER", token: userToken });
  //   }, 2000);
  // }, []);

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="black" />
  //     </View>
  //   );
  // }

  // return (

    // <View>
    //   {/* <LoginProvider> */}
    //     <AppStack/>
    //   {/* </LoginProvider> */}
    // </View>

    // <AuthContext.Provider value={authContex}>
      //   <NavigationContainer>
      //     <Stack.Navigator screenOptions={{header:()=>null}}>
      //     {loginState.userToken !== null ? (
      //                   <Route />
      //               ) : (
      //                 <Stack.Screen name="SignIn" component={SignInScreen} /> 
                     
                    
      //               )};
           
      //     </Stack.Navigator>
      //     {/* <Route/> */}
      //  </NavigationContainer>
    // </AuthContext.Provider>


          //  <AuthContext.Provider value={authContex}>
          //     <NavigationContainer>
          //       <Stack.Navigator screenOptions={{header:()=>null}}>
                    // {loginState.userToken !== null ? (
                    //     <Route />
                    // ) : (
                    //   < />
                     
                    
                    // )};
                    
          //           {/* <Stack.Screen name="SignUp" component={SignUpScreen} />
          //           <Stack.Screen name="Navigate" component={Route} /> */}
          //       </Stack.Navigator>
          //    </NavigationContainer>
          //  </AuthContext.Provider>


          // tikak hri eka......................................

    //   <AuthContext.Provider value={authContex}>
    //     <NavigationContainer>
    //       <Stack.Navigator screenOptions={{header:()=>null}}>
    //         {loginState.userToken !== null ? (
    //           <Stack.Screen name="Navigate" component={Route} />
              
    //         ) : (
    //           <Stack.Screen name="SignIn" component={SignInScreen} />
              
            
    //         )}
            
    //           <Stack.Screen name="SignUp" component={SignUpScreen} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    // </AuthContext.Provider>


        // hriyata wada eka danata............

//     <AuthContext.Provider value={authContex}>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{header:()=>null}}>
//             <Stack.Screen name="SignIn" component={SignInScreen} />
//             <Stack.Screen name="SignUp" component={SignUpScreen} />
//             <Stack.Screen name="Navigate" component={Route} />
//           </Stack.Navigator>
//           {/* <AppScreensStacks/> */}
//        </NavigationContainer>
//     </AuthContext.Provider>
  
//   );
// };



          // Set an initializing state whilst Firebase connects
          const [initializing, setInitializing] = useState(true);
          const [user, setUser] = useState();

          // Handle user state changes
          function onAuthStateChanged(user) {
            setUser(user);
            if (initializing) setInitializing(false);
          }

          useEffect(() => {
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
           
            return subscriber; // unsubscribe on unmount

          }, []);

          if (initializing) return null;

          if (!user) {
            return (
              // <View>
              //   <Text>Login</Text>
              // </View>
              <NavigationContainer>
                    <Stack.Navigator screenOptions={{header:()=>null}}>
                      <Stack.Screen name="SignIn" component={SignInScreen} />
                      <Stack.Screen name="SignUp" component={SignUpScreen} />
                      {/* <Stack.Screen name="test" component={MessageTest} /> */}
                      {/* <Stack.Screen name="Navigate" component={Route} /> */}
                    </Stack.Navigator>
                   
               </NavigationContainer>
            );
          }

          return (
            // <View>
            //   <Text>Welcome {user.email}</Text>
            // </View>
               <NavigationContainer>
                    {/* <Stack.Navigator screenOptions={{header:()=>null}}>
                      <Stack.Screen name="SignIn" component={SignInScreen} />
                      <Stack.Screen name="SignUp" component={SignUpScreen} />
                      <Stack.Screen name="Navigate" component={Route} />
                    </Stack.Navigator> */}
                   
                    {/* <LoadingScreen> */}
                       <Route/>
                    {/* </LoadingScreen> */}
               </NavigationContainer>

                   
          );
          }



export default App;
