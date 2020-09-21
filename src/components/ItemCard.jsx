import { Button, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import React from "react";



function ItemCard(props) {
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
          textOverflow:'ellipsis',
          textAlign: "left",
          overflow:"hidden",
          paddingRight: "20px",
        },
        authorName:{
          ...theme.typography.authorName,
            color:"#9D9D9D",
            paddingLeft: "25px",
            textAlign: "left",
            lineHeight:".8rem",
            position: "relative",
            top: "-14px",
            display:"flex",
      
        },
        priceColumn:{
          ...theme.typography.priceColumn,
            paddingLeft: "25px",
            textAlign: "left",
            top: "-21px",
            position: "relative",
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
            top:"-20px",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-evenly",
            
        },
        wishListButton:{
          ...theme.typography.wishListButton,
            boxShadow:" 0px 0px  3px 0px black",
            padding:"3px 10px 3px 10px",
            width:props.book.quantity>0?'':'90%',
      
          //   marginLeft:'10px'
      
        },
        outOfStock:{
            position:'absolute',
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow:"0px 0px 5px 0px black",
            height: "40px",
            width: "184px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
             marginTop: "70px",
            fontWeight: "600",
            marginLeft:"27px",
        },
      }));
  const classes = useStyle();
  return (
    <Card className={classes.mainLayout}>
      <div className={classes.bookImage}>
          {props.book.quantity>0?null:<div className={classes.outOfStock}  >OUT OF STOCK</div>}
        <img
          className={classes.imageOfBook}
          src={props.book.image}
          alt={props.book.title}
        />
      </div>

  <p className={classes.bookName} maxlength="20">{props.book.title}</p>
  <span className={classes.authorName}> by {props.book.author}</span>
  <p className={classes.priceColumn} >Rs {props.book.price}</p>
     <div className={classes.buttonsColumn}  >
         {props.book.quantity>0? <Button className={classes.addToCartButton} 
         onClick={()=>{console.log("jf")}}
         >ADD TO BAG</Button>:null}
        
         <Button className={classes.wishListButton}>WISHLIST</Button>
     </div>
    </Card>
  );
}

export default ItemCard;
