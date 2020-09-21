import React,{useEffect,useState} from 'react'
import firebase from '../utils/firebase.utils'
import styles from "../scss/profile.module.scss";
import {auth} from '../utils/firebase.utils'
import {useHistory,Route} from 'react-router'
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Books from './Books'

import Header from './header'
import ItemCard from './ItemCard'


const useStyle = makeStyles((theme) => ({
    pagination:{
        color:'white',
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        // color:" rgb(143,43,47)",
        // "&.paginationColor":{
        //     "&.selectedColor":{
        //         color:"green",
        //     }
        // }
    },
}))

function Profile(props) {
    const classes = useStyle();
    const [listOfBooks ,setListOfBooks]=useState([])
        const[page,setPage]=useState(1)
    const[maxpage,setMaxPage]=useState()
    const[lastPageSize,setLastPageSize]=useState()
    const[cardsLimit,setCardsLimit]=useState(8)
    const decrementInnerHtml='<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    const incrementInnerHtml='<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    const[from,setFrom]=useState(0);
    const[reminder,setReminder]=useState()
    const[to,setTo]=useState(8);

    useEffect( ()=>{
        if(props.user===''|| props.user===null){
            history.push('/')
        }
        const ref = firebase.database().ref();

        ref.on("value",  function(snapshot) {
           setListOfBooks(snapshot.val().list)
           console.log(snapshot.val().list[1])
           const checkLength=Math.floor(snapshot.val().list.length/cardsLimit)
           const remind=snapshot.val().list.length%cardsLimit
        //    console.log(listOfBooks[1])
           if(remind!==0){
              setLastPageSize(remind)
              setMaxPage(checkLength+1)
           }else{
            setLastPageSize(cardsLimit)
            setMaxPage(checkLength)
           }
        }, function (error) {
           console.log("Error: " + error.code);
        });
    },[])

    const history=useHistory();
    return (<div>
        <Header userData={props.userData}  />
        <div>
          {props.user}  profile
        </div>

        {/* <button className={styles.logoutButton} onClick={()=>{auth.signOut(); history.push('/')}}>Logout</button> */}
      <Route exact path="/profile" component={Books}/>
        {/* <ItemCard/>  */}



      

         </div>
    )
}

export default Profile
