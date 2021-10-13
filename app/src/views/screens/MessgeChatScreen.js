import React, { Component, useState, useCallback, useEffect, useLayoutEffect, useContext } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

const MessgeChatScreen = ({route, navigation}) =>  {
   
    const { guestID } = route.params;

    const [messages, setMessages] = useState([]);
    const [currentUID, setCurrentUID] = useState("");
    const [guestUID, setGuestUID] = useState("");
    const [msgText, setmsgText] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    let [image, setImage] = useState("");
 
    // useEffect(() => {
    //     setMessages([
    //     {
    //         _id: 1,                                              current uid
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: {
    //         _id: 2,                                              guest uid
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //         },
    //     },
    //     {
    //         _id: 2,
    //         text: 'Hello world',
    //         createdAt: new Date(),
    //         user: {
    //         _id: 1,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //         },
    //     },
    //     ])
    // }, [])

    // useEffect(() => {
        
    //     const currntUid = auth().currentUser.uid;
    //     // const gusUid = navigation.getparam("guestID");
    //     //const  guestID = navigation.getParam('guestID');

    //     // setCurrentUID(currntUid);
    //     // console.log(currentUID+"     "+guestID);
        
    // }, [])

    async function callMethod () {
        
        const currentUID = auth().currentUser.uid;

        database()
        .ref("messages")
        .child(currentUID)
        .child(guestID)
        .on('value', snapshot => {
            // const uid = auth().currentUser.uid;
            let messages = [];
            snapshot.forEach((data) => {
                    messages.push({
                        sendBy: data.val().message.sender,
                        recieveBy: data.val().message.reciever,
                        msg: data.val().message.msg,
                        img: data.val().message.image,
                        date: data.val().message.date, 
                        time: data.val().message.time                  
                    });
                   // console.log( data.val().message.msg)
            });

            setAllMessages(messages.reverse());
            setCurrentUID(currentUID);
            console.log("All messages   "+messages)
      });

       
        
    }


    useEffect(() => {
       
        callMethod();

        // const parent = navigation.dangerouslyGetParent();
        //                     parent.setOptions({
        //                     tabBarVisible: false,
        //                     });
        //                     return () =>
        //                     parent.setOptions({
        //                     tabBarVisible: true,
        //                 });
        
    }, [])

    useLayoutEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .orderBy('createdAt','desc')
            .onSnapshot(snapshot => setMessages(
               
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    text: doc.data().text,
                    createdAt:  doc.data().createdAt.toDate(),
                    user: doc.data().user
                }))
            ))
            return unsubscribe;
       
    }, [])
 
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        const{
            _id,
            text,
            createdAt,
            user
        } = messages[0]
        firestore()
                .collection('chats')
                .add({
                    _id,
                    text,
                    createdAt,
                    user
                })
                .then(() => {
                    console.log("chat saved..")
                })

    }, [])

    const renderBubble = (porps) => {
        return(
            <Bubble
                {...porps}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5'
                    },
                    left: {
                        backgroundColor: '#EFECF4'
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        )
    }

    async function callMessage () {
        
        if (msgText.length != 0) {
            
            sendMessage();

            recieveMessage();
            

        }
       
        
    }

    async function sendMessage () {
        const currentUID = auth().currentUser.uid;
        const todayDate = moment();
        //console.log(" add user method working...." + currentUID,"   ",guestID)
        
        // if (msgText.length != 0) {
            database()
                .ref('messages/'+currentUID)
                .child(guestID)
                .push({
                    message: {
                        sender: currentUID,
                        reciever: guestID,
                        msg: msgText,
                        image: "",
                        date: todayDate.format('YYYY-MM-DD'),
                        time: todayDate.format('hh:mm A')
                    },
                    
            })
            .then( ()=> {
                setmsgText("");
                console.log("chat saved...");
            })
            .catch((e) => {
                console.log(e);
                
            });
        // }

        
    }

    async function sendMessageImage (img) {
        const currentUID = auth().currentUser.uid;
        const todayDate = moment();
        //console.log(" add user method working...." + currentUID,"   ",guestID)
        
        // if (msgText.length != 0) {
            database()
                .ref('messages/'+currentUID)
                .child(guestID)
                .push({
                    message: {
                        sender: currentUID,
                        reciever: guestID,
                        msg: "",
                        image: img,
                        date: todayDate.format('YYYY-MM-DD'),
                        time: todayDate.format('hh:mm A')
                    },
                    
            })
            .then( ()=> {
                console.log("chat saved...");
            })
            .catch((e) => {
                console.log(e);
                
            });
        // }

        
    }

    async function recieveMessage () {
        const currentUID = auth().currentUser.uid;
        const todayDate = moment();
        //console.log(" add user method working...." + currentUID,"   ",guestID)
        
        database()
            .ref('messages/'+guestID)
            .child(currentUID)
            .push({
                message: {
                    sender: currentUID,
                    reciever: guestID,
                    msg: msgText,
                    image: "",
                    date: todayDate.format('YYYY-MM-DD'),
                    time: todayDate.format('hh:mm A')
                },
        })
          .then( ()=> {
            setmsgText("");
            console.log("chat saved...");
          })
          .catch((e) => {
            console.log(e);
            
          });
    }

    async function recieveMessageImage (img) {
        const currentUID = auth().currentUser.uid;
        const todayDate = moment();
        //console.log(" add user method working...." + currentUID,"   ",guestID)
        
        database()
            .ref('messages/'+guestID)
            .child(currentUID)
            .push({
                message: {
                    sender: currentUID,
                    reciever: guestID,
                    msg: "",
                    image: img,
                    date: todayDate.format('YYYY-MM-DD'),
                    time: todayDate.format('hh:mm A')
                },
        })
          .then( ()=> {
            console.log("chat saved...");
          })
          .catch((e) => {
            console.log(e);
            
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
            setImage(img.path);
            uploadImage(img.path);

          })
          .catch((e) => {
            console.log(e);
            //alert('Email/ Password is wrong')
          });
    }

    async function uploadImage (image) {
        
            console.log("Upload profile photo method working........")

            const path = `message_photo/${auth().currentUser.uid}/${Date.now()}.jpg`;
            
            const reference = storage().ref(path);

            await reference.putFile(image);

            await storage().ref(path).getDownloadURL()
                .then((res) => {
                    console.log("response photo url "+res);

              
                    sendMessageImage(res);

                    recieveMessageImage(res);
                
            })

            
         
    }

        return (

            <View style={styles.container}>



                <FlatList
                    inverted
                    style={{marginBottom: 60}}
                    data={allMessages}
                    keyExtractor={(_,index) => index.toString()}        
                    // keyExtractor={item => item.key}            
                    renderItem={({ item }) => (

                        <View style={{marginVertical: 5, maxWidth: Dimensions.get('window').width/2+10, alignSelf: currentUID==item.sendBy? 'flex-end' : 'flex-start' }}>
                            <View style={{borderRadius: 15, backgroundColor: currentUID==item.sendBy? '#2e64e5' : '#EAE6E5'}}>
                            {/* <View style={{borderRadius: 20, backgroundColor: currentUID==item.sendBy? '#fff' : '#ccc'}}> */}
                                
                                {item.img == "" 
                                ? <Text style={{padding: 10, fontSize: 16, color: currentUID==item.sendBy? '#fff' : '#000'}}>
                                        {item.msg} {"   "}  <Text style={{fontSize: 12, color: currentUID==item.sendBy? '#fff' : '#000'}}> {item.time}</Text>
                                  </Text>
                                : <View>
                                        <Image source={{uri: item.img}} style={{width: Dimensions.get('window').width/2+10, height: 150, resizeMode: 'stretch', borderRadius: 10 }} />
                                        <Text style={{fontSize: 12, position: 'absolute', bottom: 5, right: 5}}> {item.time}</Text>
                                  </View>
                                
                                }

                                
                            </View>

                        </View>
                                                
                    )}
                    
                 /> 



                <View style={{bottom: 0, height: 50, width: "100%", position: 'absolute', flexDirection: "row"}}>

                    <TouchableOpacity onPress={() => pickImage()} style={{width: "12%", marginRight: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="camera" size={30} color="#ccc" />
                    </TouchableOpacity>


                    <View style={{width: "70%", justifyContent: 'center'}}>
                        <TextInput onChangeText={setmsgText} value={msgText} placeholder="Enter message"  style={{height: 40, borderRadius: 20, backgroundColor: "#ccc"}}/>
                    </View>

                    <TouchableOpacity onPress={() => callMessage()} style={{width: "18%", marginLeft: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="send" size={30} color="#ccc" />
                    </TouchableOpacity>
                    
                </View>
            </View>

            // <GiftedChat
            //     messages={messages}
            //     onSend={messages => onSend(messages)}
            //     user={{
            //          _id: auth().currentUser.email,
            //         // _id: guestID,
            //         name: auth().currentUser.displayName,
            //         avatar: auth().currentUser.photoURL,
            //     }}
            //     renderBubble={renderBubble}
            //     alwaysShowSend
            //     scrollToBottom
            //     showAvatarForEveryMessage={true}
            // />

            // <GiftedChat
            //     messages={messages}
            //     onSend={messages => onSend(messages)}
            //     user={{
            //         _id: 1,
            //     }}
            //     renderBubble={renderBubble}
            //     alwaysShowSend
            //     scrollToBottom
            // />
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
         backgroundColor: "#fff"
    }
})

export default MessgeChatScreen;