import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import { fireStore } from "../utils/firebase.utils";
import { updateCartQuantity, removeBookFromCart ,setBookQuantityInCart} from "../redux";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import _ from "lodash";
function Cart(props) {
  const itemsToCart = useSelector((state) => state.cardquantity.itemsInCart);
  const noOfItemsInCart = useSelector((state) => state.cardquantity.items);
  const [
    displayCustomerDetailsColumn,
    setDisplayCustomerDetailsColumn,
  ] = useState(false);
  const useStyle = makeStyles((theme) => ({
    mainLayout: {
      position: "relative",
      top: "65px",
      padding: "5% 5% 0 5%",
    },
    placeOrderLayout: {
      width: "60vw",
    //   minWidth: "450px",
      minHeight: "100px",
      paddingLeft: "34px",
      marginBottom: "50px",
      paddingRight: "10px",
      marginLeft: "10%",
    },
    emptyCartLabel:{
      ...theme.typography.Latofont,

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
      cursor: "pointer",
    },
    addButton: {
      borderRadius: "50%",
      boxShadow: "0 0 3px 0 black",
      margin: "0px 10px 0 10px",
      fontSize: "16px",
      marginTop: "3px",
      cursor: "pointer",
    },
    quantityDisplay: {
      minWidth: "20px",
      boxShadow: "0 0 3px 0 black",
      height: "23px",
      margin: "0 4px",
      fontWeight:700
    },
    removeButton: {
      textTransform: "capitalize",
      borderRadius: "20%",
      position: "relative",
      top: "-5px",
    },
    customerDetails: {
      padding: "5%",
    },
    customerDetails1: {
      width: "60vw",
    //   minWidth: "450px",
      height:noOfItemsInCart>0 &&  displayCustomerDetailsColumn ? "auto" : "70px",
      paddingLeft: "34px",
      textAlign: "left",
      // paddingTop: "28px",
      marginBottom: "50px",
      paddingRight: "10px",
      marginLeft: "9%",
      transition: ".5s",
      boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.64)",
      ...theme.typography.Latofont,
      position: "absolute",
      // marginLeft: "10px",
    },
    customerDetailsLabel: {
        ...theme.typography.Latofont,
      marginTop: "26px",
    },
    customerDetailsInputSection: {
      paddingBottom: "50px",
      marginTop: "50px",
      display: "flex",
      flexDirection: "column",
    },
    continueButton: {
        ...theme.typography.placeOrder,
      position: "absolute",
      background: "rgb(51,113,181)",
      "&:hover": {
        background: "rgb(51,113,181)",
      },
      width: "171px",
      marginLeft: "auto",
      color: "white",
      bottom: "20px",
      right: "56px",
    },
    customerDetailsFirstSection: {
      margin: "0 0 10px 0 ",
      display: "flex",
      flexDirection: "row",
    },
    customerDetailsSecondSection: {
      display: "flex",
      flexDirection: "row",
    },
    customerDetailsThirdSection: {
      display: "flex",
      flexDirection: "row",
    },
    customerDetailsFourthSection: {
      display: "flex",
      flexDirection: "row",
    },
    nameSection: {
      marginRight: "5px",
    },
    numberSection: {
      marginLeft: "5px",
    },
    pincodeSection: {
      marginRight: "5px",
    },
    localitySection: {
      marginLeft: "5px",
    },
    addressSection: {
      maxWidth: "431px",
      margin: "10px 0 10px 0",
    },
    citySection: {
      marginRight: "5px",
    },
    landmarkSection: {
      marginLeft: "5px",
    },
    radioButton:{
        margin:"10px 0 10px 0",
    },
  }));

  const classes = useStyle();
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.mainLayout}>
        <Card className={classes.placeOrderLayout}>
          {props.userData.itemsList.length > 0 ? (
            <p className={classes.myCartTag}>MyCart ( {noOfItemsInCart} )</p>
          ) : (
            <p className={classes.emptyCartLabel}  >Your Cart is Empty</p>
          )}
          {noOfItemsInCart > 0 ? (
            <div className={classes.bookContainer}>
              {itemsToCart
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
                        <div className={classes.bookPrice}>
                          Rs. {book.price}
                        </div>
                        <div className={classes.alterQuantity}>
                          <RemoveIcon
                            className={classes.reduceButton}
                            onClick={(e) => {
                                if(book.quantity>1){
                                    dispatch(setBookQuantityInCart(book.id,parseInt(book.quantity)-1))
                                }
               
                            }}
                          />
                          <div className={classes.quantityDisplay}>{book.quantity}</div>
                          <AddIcon
                            className={classes.addButton}
                            onClick={(e) => {
                      
                                if(book.quantity<9){
                                  dispatch(setBookQuantityInCart(book.id,parseInt(book.quantity)+1))
                                }

                            }}
                          />
                          <Button
                            className={classes.removeButton}
                            onClick={(e) => {
                              let itemsList = itemsToCart.filter(
                                (item) => item.id !== book.id
                              );

                              let userData = props.userData;

                              userData.itemsList = [...itemsList];

                              const userRef = fireStore.doc(
                                `users/${props.userData.id}`
                              );
                              userRef.get().then(async (snapShot) => {
                                try {
                                  await userRef.update({
                                    booksInCart: itemsList.length,
                                    itemsList: itemsList,
                                  });
                                  props.setUserData(userData);
                                  dispatch(removeBookFromCart(book));
                                  dispatch(
                                    updateCartQuantity(itemsList.length)
                                  );
                                } catch (err) {}
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <Button
                className={classes.placeOrderButton}
                onClick={() => {
                  setDisplayCustomerDetailsColumn(
                    !displayCustomerDetailsColumn
                  );
                }}
              >
                PLACE ORDER
              </Button>
            </div>
          ) : null}
        </Card>
      </div>
      <div className={classes.customerDetails}>
        <Card className={classes.customerDetails1}>
          <div className={classes.customerDetailsLabel}>Customer Details</div>
          <div className={classes.customerDetailsInputSection}>
            <div className={classes.customerDetailsFirstSection}>
              <TextField
                className={classes.nameSection}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
              />
              <TextField
                className={classes.numberSection}
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                type="number"
                size="small"
              />
            </div>
            <div className={classes.customerDetailsSecondSection}>
              <TextField
                className={classes.pincodeSection}
                id="outlined-basic"
                label="Pincode"
                variant="outlined"
                size="small"
              />
              <TextField
                className={classes.localitySection}
                id="outlined-basic"
                label="Locality"
                variant="outlined"
                size="small"
              />
            </div>
            <div className={classes.customerDetailsThirdSection}>
              <TextField
                className={classes.addressSection}
                id="outlined-basic"
                label="Address"
                variant="outlined"
                multiline={true}
                rows={3}
                fullWidth={true}
              />
            </div>
            <div className={classes.customerDetailsFourthSection}>
              <TextField
                className={classes.citySection}
                id="outlined-basic"
                label="City"
                variant="outlined"
                size="small"
              />
              <TextField
                className={classes.landmarkSection}
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                size="small"
              />
            </div>
            <div className={classes.radioButton}  >
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio color="primary" />}
                  label="Home"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Work"
                  control={<Radio color="primary" />}
                  label="Work   "
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="primary" />}
                  label="Other"
                  labelPlacement="end"
                />
              </RadioGroup>
            </div>
          {noOfItemsInCart>0 && displayCustomerDetailsColumn?  <Button
              className={classes.continueButton}
              onClick={() => {
                setDisplayCustomerDetailsColumn(!displayCustomerDetailsColumn);
              }}
            >
              CONTINUE
            </Button>:null}
          </div>
        </Card>
      </div>
      <div>
          <Card>
              Order Summary
          </Card>
      </div>
    </>
  );
}

export default Cart;
