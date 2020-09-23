import React, { useEffect, useState } from "react";
import "./App.css";
import {useDispatch} from 'react-redux'
import {setBookInCart} from './redux'
import {updateCartQuantity} from './redux'
import {CartItemsProvider} from './components/cartItemsContext'
import firebase, {
  
  fireStore,
  auth,
  
} from "./utils/firebase.utils";
import { BrowserRouter as Router, Route } from "react-router";
import { useHistory } from "react-router";
import Login from "./components/starterpage";
import Profile from "./components/profile";
function App() {
  const dispatch = useDispatch()
  let history = useHistory();
  const [listOfBooks, setListOfBooks] = useState([]);

  const [user, setUser] = useState();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    booksInCart: 0,
    itemsList: [],
  });
  const [ItemsInCart,setItemsInCart] = useState(0);
  const [id, setId] = useState();
  const checkAuthStateChange =  () => {
    let id;
    let email;
     auth.onAuthStateChanged(async (userDoc) => {
      if (userDoc === null) return;
      setId(userDoc.uid);
      
      id = userDoc.uid || null;
      email = userDoc.email || null;
      setUser(userDoc.displayName);
      console.log(userDoc);
      if (userDoc.displayName !== "") {
       if( window.location.pathname==='/'){
        history.push("/profile");
       }
      }
      if (user !== "" && id !== null) {
        const userRef = fireStore.doc(`users/${userDoc.uid}`);
        await userRef.get().then(async (snapShot) => {
          setUserData(snapShot.data());
          dispatch(setBookInCart(snapShot.data().itemsList))
          setItemsInCart(snapShot.data().booksInCart)
          dispatch(updateCartQuantity(snapShot.data().booksInCart))
          if (!snapShot.exists) {
            try {
              await userRef.set({
                name: user,
                email: email,
                booksInCart: 0,
                itemsList: [],
              });
            } catch (err) {}
          }
        });
      }
      
      const ref = firebase.database().ref();
    
      ref.on(
        "value",
        function (snapshot) {
          setListOfBooks(snapshot.val().list);
         
        },
        function (error) {
          console.log("Error: " + error.code);
        }
        
      );
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
    });
    //  await fireStore.collection(`users`).get().then(snapshot=>{
    //   console.log(snapshot,id)
    // })
  };
  useEffect(() => {
   return checkAuthStateChange();
  }, userData);

  const handleUserDataChange=(data)=>{
    console.log("from app")
    setUserData(data)
    console.log(userData)

  }

  return (
    <CartItemsProvider
    value={ItemsInCart}
    >
    <div className="App">
      <Route
        exact
        path="/"
        render={() => <Login checkAuthStateChange={checkAuthStateChange} />}
      />
      <Route
        path="/profile"
        render={() => (
          <Profile
            userData={userData}
            setUserData={handleUserDataChange}
            user={user}
            id={id}
            listOfBooks={listOfBooks}
            setListOfBooks={setListOfBooks}
          />
        )}
      />
    </div>
    </CartItemsProvider>
  );
}

export default App;
