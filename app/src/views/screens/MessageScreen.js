import React, { Component, useState, useCallback, useEffect } from 'react'
import { Text, StyleSheet, View, Button, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import moment from 'moment';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// const messages = [
//     {
//         id: "1",
//         userName: "Joe kerly",
//         text: "Lorem sjkjddjkdjkjdkslakjd lkjadklajd",
//         messageTime: 1569109273726,
//         userImage: require("../../assets/car.jpeg"),
      
//     },
//     {
//         id: "2",
//         userName: "Joe kerly",
//         text: "Lorem sjkjddjkdjkjdksldj lkjskllalakjd lkjadklajd",
//         messageTime: 1569109273726,
//         userImage: require("../../assets/car.jpeg"),
//     },
//     {
//         id: "3",
//         userName: "Joe kerly",
//         text: "Lorem sjkjddjkdjkjakda dkjhad lkjadklajd",
//         messageTime: 1569109273726,
//         userImage: require("../../assets/car.jpeg"),
//     },
//     {
//         id: "4",
//         userName: "Joe kerly",
//         text: "Lorem sjkjddjdja lkjskllakkjd lkjadklajd",
//         messageTime: 1569109273726,
//         userImage: require("../../assets/car.jpeg"),
//     },
// ];

const MessageScreen = ({navigation}) =>  {
   
    const [allUsers, setAllUsers] = useState([]);


    async function callMethod () {
        
        database()
        .ref("users")
        .on('value', snapshot => {
            const uid = auth().currentUser.uid;

            new Promise((reslove, reject) => {
                let users = [];
                let lastMessage = "";
                let lastDate = "";
                let lastTime = "";
                let properDate = "";            
                //console.log('User data: ', snapshot.val());
                snapshot.forEach((child) => {
                // console.log(child)
                    if (child.val().uid == auth().currentUser.uid) {
                        //console.log("currnt userName"+child.val().name)
                    } else {

                        let newUsers = {
                            userID: "",
                            userName: "",
                            userPropic: "",
                            lastMessage: "",
                            lastDate: "",
                            lastTime: "",
                            properDate: ""
                        };

                        new Promise((reslove, reject) => {
                            database()
                                .ref("messages")
                                .child(auth().currentUser.uid)
                                .child(child.val().uid)
                                .orderByKey().limitToLast(1)
                                .on('value', dataSnapshots => {
                                    if (dataSnapshots.val()) {
                                        // console.log("value"+dataSnapshots.val())
                                        dataSnapshots.forEach((child) => {
                                            // console.log("message"+child.val().message.message)
                                            lastMessage = child.val().message.image != "" ? 'Photo' : child.val().message.msg;
                                            lastDate = child.val().message.date;
                                            lastTime = child.val().message.time;
                                            properDate = child.val().message.date +" " + child.val().message.time;
                                        });
                                    }
                                    else{
                                        lastMessage = "";
                                        lastDate = "";
                                        lastTime = "";
                                        properDate = "";
                                    }
                                    // console.log("name"+lastMessage)
                                    newUsers.userID = child.val().uid;
                                    newUsers.userName = child.val().name;
                                    newUsers.userPropic = child.val().image;
                                    newUsers.lastMessage = lastMessage;
                                    newUsers.lastDate = lastDate;
                                    newUsers.lastTime = lastTime;
                                    newUsers.properDate = properDate;

                                    return reslove(newUsers);
                                });
                        }).then( (newUsers) => {
                            // console.log(" then eka athule..."+ newUsers.userName)
                            users.push({
                                name: newUsers.userName,
                                uid: newUsers.userID,
                                image: newUsers.userPropic,
                                lastMessage: newUsers.lastMessage,  
                                lastDate: newUsers.lastDate,
                                lastTime: newUsers.lastTime,
                                properDate: newUsers.lastDate ? new Date(newUsers.properDate) : null                     
                            });
                            console.log("user arry"+users)
                            //setAllUsers(users.sort((a,b) => b.properDate - a.properDate));
                            let sortedCars1 = users.sort((a,b) => b.properDate - a.properDate);

                            setAllUsers(sortedCars1);
                            // console.log(users.name)
                        });

                        return reslove(users);

                        // users.push({
                        //     name: child.val().name,
                        //     uid: child.val().uid,
                        //     image: child.val().image,
                        //     email: child.val().email                     
                        // });
                    };
                    // const {           
                    //     email,
                    //     name,
                    //     image,
                    //     uid,
                        
                    // } = child.val();

                    // users.push({
                    //     email,
                    //     name,
                    //     image,
                    //     uid,
                        
                    // });
                });

        }).then( (users)=> {
            console.log("user arry pahalama"+users)
            // setAllUsers(users.sort((a,b) => b.properDate - a.properDate));
            let sortedCars1 = users.sort((a, b) => b.properDate - a.properDate);
            //setAllUsers(users);
            // console.log(users.lastMessage)
        });

            //  console.log(users)
            // setAllUsers(users);
      });
       
        
    }

    useEffect(() => {
       
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Refreshed!');
            callMethod();
            console.log(" useEffect eka wada...")
        });

        return unsubscribe;

        

    }, [navigation]);



    return (
        <View style={{flex: 1,  paddingTop: 20}}>
            <FlatList
                    data={allUsers}
                    keyExtractor={item => item.uid}                    
                    renderItem={({ item }) => (

                        // <SafeAreaView style={styles.feedItem}>
                            
                            
                        //     <TouchableOpacity onPress={() => navigation.navigate("MessagesChat",{userName: item.name, guestID: item.uid})}>
                        //         <View style={styles.inputContainer}>
                        //             <Image source={{uri: item.image}} style={styles.avater} />
                        //             <Text style={styles.name}> {item.name} </Text>
                        //             <Text style={styles.timestamp} > {item.lastTime} </Text>
                        //                  <View>
                        //                     <Text style={styles.post}>{item.lastMessage}</Text>
                        //                 </View>
                        //         </View>
                        //     </TouchableOpacity>

                        // </SafeAreaView>
                        <View> 
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 20, marginTop: 20}} onPress={() => navigation.navigate("MessagesChat",{userName: item.name, guestID: item.uid})}>
                                    <View style={{width: "15%", alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                                        <Image source={{uri: item.image}} style={styles.avater} />
                                    </View>

                                    <View style={{width: "60%", alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10}}>
                                        <Text style={{color: "#000", fontSize: 16, fontWeight: 'bold'}}> {item.name} </Text>
                                        <Text style={{color: "#000", fontSize: 12, fontWeight: '400'}}> {item.lastMessage} </Text>
                                    </View>

                                    <View style={{width: "25%", alignItems: 'flex-start', justifyContent: 'center', marginRight: 25}}>
                                        <Text style={{color: "#000", fontSize: 11, fontWeight: '400'}}> {item.lastTime} </Text>
                                        {/* <Text style={{color: "#000", fontSize: 11, fontWeight: '400'}}> {item.lastDate} </Text> */}
                                        
                                    </View>
                            </TouchableOpacity>
                            <View style={{borderWidth: 0.2, borderColor: '#000', marginLeft: 20, marginRight: 20}}/>
                        </View>
                        

                        // <View style={styles.feedItem}>
                        //     <Image source={item.userImage} style={styles.avater}/>
                        //     <Text style={styles.timestamp}>{moment(item.messageTime).fromNow()}</Text>
                        //     <View style={{flex: 1}}>
                        //         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        //             <View>
                        //                 <Text style={styles.name}>{item.userName}</Text>
                        //                 <Text style={styles.post}>{item.text}</Text>
                        //             </View>                                   
                        //         </View>
                        //     </View>
                        // </View>
                        
                    )}
                    
             /> 
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderBottomColor: 'black'
        // alignItems: 'center',
        // justifyContent: 'center'
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
        margin: 13,
        flexDirection: 'row',
       
    },
    // avater: {
    //     width: 48,
    //     height: 48,
    //     borderRadius: 24,
    //     marginRight: 16
    // },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },



    feedItem: {
        //backgroundColor: "#fff",
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9D8"
    },
    avater: {
        width: 50,
        height: 50,
        borderRadius: 25,
        //marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: "#454D65"
    },
    timestamp: {
        //position: 'relative',
        fontSize: 11,
        color: "#c4c6ce",
        left: 150
        //marginBottom: 8,
        // alignItems:'flex-end',
        // justifyContent: ''
    },
    post: {
        marginTop: 25,
        fontSize: 14,
        color: "#838899",
        fontWeight: '600',
        left: 5,
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,

    }

})

export default MessageScreen;


