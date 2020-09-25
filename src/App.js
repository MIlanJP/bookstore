import React, { useEffect, useState } from "react";


import "./App.css";
import {useDispatch} from 'react-redux'
import {setBookInCart} from './redux'
import {updateCartQuantity} from './redux'
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
        }
        
      );
  
    });

  };
  useEffect(() => {
   return checkAuthStateChange();
  }, userData);

  const handleUserDataChange=(data)=>{
    setUserData(data)

  }

  return (

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
  );
}

export default App;
