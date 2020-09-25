import React, { useEffect, useState,useRef } from "react";
import { useHistory, Route } from "react-router";
import Books from "./Books";
import Cart from "./Cart";
import Ordersucessfullypage from './ordersucesspage'
import Header from "./header";

function Profile(props) {
  const [searchContent, setSearchContent] = useState("");
  let badge=useRef(null)
  useEffect(() => {
    if (props.user === "" || props.user === null) {
      history.push("/");
    }
    console.log(badge)
  });


  const history = useHistory();
  return (
    <div>
      <Header
        userData={props.userData}
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
      <div>{props.user} profile</div>

      {/* <button className={styles.logoutButton} onClick={()=>{auth.signOut(); history.push('/')}}>Logout</button> */}
      {/* <Switch> */}

      <Route
        exact
        path="/profile"
        component={() => (
          <Books
          ref={badge}
            searchContent={searchContent}
            userData={props.userData}
            setUserData={props.setUserData}
            listOfBooks={props.listOfBooks}
            setListOfBooks={props.setListOfBooks}
          />
        )}
      />
      
      <Route exact path="/profile/cart" render={() => <Cart 
         listOfBooks={props.listOfBooks}
         setUserData={props.setUserData}
         userData={props.userData}
      />} />

<Route exact path="/profile/ordersuccesspage" render={() => <Ordersucessfullypage 
         listOfBooks={props.listOfBooks}
         setUserData={props.setUserData}
         userData={props.userData}
      />} />

      {/* </Switch> */}
      {/* <ItemCard/>  */}
    </div>
  );
}

export default Profile;
