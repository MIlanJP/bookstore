import { Button, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import React from "react";

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
    textAlign: "left",
  },
  authorName:{
    ...theme.typography.authorName,
      color:"#9D9D9D",
    //   paddingLeft: "25px",
      textAlign: "left",
      lineHeight:".8rem",
  },
  priceColumn:{
    ...theme.typography.priceColumn,
      paddingLeft: "25px",
      textAlign: "left",
  },
  addToCartButton:{
    ...theme.typography.buttonText,
      background:"rgb(160,48,55)",
      color:"white",
    //   marginRight:"10px",
      padding:"4px 10px 5px 10px",
      "&:hover":{
        ...theme.typography.buttonText,
        background:"rgb(160,48,55)",
        color:"white", 
      }
  },
  buttonsColumn:{
      position:'relative',
      top:"-10px",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-evenly",
      
  },
  wishListButton:{
    ...theme.typography.wishListButton,
      boxShadow:" 0px 0px  3px 0px black",
      padding:"3px 10px 3px 10px",

    //   marginLeft:'10px'

  },
}));

function ItemCard(props) {
  const classes = useStyle();
  return (
    <Card className={classes.mainLayout}>
      <div className={classes.bookImage}>
        <img
          className={classes.imageOfBook}
          src={props.book.image}
          alt={props.book.title}
        />
      </div>

  <p className={classes.bookName}>{props.book.title} <br/> <span className={classes.authorName}> by {props.book.author}</span></p>
  <p className={classes.priceColumn} >Rs {props.book.price}</p>
     <div className={classes.buttonsColumn}  >
         <Button className={classes.addToCartButton} 
         onClick={()=>{console.log("jf")}}
         >ADD TO BAG</Button>
         <Button className={classes.wishListButton}>WISHLIST</Button>
     </div>
    </Card>
  );
}

export default ItemCard;
