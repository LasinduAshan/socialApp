import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/screens/HomeScreen';
import SearchScreen from '../views/screens/SearchScreen';
import PostScreen from '../views/screens/PostScreen';
import NotificationScreen from '../views/screens/NotificationScreen';
import ChatScreen from '../views/screens/ChatScreen';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import MessageScreen from '../views/screens/MessageScreen';
import MessgeChatScreen from '../views/screens/MessgeChatScreen';
import MessageTest from '../views/screens/MessageTest';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',

      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 10,
      //   height: 10,
      // },
      // shadowOpacity: 0.06,

      
    }}
    onPress={onPress}
  >
    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#e32f45',

      ...styles.shadow,
    }}>
      {children}
    </View>

  </TouchableOpacity>
);


  const MessageStack = ({navigation}) => {

    // if (route.state && route.state.index > 0) {
    //   navigation.setOptions({tabBarVisible: false}) 
    // }else{
    //   navigation.setOptions({tabBarVisible: true})
    // }

    return(
      <Stack.Navigator>
        <Stack.Screen name="Messages" component={MessageScreen} />
        <Stack.Screen 
          name="MessagesChat" 
          component={MessgeChatScreen} 
          options={({route}) => ({
            title: route.params.userName,
            headerBackTitleVisible:false
          })}
        />
      </Stack.Navigator>
    )
    
  };
 

 export default function Route() {
 // const Route = () => {


  // const getTabBarVisibility = (route) => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : '';
  //   if (routeName == "MessagesChat") {
  //       return false;
  //   }
  //   return true;
  // }

  //const ref = useRef(new Animated.Value(0)).current; 



  

  return (
   
    <Tab.Navigator  
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,       
      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style= {{alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image 
                source={require("../../src/assets/home2.png")}
                resizeMode= 'contain'
                style= {{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
                }} 
              />
              <Text style= {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }} >
                HOME 
              </Text>
            </View>

          )   
          
        }}/>
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style= {{alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image 
                source={require("../../src/assets/search1.png")}
                resizeMode= 'contain'
                style= {{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
                }} 
              />
              <Text style= {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }} >
                SEARCH 
              </Text>
            </View>

          )   
          
        }}/>
      <Tab.Screen name="Post" component={PostScreen}
        options={{
          tabBarIcon: ({focused}) => (
           
              <Image 
                source={require("../../src/assets/plus.png")}
                resizeMode= 'contain'
                style= {{
                  width: 35,
                  height: 35,
                  tintColor: '#fff'
                }} 
              />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}/>
          )  
          
        }} />
      <Tab.Screen name="Notification" component={NotificationScreen} 
        options={{
            tabBarIcon: ({focused}) => (
              <View style= {{alignItems: 'center', justifyContent: 'center', top: 0 }}>
                <Image 
                  source={require("../../src/assets/notification1.png")}
                  resizeMode= 'contain'
                  style= {{
                    width: 28,
                    height: 28,
                    tintColor: focused ? '#e32f45' : '#748c94'
                  }} 
                />
                <Text style= {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }} >
                  NOTICATION 
                </Text>
              </View>

            )   
          
      }}/>
      <Tab.Screen 
        name="Chat" 
        component={MessageStack} 
        options={{
          // tabBarVisibilityAnimationConfig: getTabBarVisibility(route),
          // tabBarVisibilityAnimationConfig: false,
          tabBarIcon: ({focused}) => (
            <View style= {{alignItems: 'center', justifyContent: 'center', top: 0 }}>
              <Image 
                source={require("../../src/assets/chat.png")}
                resizeMode= 'contain'
                style= {{
                  width: 26,
                  height: 26,
                  tintColor: focused ? '#e32f45' : '#748c94'
                }} 
              />
              <Text style= {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }} >
                CHAT 
              </Text>
            </View>

          )
          // tabBarStyle: false
          
        }}/>
    </Tab.Navigator>
    
  );
}


const styles = StyleSheet.create({
  tabBar: {
    // position: 'absolute',
    //bottom: 25,
    //marginHorizontal: 20,
    // elevation: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 70,
    //shadow bottom bar
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.06,
    // shadowRadius: 3.5,
    // elevation: 5,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
});

// const styles1 = StyleSheet.create({
//   tabBar: {
//     position: 'absolute',
//     bottom: 25,
//     left: 20,
//     right: 20,
//     elevation: 0,
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     height: 90,
//     //shadow bottom bar
//     shadowColor: '#7F5DF0',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
// });

//export default Route;