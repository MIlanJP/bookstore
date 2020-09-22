import React from 'react'
import {makeStyles} from "@material-ui/styles"
import  {Card} from '@material-ui/core'
function Cart() {
    const useStyle = makeStyles((theme) => ({
        mainLayout:{
            position: 'relative',
            top:"65px"
        }
    }))

    const classes= useStyle();

    return (
        <Card className={classes.mainLayout}  >
           From Cart
        </Card>
    )
}

export default Cart
