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
  const [userData,setUserData]=useState()
  const[id,setId]=useState()
  const[itemsInCart,setItemsInCart]=useState(0)
   const   checkAuthStateChange=async ()=>{

  let id;
  let email;
    await  auth.onAuthStateChanged( async  (userDoc)=>{
     if(userDoc===null)return;
     setId(userDoc.uid)
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
          setUserData(snapShot.data())
          if(!snapShot.exists){
            try{
              await userRef.set({ 
                name:user,
                email:email,
                booksInCart:0,
        
              })
            }catch(err){
         
            }
          }
          await fireStore.collection(`users`).get()
        });

       }
      // fireStore.collection(`users/${userDoc.uid}`).set({
      //   name:userDoc.displayName,
      //   email:userDoc.email
      // })
    

    // await  fireStore.collection(`users`).get().then(snapShot=>{
    //     const users=[];
    //     snapShot.forEach(doc=>{
    //       const data=doc.data()
    //       users.push(data)
    //     })
    //     console.log(users )
    //   }).catch(err=>{
    //     console.log(err)
    //   })
      // createUserProfileDocument()
   })
  //  await fireStore.collection(`users`).get().then(snapshot=>{
  //   console.log(snapshot,id)
  // })


  }
  useEffect(()=>{
checkAuthStateChange()

  },[])
  return (
    <div className="App">
      <Route exact path="/" render={()=>(<Login checkAuthStateChange={checkAuthStateChange}  />)}  />
      <Route exact path="/profile" render={()=>(<Profile userData={userData}   user={user} id={id}   />)}/>
     
    </div>
  );
}

export default App;
