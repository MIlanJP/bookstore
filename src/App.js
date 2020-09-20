import React, { useEffect ,useState} from 'react';
import './App.css';
import firebase,{signInWithGoogle,fireStore,auth} from './utils/firebase.utils'
import {BrowserRouter as Router,Route} from 'react-router'
import {useHistory} from 'react-router'
import Login from './components/starterpage'
import Profile from './components/profile'
function App() {
  let history = useHistory();
  const [bookList,setBookList]=useState()
  const [user,setUser]=useState()
  const checkAuthStateChange=()=>{
    auth.onAuthStateChanged(user=>{
      setUser(user.displayName)
      if(user.displayName!==''){
        history.push('/profile')
      }
   })
  }
  useEffect(()=>{
    const ref = firebase.database().ref();

ref.on("value", function(snapshot) {
   console.log(snapshot.val().list);
}, function (error) {
   console.log("Error: " + error.code);
});
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
