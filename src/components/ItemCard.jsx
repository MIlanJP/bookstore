import { Button, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {addBookToCart} from '../redux'
import _ from "lodash";
import {useDispatch,useSelector} from 'react-redux'
import {updateCartQuantity} from '../redux'
import {useHistory} from 'react-router'
import React, { useState, useEffect } from "react";
import {fireStore} from '../utils/firebase.utils'
function ItemCard(props) {
const [displayAddedButton,setDisplayAddedButton]=useState(_.some( props.userData.itemsList, props.book))
const history = useHistory();
const items = useSelector((state) => state.cardquantity.items);

  const useStyle = makeStyles((theme) => ({
    mainLayout: {
      // background:'black',
      border: "black",
      height: "315px",
      width: "235px",
    },
    bookImage: {
      height: "171px",
      width: "233px",
      paddingBottom: "2px",
      background: "rgb(245,245,245)",
    },
    imageOfBook: {
      marginTop: "7%",
      height: "80%",
    },
    bookName: {
      ...theme.typography.bookName,
      paddingLeft: "25px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      textAlign: "left",
      overflow: "hidden",
      paddingRight: "20px",
    },
    authorName: {
      ...theme.typography.authorName,
      color: "#9D9D9D",
      paddingLeft: "25px",
      textAlign: "left",
      lineHeight: ".8rem",
      position: "relative",
      top: "-14px",
      display: "flex",
    },
    priceColumn: {
      ...theme.typography.priceColumn,
      paddingLeft: "25px",
      textAlign: "left",
      top: "-21px",
      position: "relative",
    },
    addToCartButton: {
      ...theme.typography.buttonText,
      background: "rgb(160,48,55)",
      color: "white",
      //   marginRight:"10px",
      padding: "4px 10px 5px 10px",
      "&:hover": {
        ...theme.typography.buttonText,
        background: "rgb(160,48,55)",
        color: "white",
      },
    },
    buttonsColumn: {
      position: "relative",
      top: "-20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    wishListButton: {
      ...theme.typography.wishListButton,
      boxShadow: " 0px 0px  3px 0px black",
      padding: "3px 10px 3px 10px",
      width: props.book.quantity > 0 ? "" : "90%",

      //   marginLeft:'10px'
    },
    outOfStock: {
      position: "absolute",
      background: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0px 0px 5px 0px black",
      height: "40px",
      width: "184px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "70px",
      fontWeight: "600",
      marginLeft: "27px",
    },
    addedTOCartButton: {
      ...theme.typography.wishListButton,
      boxShadow: " 0px 0px  3px 0px black",
      padding: "3px 10px 3px 10px",
      width: "90%",
      position: "relative",
      top: "-20px",
      background: "rgb(51,113,181)",
      "&:hover": {
        background: "rgb(51,113,181)",
      },
    },
  }));
  const dispatch= useDispatch()
  const classes = useStyle();
  //   if(_.includes(props.list,props.book.id)){
  //       console.log(props)
  //   }
useEffect(()=>{
    // setDisplayAddedButton(props.userData.itemsList.includes( props.book.id))
    // console.log("Frn crd")
    // console.log(_.some( props.userData.itemsList, props.book))
})
  return (
    <Card className={classes.mainLayout}>
      <div className={classes.bookImage}>
        {props.book.quantity > 0 ? null : (
          <div className={classes.outOfStock}>OUT OF STOCK</div>
        )}
        <img
          className={classes.imageOfBook}
          src={props.book.image}
          alt={props.book.title}
        />
      </div>

      <p className={classes.bookName} >
        {props.book.title}
      </p>
      <span className={classes.authorName}> by {props.book.author}</span>
      <p className={classes.priceColumn}>Rs {props.book.price}</p>
      {displayAddedButton ? (
        <Button className={classes.addedTOCartButton}>ADDED TO CART</Button>
      ) : (
        <div className={classes.buttonsColumn}>
          {props.book.quantity > 0 ? (
            <Button
              className={classes.addToCartButton}
              onClick={(e) => {
               

               let usersData=props.userData
               let lists=props.userData.itemsList
              //  let booksInCart=parseInt(props.userData.booksInCart)+1;
               let book=props.book;
               book.quantity=1;
               lists.push(book)
               usersData.itemsList=[...lists]
               usersData.booksInCart=parseInt(items)+1
               console.log(props.userData)
               const userRef = fireStore.doc(`users/${props.userData.id}`);
               userRef.get().then(async (snapShot) => {
                 try {
                   await userRef.update({
                     booksInCart: parseInt(items)+1,
                     itemsList: lists,
                   });
                   props.setUserData(usersData);
                   dispatch(addBookToCart(props.book))
               setDisplayAddedButton(true)
               dispatch(updateCartQuantity(parseInt(items)+1))

                 } catch (err) {}
          
               });
              }}
            >
              ADD TO BAG
            </Button>
          ) : null}

          <Button className={classes.wishListButton}>WISHLIST</Button>
        </div>
      )}
    </Card>
  );
}

export default ItemCard;
