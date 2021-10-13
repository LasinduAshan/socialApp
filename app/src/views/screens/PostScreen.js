import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Fire from '../../../../Fire';

 //const firebase =require("firebase");
 //require("@react-native-firebase/firestore")

 

export default class PostScreen extends Component {


    state = {
        text: "",
        image: null,
        email: "",
        displayName: "",
        uid: "",
        timestamp: "",
        imagePath: "",
        photoURL: "h",
        testIma: "https://firebasestorage.googleapis.com/v0/b/chatapp-98f33.appspot.com/o/profile_photo_default%2F1631981976163.jpg?alt=media&token=36193bd8-f039-4f2a-b531-43bbff021b2a"
    }

    componentDidMount(){
        const {email, displayName, uid, photoURL } = auth().currentUser;

        this.setState({email, displayName, uid, photoURL });
    }

    handlePost = async () => {

        if(this.state.image == null){
            firestore()
                .collection('posts')
                .add({
                    text: this.state.text,
                    uid: this.state.uid,
                    userName: this.state.displayName,
                    timestamp: Date.now(),
                    image: this.state.imagePath,
                    profilePhoto: this.state.photoURL
                })
                .then(() => {
                    this.setState({
                    text: '',
                    image: null,
                    imagePath: '',
                })
          
            });
        }else{
            await this.uploadPhotoAsync();

            firestore()
                .collection('posts')
                .add({
                    text: this.state.text,
                    uid: this.state.uid,
                    userName: this.state.displayName,
                    timestamp: Date.now(),
                    image: this.state.imagePath,
                    profilePhoto: this.state.photoURL
                })
                .then(() => {
                    this.setState({
                    text: '',
                    image: null,
                    imagePath: '',
                })
                //  .catch((e) => {
                //     console.log(e);
                //  });
            });
        }

        // Fire.shared
        //     .addPost({Text: this.state.text.trim(), localUri: this.state.image})
        //     .then(ref => {
        //         this.setState({text: "", image: null});
        //     })
        //     .catch((e) => {
        //         console.log(e);
                
        //     });
      
    }


    uploadPhotoAsync = async () => {
        console.log("Upload profile photo method working........")

        const path = `photo/${this.state.uid}/${Date.now()}.jpg`;

        const reference = storage().ref(path);

        //const pathToFile = `photo/${this.state.image}`;
          // uploads file
        await reference.putFile(this.state.image);

        const url = await storage().ref(path).getDownloadURL();

        //console.log("photo url"+url);

        this.setState({
            imagePath: url
         })


        //const path = `photo/${this.uid}/${Date.now()}.jpg`;

        // return new Promise(async (res, rej) => {
        //     const response = await fetch(uri);
        //     const file = await response.blob();

        //     let upload = firebase
        //         .storage()
        //         .ref(path)
        //         .put(file);

        //     upload.on(
        //         "state_changed",
        //         snapshot => {},
        //         err => {
        //             rej(err);
        //         },
        //         async () => {
        //             const url = await upload.snapshot.ref.getDownloadURL();
        //             res(url);
        //         }
        //     );
        // });
    };

    pickImage = async () =>{
        console.log("image button working....")
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          })
          .then(img => {
            console.log(img);
            this.setState({image: img.path});
          })
          .catch((e) => {
            console.log(e);
            //alert('Email/ Password is wrong')
          });
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
               <View style={styles.header}>
                   <TouchableOpacity>
                        <Icon name="lock-outline" size={24} color="#D8D9D8" />
                   </TouchableOpacity>

                   <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontWeight: '500'}}>Post</Text>
                   </TouchableOpacity>
               </View>

               <View style={styles.inputContainer}>
                   <Image source={{uri: this.state.photoURL}} style={styles.avater} />
                   <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{flex: 1}}
                        placeholder="Want to share something?"
                        onChangeText={text => this.setState({text})}
                        value={this.state.text}
                   ></TextInput>
               </View>

               <TouchableOpacity 
                    style={styles.photo} 
                    onPress={this.pickImage}>
                    {/* <Icon name="lock-outline" size={32} color="#D8D9D8" /> */}
                    <Image 
                            source={require("../../assets/camera.png")}
                            style= {{
                                width: 32,
                                height: 32,                                
                                tintColor: "#D8D9D8",
                                                        
                              }}  
                        />
               </TouchableOpacity>

               <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source={{uri: this.state.image}} style={{width: "100%", height: "100%" }} />
               </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9D8"
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avater: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    }
})
