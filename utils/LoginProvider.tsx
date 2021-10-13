import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native'import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
 
interface ContextType {
    user: FirebaseAuthTypes.User | null;
    isLoading : boolean;
}

export const LoginContext = React.createContext({} as ContextType);

interface Props {
   // children : React.Node;
   
}

export default function LoginProvider(props: Props) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        setIsLoading(false);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    // return <LoginContext.LoginProvider value={{user, isLoading}}>
    //             {this.props.children}
    //        </LoginContext.LoginProvider>;
}
