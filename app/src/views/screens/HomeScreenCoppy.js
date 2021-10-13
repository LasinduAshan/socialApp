import React, { Component, useState,  useEffect, createContext } from 'react'
import { Text, StyleSheet,  Button, View, FlatList, Image } from 'react-native'
import FirebaseUtil from '../../../../utils/FirebaseUtil';
import auth from '@react-native-firebase/auth';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';


 const posts = [
    {
        id: "1",
        name: "Joe kerly",
        text: "Lorem sjkjddjkdjkjdksldjlsajlkajkdalkd jljaljlakjd dsdskjhksjhda dskjdsalkdjakda dkjhadjlkadja lkjskllaklajlakjdlakjd lkjadklajd",
        timestamp: 1569109273726,
        avater: require("../../assets/car.jpeg"),
        image: require("../../assets/car.jpeg")
    },
    {
        id: "2",
        name: "Joe kerly",
        text: "Lorem sjkjddjkdjkjdksldjlsajlkajkdalkd jljaljlakjd dsdskjhksjhda dskjdsalkdjakda dkjhadjlkadja lkjskllaklajlakjdlakjd lkjadklajd",
        timestamp: 1569109273726,
        avater: require("../../assets/car.jpeg"),
        image: require("../../assets/car.jpeg")
    },
    {
        id: "3",
        name: "Joe kerly",
        text: "Lorem sjkjddjkdjkjdksldjlsajlkajkdalkd jljaljlakjd dsdskjhksjhda dskjdsalkdjakda dkjhadjlkadja lkjskllaklajlakjdlakjd lkjadklajd",
        timestamp: 1569109273726,
        avater: require("../../assets/car.jpeg"),
        image: require("../../assets/car.jpeg")
    },
    {
        id: "4",
        name: "Joe kerly",
        text: "Lorem sjkjddjkdjkjdksldjlsajlkajkdalkd jljaljlakjd dsdskjhksjhda dskjdsalkdjakda dkjhadjlkadja lkjskllaklajlakjdlakjd lkjadklajd",
        timestamp: 1569109273726,
        avater: require("../../assets/car.jpeg"),
        image: require("../../assets/car.jpeg")
    },
];




export default class HomeScreen extends Component {

    state = {
        email: "",
        displayName: "",
        uid: "",
        posts: []
    };
    
    componentDidMount = async () =>{

        const {email, displayName, uid } = auth().currentUser;

        const posts = await firestore().collection('posts').get();

        this.setState({email, displayName, uid, posts });
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

    // signOut = () =>{
    //     // console.log(email,password)

    //     FirebaseUtil.signOut() 
    //     .catch((e) => {
    //         console.log(e);
    //         //alert('Email/ Password is wrong')
    //     });
    // }

//    const signOut = () =>{
//         // console.log(email,password)

//         FirebaseUtil.signOut() 
//         .catch((e) => {
//             console.log(e);
//             //alert('Email/ Password is wrong')
//         });
//     }

    

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avater} style={styles.avater}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>

                        {/* <Icon name="lock-outline" size={24} color="#73788B" /> */}
                        <Image 
                            source={require("../../assets/more.png")}
                            style= {{
                                width: 24,
                                height: 24,                                
                                tintColor: "#73788B",                          
                              }}  
                        />
                    </View>

                    <Text style={styles.post}>{post.text}</Text>

                    <Image source={post.image} style={styles.postImage} resizeMode="cover"/>

                    <View style={{flexDirection: 'row'}}>
                        {/* <Icon name="lock-outline" size={24} color="#73788B" style={{marginRight: 16}}/> */}
                        <Image 
                            source={require("../../assets/heart.png")}
                            style= {{
                                width: 24,
                                height: 24,                                
                                tintColor: "#73788B",
                                marginRight: 16                          
                              }}  
                        />
                        {/* <Icon name="lock-outline" size={24} color="#73788B" /> */}
                        <Image 
                            source={require("../../assets/chat.png")}
                            style= {{
                                width: 24,
                                height: 24,                                
                                tintColor: "#73788B",                          
                              }}  
                        />
                    </View>

                </View>
            </View>
        );
    };


    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.header}>
                     <Text style={styles.headerTitle}>Feed</Text>
                 </View>

                 <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                 />
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4"
    },
    header: {
        paddingTop: 40,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10

        // shadowColor: '#000',
        // shadowOffset: {
        // width: 10,
        // height: 10,
        // },
        // shadowOpacity: 0.06,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    avater: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#c4c6ce",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,

    }
})

