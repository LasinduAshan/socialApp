import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Fire{
    // constructor(){
    //     firebase.initializeApp()
    // }


    addPost = async ({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);

        return new Promise ((res, rej) => {
            this.fireStore
                .collections("posts")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    Image: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error)
                })
        })
    }


    uploadPhotoAsync = async uri => {
        const path = `photo/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(path)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    get fireStore(){
        return this.fireStore()
    }

    get uid(){
        return (auth().currentUser || {}).uid
    }

    get timestamp(){
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;