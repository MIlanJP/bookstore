import firebase from 'firebase';
import firebase1 from 'firebase/app';

import admin from 'firebase-admin'

const firebaseConfig = {
    apiKey: "AIzaSyCF8I46ftSKLpqRBZ1xPIWZXbkA4I2zK04",
    authDomain: "bookstore-5636e.firebaseapp.com",
    databaseURL: "https://bookstore-5636e.firebaseio.com",
    projectId: "bookstore-5636e",
    storageBucket: "bookstore-5636e.appspot.com",
    messagingSenderId: "540723071433",
    appId: "1:540723071433:web:f2065f00acaf7ed9e24018",
    measurementId: "G-NWV2SXZW3D"
  };

  firebase.initializeApp(firebaseConfig)

  export const auth=firebase.auth();
  export const fireStore=firebase.firestore();
  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  // export const createUserProfileDocument=async(userAuth,additionalData)=>{
  //   // if(userAuth==='') return 
  //   const userRef=fireStore.doc('users/PPuI3rXmthxyGDqGOmML')
  //   const snapshot=await userRef.get()
  //   console.log(JSON.s snapshot)
  //    fireStore.collection('users').get().then( 
  //     (data)=>{
  //       // console.log(data.docs)
   
  //     }
  //   )
  // }
  export const signInWithGoogle=()=>{auth.signInWithPopup(provider)}
export default firebase;

