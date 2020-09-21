import React,{useEffect,useState} from 'react'
import {useHistory,Route} from 'react-router'
import Books from './Books'
import Cart from './Cart'
import Header from './header'




function Profile(props) {
const [searchContent,setSearchContent]=useState('')
    useEffect( ()=>{
        if(props.user===''|| props.user===null){
            history.push('/')
        }
    },[])

    const history=useHistory();
    return (<div>
        <Header userData={props.userData} searchContent={searchContent} setSearchContent={setSearchContent}  />
        <div>
          {props.user}  profile
        </div>

        {/* <button className={styles.logoutButton} onClick={()=>{auth.signOut(); history.push('/')}}>Logout</button> */}
        {/* <Switch> */}
        
      <Route exact path="/profile" render={()=>(<Books searchContent={searchContent}  />)}/>
      <Route exact path="/profile/cart" render={()=>(<Cart/>)}/>
     
      {/* </Switch> */}
        {/* <ItemCard/>  */}



      

         </div>
    )
}

export default Profile
