import React, { useState, useEffect } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress, NativeSelect } from "@material-ui/core";
import { fireStore } from "../utils/firebase.utils";
import { makeStyles } from "@material-ui/styles";
import ItemCard from "./ItemCard";
import Pagination from "@material-ui/lab/Pagination";
import styles from "../scss/profile.module.scss";
const useStyle = makeStyles((theme) => ({
  pagination: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
    marginTop: "50px",

    // color:" rgb(143,43,47)",
    // "&.paginationColor":{
    //     "&.selectedColor":{
    //         color:"green",
    //     }
    // }
  },
  paginationRoot: {
    "&.MuiPaginationItem-textPrimary.Mui-selected": {
      color: "white",
      background: "green",
    },
  },
  selectEmpty: {
    position: "relative",
    top: "40px",
    marginLeft: "auto",
    display: "flex",
    width: "168px",
    marginRight: "15%",
  },
  rootOfNativeSelect: {
    border: "ridge",
    padding: "5px 10px",
  },
  booksLength: {
    ...theme.typography.bookLength,
    position: "relative",
    top: "68px",
    marginRight: "auto",
    display: "flex",
    marginLeft: "18%",
  },
  booksNumber: {
    ...theme.typography.authorName,
    marginLeft: "10px",
    color: "#9D9D9D",
    position: "relative",
    top: "8px",
  },
}));

function Books(props) {
  const classes = useStyle();
  const [listOfBooks, setListOfBooks] = useState([]);
  const [books, resetBooks] = useState([]);
  const [booksLength, setBooksLength] = useState(0);
  const [page, setPage] = useState(1);
  const [maxpage, setMaxPage] = useState();
  const [sortByRelevance, setSortByRelevance] = useState("Sort by relevance");
  const [lastPageSize, setLastPageSize] = useState();
  const [cardsLimit, setCardsLimit] = useState(8);
  const decrementInnerHtml =
    '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>';
  const incrementInnerHtml =
    '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>';
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(8);

  const addBooksToCart = (id) => {
    let list = props.userData.itemsList;
    let restoreUserData = props.userData;
    let cartItems = parseInt(props.userData.booksInCart) + 1;
    list.push(id);
    restoreUserData.itemsList = [...list];

    const userRef = fireStore.doc(`users/${props.userData.id}`);
    userRef.get().then(async (snapShot) => {
      try {
        await userRef.update({
          booksInCart: cartItems.toString(),
          itemsList: list,
        });
        props.setUserData(restoreUserData);
      } catch (err) {}
    });
  };

  const getListOfBooks = () => {
    if (typeof props.listOfBooks === "undefined") return;
    setListOfBooks(props.listOfBooks);
    resetBooks(props.listOfBooks);
    setBooksLength(props.listOfBooks.length);
    const checkLength = Math.floor(props.listOfBooks.length / cardsLimit);
    const remind = props.listOfBooks.length % cardsLimit;
    if (remind !== 0) {
      setLastPageSize(remind);
      setMaxPage(checkLength + 1);
    } else {
      setLastPageSize(cardsLimit);
      setMaxPage(checkLength);
    }
  };

  useEffect(() => {
    return getListOfBooks();
  }, [props]);

  useEffect(() => {
    const items = listOfBooks.filter(
      (data) =>
        data.author.toLowerCase().includes(props.searchContent.toLowerCase()) ||
        data.title.toLowerCase().includes(props.searchContent.toLowerCase())
    ).length;
    const checkLength = Math.floor(items / cardsLimit);
    const rem = items % cardsLimit;
    if (rem !== 0) {
      setLastPageSize(rem);
      setMaxPage(checkLength + 1);
    } else {
      setLastPageSize(cardsLimit);
      setMaxPage(checkLength);
    }
  });

  const handleChangeForPagination = (number) => {
    setPage(number);
    setFrom(cardsLimit * (number - 1));

    if (number === maxpage) {
      setTo(cardsLimit * (number - 1) + lastPageSize);
    } else {
      setTo(cardsLimit * (number - 1) + cardsLimit);
    }
  };
  return (
    <>
      <div className={classes.booksLength}>
        Books{" "}
        <span className={classes.booksNumber} data-testid="itemsNumber">
          (
          {
            listOfBooks.filter(
              (data) =>
                data.author
                  .toLowerCase()
                  .includes(props.searchContent.toLowerCase()) ||
                data.title
                  .toLowerCase()
                  .includes(props.searchContent.toLowerCase())
            ).length
          }{" "}
          Items)
        </span>
      </div>
      <NativeSelect
        data-testid="sortByRelevance"
        className={classes.selectEmpty}
        value={sortByRelevance}
        name=" Sort By Relavance"
        onChange={(e) => {
          if (e.currentTarget.value == 1) {
            let list = listOfBooks;
            list = _.sortBy(list, [
              function (book) {
                return parseInt(book.price);
              },
            ]);
            setListOfBooks(
              _.sortBy(listOfBooks, [
                function (book) {
                  return parseInt(book.price);
                },
              ])
            );
          } else if (e.currentTarget.value == 2) {
            setListOfBooks(
              _.reverse(
                _.sortBy(listOfBooks, [
                  function (book) {
                    return parseInt(book.price);
                  },
                ])
              )
            );
          } else {
            setListOfBooks(books);
          }
          setSortByRelevance();
        }}
        variant="standard"
        classes={{ root: classes.rootOfNativeSelect }}
      >
        <option value="">Sort By Relavance</option>
        <option value={1}>Price : Low to High</option>
        <option value={2}>Price : High to Low</option>
      </NativeSelect>
      <div className={styles.booksContainer}>
        {listOfBooks.length === 0 ? (
          <CircularProgress
            color="secondary"
            className={styles.circularProgress}
          />
        ) : null}{" "}
        {listOfBooks
          .filter(
            (data) =>
              data.author
                .toLowerCase()
                .includes(props.searchContent.toLowerCase()) ||
              data.title
                .toLowerCase()
                .includes(props.searchContent.toLowerCase())
          )
          .slice(from, to)
          .map((book) => {
            return (
              <div className={styles.bookColumn} key={uuidv4()} data-testid='numberOfBooksRendered'  >
                {" "}
                <ItemCard
                  book={book}
                  showAddedButton={props.userData.itemsList.includes(book.id)}
                  userData={props.userData}
                  setUserData={props.setUserData}
                  listOfBooks={props.listOfBooks}
                  setListOfBooks={props.setListOfBooks}
                  list={
                    typeof props.userData.itemsList !== "undefined" &&
                    typeof props.userData !== "undefined"
                      ? props.userData
                      : null
                  }
                  addBooksToCart={addBooksToCart}
                />
              </div>
            );
          })}
      </div>
      {listOfBooks.length > 0 ? (
        <Pagination
          color="primary"
          className={classes.pagination}
          classes={{
            page: classes.paginationColor,
            selected: classes.selectedColor,
            root: classes.paginationRoot,
          }}
          onChange={(e) => {
            if (
              e.currentTarget.firstElementChild.innerHTML !==
                decrementInnerHtml &&
              e.currentTarget.firstElementChild.innerHTML !== incrementInnerHtml
            ) {
              handleChangeForPagination(e.currentTarget.innerHTML[0]);
            } else if (
              e.currentTarget.firstElementChild.innerHTML === decrementInnerHtml
            ) {
              handleChangeForPagination(page - 1);
            } else {
              handleChangeForPagination(parseInt(page) + 1);
            }
          }}
          count={maxpage}
          shape="rounded"
        />
      ) : null}
    </>
  );
}

export default Books;
