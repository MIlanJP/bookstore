import React,{useEffect} from 'react'
import styles from "../scss/profile.module.scss";
import {auth} from '../utils/firebase.utils'
import {useHistory} from 'react-router'
import Header from './header'

function Profile(props) {
    useEffect(()=>{
        if(props.user===''|| props.user===null){
            history.push('/')
        }
    })
    const history=useHistory();
    return (<div>
        <Header/>
        <div>
          {props.user}  profile
        </div>
        <button className={styles.logoutButton} onClick={()=>{auth.signOut(); history.push('/')}}>Logout</button>
        </div>
    )
}

export default Profile
