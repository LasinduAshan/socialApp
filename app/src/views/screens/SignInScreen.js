import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import FirebaseUtil from '../../../../utils/FirebaseUtil';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FireBaseGoogleSign from '../../../../utils/FireBaseGoogleSign';
//import AsyncStorage from '@react-native-community/async-storage';
//import { AsyncStorage } from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '396306317695-2ag5nf0t30keb8nn9ve1ko0c8jr7044a.apps.googleusercontent.com',
});

function SignInScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [defaulImage, setDefaulImage] = useState('https://firebasestorage.googleapis.com/v0/b/chatapp-98f33.appspot.com/o/profile_photo_default%2F1631981976163.jpg?alt=media&token=36193bd8-f039-4f2a-b531-43bbff021b2a');

    // Sign in or sign up
    const [create, setCreate] = useState(false);

    const signIn = () =>{
        // console.log(email,password)

        FirebaseUtil.signIn(email, password) 
        .then((res) => {
            console.log('Successfuly loged...!');
            console.log(res);
            // navigation.navigate("Navigate");
            //localStorage.setItem("userID", res.user.uid)
            // AsyncStorage.setItem('userID', res.user.uid);
            // AsyncStorage.setItem('userID', JSON.stringify(res.user.uid));
            //  console.log( JSON.parse(AsyncStorage.getItem("userID")));
            //  AsyncStorage.setItem('@storage_Key', res.user.uid)
            // const value =  AsyncStorage.getItem('@storage_Key');
            // console.log(value);

            // storeData = async () => {
            //     try {
            //       await AsyncStorage.setItem(
            //         'userID',
            //         'I like to save it.'
            //       );
            //     } catch (error) {
            //       // Error saving data
            //     }
            //   };

            //   _retrieveData = async () => {
            //     try {
            //       const value = await AsyncStorage.getItem('userID');
            //       if (value !== null) {
            //         // We have data!!
            //         console.log(value);
            //       }
            //     } catch (error) {
            //       // Error retrieving data
            //     }
            //   };

        })
        .catch((e) => {
            console.log(e);
            alert('Email/ Password is wrong')
        });


    

    // auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(() => {
    //         console.log('Successfuly loged...!');
    //     })
    //     .catch(error => {
    //         if (error.code === 'auth/email-already-in-use') {
    //         console.log('That email address is already in use!');
    //         }

    //         if (error.code === 'auth/invalid-email') {
    //         console.log('That email address is invalid!');
    //         }

    //         console.error(error);
    // });



    }


    // async function googleLogin() {
    //     // Get the users ID token
    //     const { idToken } = await GoogleSignin.signIn();
      
    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    //   }

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
            .then( () => {
                // console.log("response "+res);

                if(auth().currentUser.photoURL == null){
                    auth().currentUser.updateProfile({
                        photoURL: defaulImage
                    });
    
                    auth().currentUser.reload();
                    console.log('if eka athule....');
                    addUser1(auth().currentUser.uid, defaulImage);
                }
                console.log('if eka eliye....');
            })
            .catch((e) => {
                console.log(e);
                //alert('Something went to wrong')
            });
      }


      async function addUser1 (uid, img) {
        console.log(" add user method working....")

        database()
            .ref('users/'+uid)
            .set({
                name: auth().currentUser.displayName,
                email: auth().currentUser.email,
                image: defaulImage,
                uid: uid
        })
          .then( ()=> {
        
            console.log("Successfully aded user.");
          })
          .catch((e) => {
            console.log(e);
            
          });
    }

    // const googleLogin = () =>{
    //     FireBaseGoogleSign.googleLogin()
    //     .then(() => {
    //         console.log('User account created & signed in!');
    //         // navigation.navigate("Navigate");
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //         alert('Something went to wrong')
    //     });
    // }



    return(
        <SafeAreaView style = {{paddingHorizontal: 20,flex: 1,backgroundColor: COLORS.white}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginTop: 40}}>
                <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
                    FOX
                 </Text>
                <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
                    HUB
                </Text>
            </View>

            <View style={{marginTop: 70}}>
                <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
                    Welcome Back,
                </Text>
                <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
                    Sign in to continue
                </Text>
            </View>

            <View style={{marginTop: 20}}>
                <View style={STYLES.inputContainer}>
                    <Icon name="mail-outline" size={20} color={COLORS.light} style={STYLES.inputIcon}/>
                    <TextInput placeholder="Enter your email" style={STYLES.input} onChangeText={setEmail} value={email}/>
                    
                </View>

                <View style={STYLES.inputContainer}>
                    <Icon name="lock-outline" size={20} color={COLORS.light} style={STYLES.inputIcon}/>
                    <TextInput placeholder="Enter your password" style={STYLES.input2} secureTextEntry onChangeText={setPassword} value={password}/>
                    
                </View>

            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate("Navigate")}> */}
            <TouchableOpacity onPress={() => signIn()}>
                <View style={STYLES.btnPrimary}>
                      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
                            Login
                      </Text>
                </View>
            </TouchableOpacity>

            <View style={{marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
               <View style={STYLES.line}></View>
               <Text style={{fontWeight: 'bold', marginHorizontal: 5}}>OR</Text>
               <View style={STYLES.line}></View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* <TouchableOpacity> */}
                    <View style={STYLES.btnSecondary} >
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            Sign In with
                        </Text>
                        <Image style={STYLES.imageFacebook} source={require("../../assets/facebook.png")}/>
                    </View>
                {/* </TouchableOpacity> */}

                 <View style={{width: 10}}/>

                 <TouchableOpacity 
                    style={STYLES.btnSecondary} 
                    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                 >
                    <View  style={STYLES.btnSecondary}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            Sign In with
                        </Text>
                        <Image style={STYLES.imageGoogle} source={require("../../assets/google.png")}/>
                    </View>
                 </TouchableOpacity>
             </View>

             <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 40, marginBottom: 20}}>
                 <Text style={{fontWeight: 'bold', color: COLORS.light}}>Don`t have an account ?</Text>
                 <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                     <Text style={{fontWeight: 'bold', color: COLORS.pink}}>Sign Up</Text>
                 </TouchableOpacity>

             </View>

        </ScrollView>
    </SafeAreaView>
    )
        
}

export default SignInScreen;