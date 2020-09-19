import React from 'react'
import styles from '../scss/starterpage.module.scss'
import firebase,{signInWithGoogle,fireStore,auth} from '../utils/firebase.utils'
import {Link} from 'react-router-dom'

function Login() {  
    return (
        <div className={styles.mainLayout}  >
             <button onClick={signInWithGoogle} data-testid='signInButton' component={Link} to='/profile'   >Sign In with Google</button>
        </div>
    )
}

export default Login
