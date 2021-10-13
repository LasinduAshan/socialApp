import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default class FirebaseUtil {

    public static signIn = (email: string, password: string) =>{    
        return auth().signInWithEmailAndPassword(email, password);
    };

    public static signUp = (email: string, password: string) =>{    
        return auth().createUserWithEmailAndPassword(email, password);
    };

    public static signOut = () => {    
        return auth().signOut();
    };

    // public static googleLogin = () => {    
    //     // Get the users ID token
    //     const { idToken } = await GoogleSignin.signIn();

    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    // };

    
}
