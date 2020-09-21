import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase.utils";
import { CircularProgress } from "@material-ui/core";
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
    // color:" rgb(143,43,47)",
    // "&.paginationColor":{
    //     "&.selectedColor":{
    //         color:"green",
    //     }
    // }
  },
}));
function Books(props) {
  const classes = useStyle();

  const [listOfBooks, setListOfBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [maxpage, setMaxPage] = useState();

  const [lastPageSize, setLastPageSize] = useState();
  const [cardsLimit, setCardsLimit] = useState(8);
  const decrementInnerHtml =
    '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>';
  const incrementInnerHtml =
    '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>';
  const [from, setFrom] = useState(0);
  const [reminder, setReminder] = useState();
  const [to, setTo] = useState(8);
  useEffect(() => {
    const ref = firebase.database().ref();

    ref.on(
      "value",
      function (snapshot) {
        setListOfBooks(snapshot.val().list);
        console.log(snapshot.val().list[1]);
        const checkLength = Math.floor(snapshot.val().list.length / cardsLimit);
        const remind = snapshot.val().list.length % cardsLimit;
        //    console.log(listOfBooks[1])
        if (remind !== 0) {
          setLastPageSize(remind);
          setMaxPage(checkLength + 1);
        } else {
          setLastPageSize(cardsLimit);
          setMaxPage(checkLength);
        }
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );
  }, []);

  useEffect(()=>{
            const items= listOfBooks.filter(data=>data.author.toLowerCase().includes(props.searchContent.toLowerCase())|| data.title.toLowerCase().includes(props.searchContent.toLowerCase())).length
            const checkLength = Math.floor(items / cardsLimit);
            const rem = items% cardsLimit;
            //    console.log(listOfBooks[1])
            if (rem !== 0) {
              setLastPageSize(rem);
              setMaxPage(checkLength + 1);
            } else {
              setLastPageSize(cardsLimit);
              setMaxPage(checkLength);
            }

  })

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
          .map((book, index) => {

            return (
              <div className={styles.bookColumn}>
                {" "}
                <ItemCard book={book} />
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
          }}
          onChange={(e) => {
            if (
              e.currentTarget.firstElementChild.innerHTML !==
                decrementInnerHtml &&
              e.currentTarget.firstElementChild.innerHTML !== incrementInnerHtml
            ) {
              handleChangeForPagination(e.currentTarget.innerHTML[0]);
              console.log(e.currentTarget.firstElementChild.innerHTML);
            } else if (
              e.currentTarget.firstElementChild.innerHTML === decrementInnerHtml
            ) {
              handleChangeForPagination(page - 1);
            } else {
              console.log(page + 1);
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
