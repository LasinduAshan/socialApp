import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from "react-native";
import { ScrollView, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import FirebaseUtil from '../../../../utils/FirebaseUtil';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

GoogleSignin.configure({
    webClientId: '396306317695-2ag5nf0t30keb8nn9ve1ko0c8jr7044a.apps.googleusercontent.com',
});


function SignUpScreen({navigation}) {

    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [name, setName] = useState('');
    let [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [defaulImage, setDefaulImage] = useState('https://firebasestorage.googleapis.com/v0/b/chatapp-98f33.appspot.com/o/profile_photo_default%2F1631981976163.jpg?alt=media&token=36193bd8-f039-4f2a-b531-43bbff021b2a');

    // State = {
    
    //     image: null,
       
    //     imagePath: ""
    // }

    const signUp = () =>{
        

        if(password != cpassword){
            alert('confirm password wrong')
        }else{

            FirebaseUtil.signUp(email, password)
            .then(userCredentials => {
               


                if(image == null){
                    auth().currentUser.updateProfile({
                        displayName: name,
                        photoURL: defaulImage
                    });
    
                    auth().currentUser.reload();
                    console.log('if eka athule...photo ekk naththam.');
                    addUser(auth().currentUser.uid, defaulImage);
                }else{

                    uploadPhotoAsync(userCredentials.user.uid);                 // photo upload method eka call krnw...

                }

                
                
                // return userCredentials.user.updateProfile({
                //     displayName: name,
                //     photoURL: "jhjhh"
                // });

                // auth().currentUser.updateProfile({
                //     displayName: name,
                //     photoURL: imagePath
                // });

                // auth().currentUser.reload()

               
                

                console.log('User account created & signed in!');
                //console.log("photo url method iwarai  "+imagePath);
                // navigation.navigate("Navigate");
            })
            .catch((e) => {
                console.log(e);
                alert('Something went to wrong')
            });
        }

        // auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(() => {
        //         console.log('User account created & signed in!');
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
                
                

            })
            .catch((e) => {
                console.log(e);
                //alert('Something went to wrong')
            });
    }

    async function pickImage () {
        console.log("image button working....")
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          })
          .then(img => {
            console.log(img);
            //this.setState({image: img.path});
            image = setImage(img.path);
            console.log(image);
          })
          .catch((e) => {
            console.log(e);
            //alert('Email/ Password is wrong')
          });
    }

    async function uploadPhotoAsync (id) {

        console.log("Upload profile photo method working........")

        const path = `profile_photo/${id}/${Date.now()}.jpg`;
        //const path = `profile_photo_default/${Date.now()}.jpg`;

        const reference = storage().ref(path);

        //const pathToFile = `photo/${this.state.image}`;
          // uploads file
        await reference.putFile(image);

        const url = await storage().ref(path).getDownloadURL()
            .then((res) => {
                console.log("response "+res);


                    auth().currentUser.updateProfile({
                        displayName: name,
                        photoURL: res
                    });
    
                    auth().currentUser.reload();
                    console.log('else eka athule.... photo eka tynw nm');

                    //setImagePath(res);

                    addUser(auth().currentUser.uid, res);
                
            })

        //setImagePath(url);

        //console.log("photo url "+url);
        //console.log("photo url  "+url);
        //imagePath = url;
        //setImagePath(url);
        
    }

    async function addUser (uid, img) {
        console.log(" add user method working....")

        database()
            .ref('users/'+uid)
            .set({
                name: name,
                email: email,
                image: image == null ? defaulImage : img,
                uid: uid
        })
          .then( ()=> {
        
            console.log("Successfully aded user.");
          })
          .catch((e) => {
            console.log(e);
            
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
                       Sign up to continue
                   </Text>
               </View>

               {/* {require("../../assets/heart.png")} */}
               {/* source={{uri: image}} */}
               <TouchableOpacity onPress={() => pickImage()}>
                   <View style={STYLES.profileContainer}>
                        <View style={STYLES.profileContainerView}>
                            {/* <Image source={require("../../assets/camera.png")} style={STYLES.profileContainerView1} /> */}
                            <Image source={{uri: image}} style={STYLES.avaterProfile} />
                        </View>
                   </View>
               </TouchableOpacity>

               <View style={{marginTop: 20}}>

                    <View style={STYLES.inputContainer}>
                       <Icon name="person-outline" size={20} color={COLORS.light} style={STYLES.inputIcon}/>
                       <TextInput placeholder="Enter name" style={STYLES.input} onChangeText={setName} value={name}/>
                       
                   </View>

                   <View style={STYLES.inputContainer}>
                       <Icon name="mail-outline" size={20} color={COLORS.light} style={STYLES.inputIcon}/>
                       <TextInput placeholder="Enter email" style={STYLES.input} onChangeText={setEmail} value={email}/>
                       
                   </View>

                   <View style={STYLES.inputContainer}>
                       <Icon name="lock-outline" size={20} color={COLORS.light} style={STYLES.inputIcon}/>
                       <TextInput placeholder="Enter password" style={STYLES.input2} secureTextEntry onChangeText={setPassword} value={password}/>
                       
                   </View>

                   <View style={STYLES.inputContainer}>
                       <Icon name="lock-outline" size={20} color={COLORS.light} style={STYLES.inputIcon}/>
                       <TextInput placeholder="Confirm password" style={STYLES.input} secureTextEntry onChangeText={setcPassword} value={cpassword}/>
                       
                   </View>

               </View>

               <TouchableOpacity onPress={() => signUp()}>
                    <View style={STYLES.btnPrimary}>
                        <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
                            Sign Up
                        </Text>
                    </View>
               </TouchableOpacity>

               <View style={{marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <View style={STYLES.line}></View>
                  <Text style={{fontWeight: 'bold', marginHorizontal: 5}}>OR</Text>
                  <View style={STYLES.line}></View>
               </View>

               <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={STYLES.btnSecondary}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            Sign Up with
                        </Text>
                        <Image style={STYLES.imageFacebook} source={require("../../assets/facebook.png")}/>
                    </View>

                    <View style={{width: 10}}/>

                    <TouchableOpacity 
                        style={STYLES.btnSecondary} 
                        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                    >
                        <View style={STYLES.btnSecondary}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                Sign Up with
                            </Text>
                            <Image style={STYLES.imageGoogle} source={require("../../assets/google.png")}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 40, marginBottom: 20}}>
                    <Text style={{fontWeight: 'bold', color: COLORS.light}}>Already have an account ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={{fontWeight: 'bold', color: COLORS.pink}}>Sign In</Text>
                    </TouchableOpacity>

                </View>

           </ScrollView>
       </SafeAreaView>
    )
        
}


export default SignUpScreen;