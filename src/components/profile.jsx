import React,{useEffect,useState} from 'react'
import firebase from '../utils/firebase.utils'
import styles from "../scss/profile.module.scss";
import {auth} from '../utils/firebase.utils'
import {useHistory} from 'react-router'
import Header from './header'
import ItemCard from './ItemCard'
function Profile(props) {
    const [listOfBooks ,setListOfBooks]=useState([])
    useEffect(()=>{
        if(props.user===''|| props.user===null){
            history.push('/')
        }
        const ref = firebase.database().ref();

        ref.on("value", function(snapshot) {
        //    console.log(snapshot.val().list);
           setListOfBooks(snapshot.val().list)
           console.log(listOfBooks)
        }, function (error) {
           console.log("Error: " + error.code);
        });
    })
    const history=useHistory();
    return (<div>
        <Header/>
        <div>
          {props.user}  profile
        </div>

        {/* <button className={styles.logoutButton} onClick={()=>{auth.signOut(); history.push('/')}}>Logout</button> */}
      
        {/* <ItemCard/>  */}
        <div className={styles.booksContainer} >
        {listOfBooks.map((book=>{
          return  <ItemCard className={styles.bookColumn}  book={book}/>
        }))}
        </div>

         </div>
    )
}

export default Profile
