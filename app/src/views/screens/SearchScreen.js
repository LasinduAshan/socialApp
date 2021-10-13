import React, { Component, useState,  useEffect, createContext } from 'react'
import { Text, StyleSheet,  Button, View } from 'react-native'
import FirebaseUtil from '../../../../utils/FirebaseUtil';
import auth from '@react-native-firebase/auth';

export default class SearchScreen extends Component {


    state = {
        email: "",
        displayName: "",
        uid: ""
    };
    
   componentDidMount(){
        const {email, displayName, uid } = auth().currentUser;

        this.setState({email, displayName, uid });
    }

//     const [user, setUser] = useState();

//     function onAuthStateChanged(user) {
//         setUser(user);
//         // if (initializing) setInitializing(false);
//       }

//       useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
       
//         return subscriber; // unsubscribe on unmount

//       }, []);

//     //   if (initializing) return null;

    signOut = () =>{
        // console.log(email,password)

        FirebaseUtil.signOut() 
        .catch((e) => {
            console.log(e);
            //alert('Email/ Password is wrong')
        });
    }


    render() {
        return (
            <View>
                 <Text> Search Screen  {this.state.email}</Text>
                 <Text> Welcome  {this.state.displayName}</Text>
                 <Text> Home Screen  {this.state.uid}</Text>
                {/* <Text> Home Screen  {user.email} </Text>
                <Text> Welcome {user.uid} </Text> */}
                <Button onPress={() => this.signOut()} title="Log out"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
