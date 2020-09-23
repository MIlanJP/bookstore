import React,{ useState, useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import {fireStore} from '../utils/firebase.utils'
import {updateCartQuantity,removeBookFromCart} from '../redux'
import {useDispatch,useSelector} from 'react-redux'
import AddIcon from "@material-ui/icons/Add";
import { Button, Card } from "@material-ui/core";
import _ from "lodash";
function Cart(props) {
    const itemsToCart=useSelector(state=>state.cardquantity.itemsInCart)
    const noOfItemsInCart=useSelector(state=>state.cardquantity.items)
    const [cartItems,setCartItems] = useState(0)
  const useStyle = makeStyles((theme) => ({
    mainLayout: {
      position: "relative",
      top: "65px",
      padding: "5%",
    },
    placeOrderLayout: {
      width: "60vw",
      minWidth: "450px",
      minHeight: "100px",
      paddingLeft: "34px",
      paddingRight: "10px",
      marginLeft: "10%",
    },
    myCartTag: {
      ...theme.typography.Latofont,
      position: "absolute",
      marginLeft: "10px",
    },
    bookContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: "70px",
      marginBottom: "30px",
    },
    bookDetailsSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    imageOfBook: {
      position: "relative",
      height: "123px",
    },
    bookSection: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "31px",
    },
    bookTitle: {
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
      top: "10px",
      display: "flex",
    },
    bookPrice: {
      ...theme.typography.priceColumn,
      paddingLeft: "25px",
      textAlign: "left",
      top: "20px",
      position: "relative",
    },
    placeOrderButton: {
      ...theme.typography.placeOrder,
      width: "167px",
      marginLeft: "auto",
      bottom: "10px",
      right: "50px",
      boxShadow: " 0px 0px  3px 0px black",
      padding: "3px 10px 3px 10px",
      position: "relative",
      color: "white",
      background: "rgb(51,113,181)",
      "&:hover": {
        background: "rgb(51,113,181)",
      },
    },
    alterQuantity: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: "25px",
      position: "relative",
      top: "35px",
    },
    reduceButton: {
      borderRadius: "50%",
      boxShadow: "0 0 3px 0 black",
      margin: "0px 10px 0 1px",
      fontSize: "16px",
      marginTop: "3px",
      cursor: "pointer"
    },
    addButton: {
      borderRadius: "50%",
      boxShadow: "0 0 3px 0 black",
      margin: "0px 10px 0 10px",
      fontSize: "16px",
      marginTop: "3px",
      cursor: "pointer"

      
    },
    quantityDisplay: {
      minWidth: "20px",
      boxShadow: "0 0 3px 0 black",
      height: "23px",
      margin: "0 4px",
    },
  }));

  const classes = useStyle();
  const dispatch= useDispatch()

  useEffect(() => {
    setCartItems(props.userData.itemsList.length)
  })

  return (
    <div className={classes.mainLayout}>
      <Card className={classes.placeOrderLayout}>
        {props.userData.itemsList.length > 0 ? (
          <p className={classes.myCartTag}>
            MyCart ( {noOfItemsInCart} )
          </p>
        ) : (
          <p>Your Cart is Empty</p>
        )}
        {noOfItemsInCart > 0 ? (
          <div className={classes.bookContainer}>
            {props.listOfBooks
              .filter((item) => _.some(itemsToCart, item))
              .map((book) => {
                return (
                  <div className={classes.bookSection}>
                    <img
                      className={classes.imageOfBook}
                      src={book.image}
                      alt={book.title}
                    />
                    <div className={classes.bookDetailsSection}>
                      <div className={classes.bookTitle}>{book.title}</div>
                      <div className={classes.authorName}>{book.author}</div>
                      <div className={classes.bookPrice}>Rs. {book.price}</div>
                      <div className={classes.alterQuantity}>
                        <RemoveIcon  className={classes.reduceButton} 
                        onClick={(e) =>{const presentQuantity=e.currentTarget.nextElementSibling.innerText
                                if(parseInt(presentQuantity)>1){
                                    e.currentTarget.nextElementSibling.innerText=parseInt(presentQuantity)-1
                                }
                        }}
                        />
                        <div className={classes.quantityDisplay}>1</div>
                        <AddIcon className={classes.addButton} 
                                                onClick={(e) =>{const presentQuantity=e.currentTarget.previousElementSibling.innerText
                                                    if(parseInt(presentQuantity)<book.quantity){
                                                        e.currentTarget.previousElementSibling.innerText=parseInt(presentQuantity)+1
                                                    }
                                            }}
                        />
                        <Button className={classes.removeButton}
                        onClick={(e)=>{
                            let itemsList=props.userData.itemsList.filter(item=>item.id!==book.id)
                           

                            let userData=props.userData
                           
                            userData.itemsList=[...itemsList]
                           
                            const userRef = fireStore.doc(`users/${props.userData.id}`);
                            userRef.get().then(async (snapShot) => {
                              try {
                                await userRef.update({
                                  booksInCart:itemsList.length,
                                  itemsList: itemsList,
                                });
                                props.setUserData(userData)
                                setCartItems(itemsList.length)
                          dispatch(removeBookFromCart(book))
                            dispatch(updateCartQuantity(itemsList.length))
             
                              } catch (err) {}
                        }
                            )
                    }}
                        
                        >Remove</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            <Button className={classes.placeOrderButton}>PLACE ORDER</Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

export default Cart;
