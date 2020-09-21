import React,{useState,useEffect} from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LocalLibrarySharpIcon from '@material-ui/icons/LocalLibrarySharp';
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { auth } from "../utils/firebase.utils";
import { useHistory } from "react-router";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    background: "rgb(160,48,55)",
  },
  bookIcon: {
    marginRight: theme.spacing(2),
    position:'relative',
    left:"10%",
  },book:{
    fontSize:'1.5rem',

  },
  title: {
      fontFamily:" Roboto",
      fontWeight:500,
      position:'relative',
      left:"10%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
        width: "46%",
        background: "white",
        textAlign: "start",
        color: "black",
    },
    left:"10%",
    marginRight: theme.spacing(2),
    marginLeft: 0,
   
    width: "46%",
    background: "white",
    textAlign: "start",
    color: "black",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "46%",
      background: "white",
      textAlign: "start",
      color: "black",
     
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBarColor:{
      backgroundColor:'rgb(160,48,55)'
  }
}));

export default function Header(props) {
  const history = useHistory();
const [booksInCart,setBooksInCart]=useState(0)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
// console.log(props)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
useEffect(()=>{
    if(typeof props.userData!=="undefined")
    setBooksInCart(props.userData.booksInCart)
})
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
    className={classes.accountMenu}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          auth.signOut();
          history.push("/");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 3 new mails" color="inherit">
          <Badge badgeContent={booksInCart} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" classes={{colorPrimary:classes.appBarColor}}  >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.bookIcon}
            color="inherit"
            aria-label="open drawer"
          >
            <LocalLibrarySharpIcon className={classes.book}  />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Bookstore
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 Items in Carts" color="inherit">
              <Badge badgeContent={booksInCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
