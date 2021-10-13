import React from 'react'
import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageScreen from './MessageScreen';
import MessgeChatScreen from './MessgeChatScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// const MessageStack = ({navigation}) => {

//     // if (route.state && route.state.index > 0) {
//     //   navigation.setOptions({tabBarVisible: false}) 
//     // }else{
//     //   navigation.setOptions({tabBarVisible: true})
//     // }

//     return(
//       <Stack.Navigator>
//         <Stack.Screen name="Messages" component={MessageScreen} />
//         <Stack.Screen 
//           name="MessagesChat" 
//           component={MessgeChatScreen} 
//           options={({route}) => ({
//             title: route.params.userName,
//             headerBackTitleVisible:false
//           })}
//         />
//       </Stack.Navigator>
//     )
    
//   };


export default function MessageTest() {
    return (
        // <Tab.Navigator>
        //     <Tab.Screen 
        //         name="Chat1" 
        //         component={MessageStack} 
        //         options={{
        //         // tabBarVisibilityAnimationConfig: getTabBarVisibility(route),
        //         // tabBarVisibilityAnimationConfig: false,
        //         tabBarIcon: ({focused}) => (
        //             <View style= {{alignItems: 'center', justifyContent: 'center', top: 0 }}>
        //             {/* <Image 
        //                 source={require("../../src/assets/chat.png")}
        //                 resizeMode= 'contain'
        //                 style= {{
        //                 width: 26,
        //                 height: 26,
        //                 tintColor: focused ? '#e32f45' : '#748c94'
        //                 }} 
        //             /> */}
        //             <Text style= {{color: focused ? '#e32f45' : '#748c94', fontSize: 12 }} >
        //                 CHAT 
        //             </Text>
        //             </View>

        //         )
        //         // tabBarStyle: false
                
        //         }}/>
        // </Tab.Navigator>

        <View>
            <Text>Message test..</Text>
        </View>

    )
}
