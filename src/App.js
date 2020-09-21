import React, { useEffect ,useState} from 'react';
import './App.css';
import firebase,{signInWithGoogle,fireStore,auth,createUserProfileDocument} from './utils/firebase.utils'
import {BrowserRouter as Router,Route} from 'react-router'
import {useHistory} from 'react-router'
import Login from './components/starterpage'
import Profile from './components/profile'
function App() {
  let history = useHistory();
  const [bookList,setBookList]=useState()
  const [user,setUser]=useState()
   const   checkAuthStateChange=async ()=>{

  let id;
  let email;
    await  auth.onAuthStateChanged( async  (userDoc)=>{
     if(userDoc===null)return;
      id=userDoc.uid||null
      email=userDoc.email||null
      setUser(userDoc.displayName)
      console.log(userDoc)
      if(userDoc.displayName!==''){
        history.push('/profile')
      }
      if(user!=='' && id!==null ){
        const userRef= fireStore.doc(`users/${userDoc.uid}`)
        await userRef.get().then(async (snapShot)=>{
          console.log(snapShot.exists)
          if(!snapShot.exists){
            try{
              await userRef.set({ 
                name:user,
                email:email
        
              })
            }catch(err){
         
            }
          }
        });

       }
      // fireStore.collection(`users/${userDoc.uid}`).set({
      //   name:userDoc.displayName,
      //   email:userDoc.email
      // })
    

      // fireStore.collection(`users`).get().then(snapShot=>{
      //   const users=[];
      //   snapShot.forEach(doc=>{
      //     const data=doc.data()
      //     users.push(data)
      //   })
      //   console.log(users )
      // }).catch(err=>{
      //   console.log(err)
      // })
      // createUserProfileDocument()
   })
  //  await fireStore.collection(`users`).get().then(snapshot=>{
  //   console.log(snapshot,id)
  // })


  }
  useEffect(()=>{
//     const ref = firebase.database().ref();

// ref.on("value", function(snapshot) {
//    console.log(snapshot.val().list);
// }, function (error) {
//    console.log("Error: " + error.code);
// });
checkAuthStateChange()

  })
  return (
    <div className="App">
      <Route exact path="/" render={()=>(<Login checkAuthStateChange={checkAuthStateChange}  />)}  />
      <Route exact path="/profile" render={()=>(<Profile user={user}  />)}/>
     
    </div>
  );
}

export default App;
