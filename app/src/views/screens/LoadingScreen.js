import React, { Component } from 'react'
//import { View, Text, StyleSheet } from 'react-native'
import { ActivityIndicator, View, Text } from "react-native";
import auth from '@react-native-firebase/auth';

export default class LoadingScreen extends Component {

   //constructor(props)

    // componentDidMount({navigation}){
    //     auth().onAuthStateChanged(user =>{
    //         this.props.navigation.navigate(user ? "SignIn" : "Navigate");
    //     })
    // }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    }

}

