import { Card,CardMedia } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";

import React from 'react'

const useStyle = makeStyles((theme) => ({
    mainLayout:{
        // background:'black',
        border:'black',
        height:"315px",
        width:"235px",

    },
    bookImage:{
        height:"171px",
        width:"233px",
        paddingBottom:"2px",
        background: "rgb(245,245,245)",
    },
    imageOfBook:{
        marginTop:'7%',
        height:'80%',
    }
}))



function ItemCard(props) {
    const classes = useStyle();
    return (
        <Card className={classes.mainLayout}  >
            <div className={classes.bookImage}   >
                <img 
                    className={classes.imageOfBook}
                src= "http://books.google.com/books/content?id=GHt_uwEACAAJ&printsec=frontcover&img=1&zoom=5"    
                alt="books" />
            {/* <CardMedia
            className={classes.imageOfBook}
            image="http://books.google.com/books/content?id=GHt_uwEACAAJ&printsec=frontcover&img=1&zoom=5"
            /> */}
            </div>

            <p>Books1</p>
        </Card>
    )
}

export default ItemCard
