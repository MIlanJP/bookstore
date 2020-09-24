import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
const fontForBookName="'Lato'"
const theme = createMuiTheme({
  palette: {

    secondary: {
      main: yellow[500],
    },
    themeColor:{
        
    }
  },
  typography: {
    bookName: {
      fontFamily: fontForBookName,
      fontWeight: 700,
    //   fontSize: 10,
      textTransform: "none",
    },
    authorName: {
        fontFamily: fontForBookName,
        // fontWeight: 700,
        fontSize: 13.5,
        textTransform: "none",
      },
      priceColumn:{
        fontFamily: fontForBookName,
        fontWeight: 700,
        // fontSize: 13.5,
        position: "relative",
        top:'-10px',
        textTransform: "none",  
      },
      buttonText:{
        fontFamily: fontForBookName,
        fontWeight: 300,
        fontSize: 13,
        textTransform: "none", 
      },    
        wishListButton:{
        fontFamily: fontForBookName,
        fontWeight: 700,
        fontSize: 13.5,
        textTransform: "none", 
      },
      Latofont:{
        fontFamily: fontForBookName,
        fontWeight: 700,
        fontSize:18,
      } ,     
      placeOrder:{
        fontFamily: fontForBookName,
        fontWeight: 200,
      },
      orderSucessMessage:{
        fontFamily: fontForBookName,
        fontWeight: 700,
        fontSize:20,
      },
      lastPage:{
        fontFamily: fontForBookName,
        fontSize:18,
      },

      companyDetailsHeading:{
        fontFamily: fontForBookName,
        fontSize:13,
        fontWeight:700,
      },
      companyDetailsContent:{
        fontFamily: fontForBookName,
        fontSize:13,
      },
},
});

export default theme;