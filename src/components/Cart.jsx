import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import { fireStore } from "../utils/firebase.utils";
import {
  updateCartQuantity,
  removeBookFromCart,
  setBookQuantityInCart,
  setBookInCart,
} from "../redux";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const itemsToCart = useSelector((state) => state.cardquantity.itemsInCart);
  const noOfItemsInCart = useSelector((state) => state.cardquantity.items);
  const [totalAmount, setTotalAmount] = useState(0);
  const [
    displayCustomerDetailsColumn,
    setDisplayCustomerDetailsColumn,
  ] = useState(false);
  const [displayOrderSummaryColumn, setDisplayOrderSummaryColumn] = useState(
    false
  );
const [name,setName]=useState('')
const [phoneNumber,setPhoneNumber]=useState('')
const [address,setAddress]=useState('')
const [city,setCity]=useState('')
const [locality,setLocality]=useState('')
const [pincode,setPincode]=useState('')
const [deliverLocationType,setDeliverLocationType]=useState('')


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
    emptyCartLabel: {
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
      fontWeight: 700,
    },
    removeButton: {
      textTransform: "capitalize",
      borderRadius: "20%",
      position: "relative",
      top: "-5px",
    },
    customerDetails: {
      padding: "5% 5% 0% 5%",
    },
    customerDetails1: {
      width: "60vw",
      //   minWidth: "450px",
      height:
        noOfItemsInCart > 0 && displayCustomerDetailsColumn ? "auto" : "70px",
      paddingLeft: "34px",
      textAlign: "left",
      // paddingTop: "28px",
      marginBottom: "50px",
      paddingRight: "10px",
      marginLeft: "10%",
      transition: ".5s",
      boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.64)",
      ...theme.typography.Latofont,
      position: "relative",
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
    radioButton: {
      margin: "10px 0 10px 0",
    },
    orderSummarySection: {
      padding: "0 0 0 5%",
    },
    orderSummarySection1: {
      width: "60vw",
      //   minWidth: "450px",
      height:
        displayOrderSummaryColumn &&
        noOfItemsInCart > 0 &&
        displayCustomerDetailsColumn
          ? "auto"
          : "70px",
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
    orderSummaryLabel: {
      marginTop: "20px",
    },
    bookQuantity: {
      position: "relative",
      top: "17px",
      left: "22px",
    },
    bookQuantityNumber: {
      position: "relative",
      top: "-5px",
    },
    totalAmount: {
      ...theme.typography.Latofont,
      margin: "10px 0 30px 0",
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
            <p className={classes.emptyCartLabel}>Your Cart is Empty</p>
          )}
          {noOfItemsInCart > 0 ? (
            <div className={classes.bookContainer}>
              {itemsToCart.map((book) => {
                return (
                  <div
                    className={classes.bookSection}
                    onLoad={() => {
                      setTotalAmount(
                        parseInt(totalAmount) +
                          Number(book.price) * Number(book.quantity)
                      );
                    }}
                  >
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
                        <RemoveIcon
                          className={classes.reduceButton}
                          onClick={(e) => {
                            if (book.quantity > 1) {
                              setTotalAmount(
                                parseInt(totalAmount) - parseInt(book.price)
                              );
                              dispatch(
                                setBookQuantityInCart(
                                  book.id,
                                  parseInt(book.quantity) - 1
                                )
                              );
                            }
                          }}
                        />
                        <div className={classes.quantityDisplay}>
                          {book.quantity}
                        </div>
                        <AddIcon
                          className={classes.addButton}
                          onClick={(e) => {
                            if (book.quantity < 9) {
                              setTotalAmount(
                                parseInt(totalAmount) + parseInt(book.price)
                              );
                              dispatch(
                                setBookQuantityInCart(
                                  book.id,
                                  parseInt(book.quantity) + 1
                                )
                              );
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
                                let amount =
                                  Number(book.price) * Number(book.quantity);
                                console.log(amount);
                                setTotalAmount(totalAmount - amount);

                                dispatch(removeBookFromCart(book));
                                dispatch(updateCartQuantity(itemsList.length));
                                console.log(book.price, book.quantity);
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
                value={name}
                error={!(/^[A-Z]+[a-zA-Z]{4}[a-z1-9]*$/.test(name) || name==='' )}
                onChange={(e)=>{
                  setName(e.currentTarget.value)
                }}
              />
              <TextField
                className={classes.numberSection}
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                type="number"
                size="small"
                value={phoneNumber}
                error={!( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber) || phoneNumber==''  )}
                onChange={(e)=>{
                  setPhoneNumber(e.currentTarget.value)
                }}
              />
            </div>
            <div className={classes.customerDetailsSecondSection}>
              <TextField
                className={classes.pincodeSection}
                id="outlined-basic"
                label="Pincode"
                variant="outlined"
                size="small"
                error={!(pincode>99999 && pincode<1000000 || pincode=='')}
                type="number"
                value={pincode}
                onChange={(e)=>{
                  setPincode(e.currentTarget.value)
                }}
              />
              <TextField
                className={classes.localitySection}
                id="outlined-basic"
                label="Locality"
                variant="outlined"
                size="small"
                value={locality}
                error={!(locality.toString().trim().replace(" ", "").length>3 || locality==='')}
                onChange={(e)=>{
                  setLocality(e.currentTarget.value)
                }}
              />
            </div>
            <div className={classes.customerDetailsThirdSection}>
              <TextField
                className={classes.addressSection}
                id="outlined-basic"
                label="Address"
                variant="outlined"
                multiline={true}
                error={!(address.toString().trim().replace(" ", "").length>30 || address==='')}
                rows={3}
                fullWidth={true}
                value={address}
                onChange={(e)=>{
                  setAddress(e.currentTarget.value)
                }}
              />
            </div>
            <div className={classes.customerDetailsFourthSection}>
              <TextField
                className={classes.citySection}
                id="outlined-basic"
                label="City"
                error={!(city.toString().trim().replace(" ", "").length>3 || city==='')}
                variant="outlined"
                size="small"
                value={city}
                onChange={(e)=>{
                  setCity(e.currentTarget.value)
                }}
              />
              <TextField
                className={classes.landmarkSection}
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                size="small"
              />
            </div>
            <div className={classes.radioButton}>
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
                  onClick={(e)=>{
                    setDeliverLocationType("Home")
                  }}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Work"
                  control={<Radio color="primary" />}
                  label="Work   "
                  onClick={(e)=>{
                    setDeliverLocationType("Work")
                  }}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="primary" />}
                  label="Other"
                  onClick={(e)=>{
                    setDeliverLocationType("Work")
                  }}
                  labelPlacement="end"
                />
              </RadioGroup>
            </div>
            {noOfItemsInCart > 0 && displayCustomerDetailsColumn ? (
              <Button
                className={classes.continueButton}
                onClick={() => {
                  if(deliverLocationType!=='' && (/^[A-Z]+[a-zA-Z]{4}[a-z1-9]*$/.test(name))
                   && ( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber))
                    && (pincode>99999 && pincode<1000000) && 
                    (locality.toString().trim().replace(" ", "").length>3) &&
                    (address.toString().trim().replace(" ", "").length>30) && 
                    (city.toString().trim().replace(" ", "").length>3)
                    ){
                    setDisplayOrderSummaryColumn(!displayOrderSummaryColumn);
                  }
                }}
              >
                CONTINUE
              </Button>
            ) : null}
          </div>
        </Card>
      </div>
      <div className={classes.orderSummarySection}>
        <Card className={classes.orderSummarySection1}>
          <div className={classes.orderSummaryLabel}>Order Summary</div>
          <div className={classes.bookContainer}>
            {itemsToCart.map((book) => {
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
                    <div className={classes.bookQuantity}>
                      <ClearIcon />{" "}
                      <span className={classes.bookQuantityNumber}>
                        {book.quantity}
                      </span>
                    </div>
                    <div className={classes.bookPrice}>
                      Rs. {parseInt(book.quantity) * parseInt(book.price)}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className={classes.totalAmount}>Total Amount = { totalAmount}</div> */}
          </div>
          {displayOrderSummaryColumn &&
          noOfItemsInCart > 0 &&
          displayCustomerDetailsColumn ? (
            <Button
              className={classes.continueButton}
              onClick={() => {
                let userData = props.userData;

                userData.itemsList = [];

                const userRef = fireStore.doc(
                  `users/${props.userData.id}`
                );
                userRef.get().then(async (snapShot) => {
                  try {
                    await userRef.update({
                      booksInCart: 0,
                      itemsList: [],
                    });
                       props.setUserData(userData);           
                    setTotalAmount(0);

                    dispatch(setBookInCart([]));
                    dispatch(updateCartQuantity(0));
                history.push("/profile/ordersuccesspage");

                  } catch (err) {}
              }
            )}}
            >
              CHECKOUT
            </Button>
          ) : null}
        </Card>
      </div>
    </>
  );
}

export default Cart;
