import React, { useEffect, useState,useRef } from "react";
import { useHistory, Route } from "react-router-dom";
import Books from "./Books";
import Cart from "./Cart";
import Ordersucessfullypage from './ordersucesspage'
import Header from "./header";

function Profile(props) {
  const [searchContent, setSearchContent] = useState("");
  useEffect(() => {
    if (props.user === "" || props.user === null) {
      history.push("/");
    }
  });


  const history = useHistory();
  return (
    <div data-test="profilePage"  >
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
