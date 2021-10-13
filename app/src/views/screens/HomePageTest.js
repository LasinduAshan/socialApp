import React from 'react'
import { View, Text, Button } from 'react-native'
import FirebaseUtil from '../../../../utils/FirebaseUtil';

export default function HomePageTest() {

    const signOut = () =>{
        // console.log(email,password)

        FirebaseUtil.signOut() 
        .catch((e) => {
            console.log(e);
            //alert('Email/ Password is wrong')
        });
    }

    return (
        <View>
            <Text> Home Page</Text>
            <Button onPress={() => signOut()} title="Log out"/>
               
            

        </View>
    )
}
