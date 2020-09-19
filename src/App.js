import React, { useEffect ,useState} from 'react';
import './App.css';
import firebase,{signInWithGoogle,fireStore,auth} from './utils/firebase.utils'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './components/starterpage'
import Profile from './components/profile'
function App() {
  const [bookList,setBookList]=useState()
  const [user,setUser]=useState()
  useEffect(()=>{
    const ref = firebase.database().ref();

ref.on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});
    
   auth.onAuthStateChanged(user=>{
      setUser(user.displayName)
      console.log(user)
   })
  })
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
     
    </div>
    </Router>
  );
}

export default App;
