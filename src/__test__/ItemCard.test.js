import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import testingLibrary from "@testing-library/react";

import theme from "../theme/theme";

import { render, fireEvent, screen, cleanup } from "../utils/testUtils";
import ItemCard from "../components/ItemCard";

const book=  {
    id: "11",
    author: "Dan Brown",
    title: "Angels And Demons",
    image:
      "http://books.google.com/books/content?id=d5xgYw4Ts0gC&printsec=frontcover&img=1&zoom=5",
    quantity: "15",
    price: "612",
    description:
      "*INCLUDES A SNEAK PREVIEW OF ORIGINTHE NEW THRILLER BY DAN BROWN: OUT 3RD OCTOBER. PRE-ORDER TODAY* --------------------------------------------------------------------------------------------------- CERN InstituteSwitzerland: a world-renowned scientist is found brutally murdered with a mysterious symbol seared onto his chest. The VaticanRome: the College of Cardinals assembles to elect a new pope. Somewhere beneath theman unstoppable bomb of terrifying power relentlessly counts down to oblivion. In a breathtaking race against timeHarvard professor Robert Langdon must decipher a labyrinthine trail of ancient symbols if he is to defeat those responsible - the Illuminatia secret brotherhood presumed extinct for nearly four hundred yearsreborn to continue their deadly vendetta against their most hated enemythe Catholic Church",
  }

  const outOfStockBook=  {
    id: "11",
    author: "Dan Brown",
    title: "Angels And Demons",
    image:
      "http://books.google.com/books/content?id=d5xgYw4Ts0gC&printsec=frontcover&img=1&zoom=5",
    quantity: "0",
    price: "612",
    description:
      "*INCLUDES A SNEAK PREVIEW OF ORIGINTHE NEW THRILLER BY DAN BROWN: OUT 3RD OCTOBER. PRE-ORDER TODAY* --------------------------------------------------------------------------------------------------- CERN InstituteSwitzerland: a world-renowned scientist is found brutally murdered with a mysterious symbol seared onto his chest. The VaticanRome: the College of Cardinals assembles to elect a new pope. Somewhere beneath theman unstoppable bomb of terrifying power relentlessly counts down to oblivion. In a breathtaking race against timeHarvard professor Robert Langdon must decipher a labyrinthine trail of ancient symbols if he is to defeat those responsible - the Illuminatia secret brotherhood presumed extinct for nearly four hundred yearsreborn to continue their deadly vendetta against their most hated enemythe Catholic Church",
  }

const bookList = [
  {
    id: "1",
    author: "Chetan Bhagat",
    title: "The Girl in Room 105",
    image:
      "http://books.google.com/books/content?id=GHt_uwEACAAJ&printsec=frontcover&img=1&zoom=5",
    quantity: "12",
    price: "193",
    description:
      "Hi I'm Keshavand my life is screwed. I hate my job and my girlfriend left me. Ahthe beautiful Zara. Zara is from Kashmir. She is a Muslim. And did I tell you my family is a bitwelltraditional? Anywayleave that. Zara and I broke up four years ago. She moved on in life. I didn''t. I drank every night to forget her. I calledmessagedand stalked her on social media. She just ignored me. Howeverthat nighton the eve of her birthdayZara messaged me. She called me overlike old timesto her hostel room 105. I shouldn''t have gonebut I did... and my life changed forever. This is not a love story. It is an unlove story.From the author of Five Point Someone and 2 Statescomes a fast-pacedfunny and unputdownable thriller about obsessive love and finding purpose in life against the backdrop of contemporary India",
  },
  {
    id: "2",
    author: "Rujuta Divekar",
    title: "Indian Superfoods",
    image:
      "http://books.google.com/books/content?id=4oFoDwAAQBAJ&printsec=frontcover&img=1&zoom=5",
    quantity: "13",
    price: "495",
    description:
      "Forget about acacia seeds and goji berries. The secret foods for healthvitality and weight loss lie in our own kitchens and backyards. Top nutritionist Rujuta Diwekar talks you through the ten Indian superfoods that will completely transform you'",
  },
  {
    id: "3",
    author: "Dan Brown",
    title: "Angels And Demons",
    image:
      "http://books.google.com/books/content?id=d5xgYw4Ts0gC&printsec=frontcover&img=1&zoom=5",
    quantity: "14",
    price: "218",
    description:
      "*INCLUDES A SNEAK PREVIEW OF ORIGINTHE NEW THRILLER BY DAN BROWN: OUT 3RD OCTOBER. PRE-ORDER TODAY* --------------------------------------------------------------------------------------------------- CERN InstituteSwitzerland: a world-renowned scientist is found brutally murdered with a mysterious symbol seared onto his chest. The VaticanRome: the College of Cardinals assembles to elect a new pope. Somewhere beneath theman unstoppable bomb of terrifying power relentlessly counts down to oblivion. In a breathtaking race against timeHarvard professor Robert Langdon must decipher a labyrinthine trail of ancient symbols if he is to defeat those responsible - the Illuminatia secret brotherhood presumed extinct for nearly four hundred yearsreborn to continue their deadly vendetta against their most hated enemythe Catholic Church",
  },
];

const userData = {
  name: "",
  email: "",
  booksInCart: 0,
  itemsList: [...bookList],
};

describe("Test Books Container", () => {
  afterEach(cleanup);
  it("Renders the connected app with initialState without error", () => {
    const {getByTestId}=render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ItemCard userData={userData} book={bookList[0]} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
      
    );
    expect(getByTestId("authorName" )).toHaveTextContent("Chetan Bhagat")
    expect(getByTestId("priceColumn" )).toHaveTextContent("Rs 193")
    expect(getByTestId("bookTitle" )).toHaveTextContent("The Girl in Room 105")
    
    expect(screen.getByText("ADDED TO CART")).toBeInTheDocument();
  });


  it("Renders the connected app if book present in cart", () => {
   const {asFragment}= render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ItemCard userData={userData} book={bookList[0]} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(asFragment()).toMatchSnapshot()
  });

  
  it("Renders the connected app with if book not present in cart", () => {
    const {asFragment}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={book} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(asFragment()).toMatchSnapshot()
   });

   it("Renders Add To cart button if book is not present in cart", () => {
    const {getByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={book} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(getByTestId("add-to-bag-button" )).toHaveTextContent("ADD TO BAG")
   });

   
   it("Should not render the Add to cart button when book is in cart", () => {
    const {queryAllByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={bookList[0]} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(queryAllByTestId("add-to-bag-button" )).toHaveLength(0)
   });


   it("Renders Add To cart button if book is not present in cart", () => {
    const {getByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={book} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(getByTestId("wishlistButton" )).toHaveTextContent("WISHLIST")
   });

   it("Should not render the wishlist button when book is in cart", () => {
    const {queryAllByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={bookList[0]} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(queryAllByTestId("wishlistButton" )).toHaveLength(0)
   });


  it("Renders Added to Cart button if book is present in the cart", () => {
    const {getByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={bookList[0]} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(getByTestId("added-to-cart-button" )).toHaveTextContent("ADDED TO CART")
    });

      it("Does not render the ADDED TO CART button when book not in cart", () => {
    const {queryAllByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={book} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(queryAllByTestId("added-to-cart-button" )).toHaveLength(0)
   });



   it("Renders out of stock tag when quantity of book is zero", () => {
    const {getByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={outOfStockBook} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(getByTestId("out-of-stock-tag" )).toHaveTextContent("OUT OF STOCK")
   });

   it("Does not render out of stock when book is in stock", () => {
    const {queryAllByTestId}= render(
       <ThemeProvider theme={theme}>
         <BrowserRouter>
           <ItemCard userData={userData} book={book} />
         </BrowserRouter>
       </ThemeProvider>,
       { initialState: { user: "Redux User", userData, cardquantity: 0 } }
     );
     expect(queryAllByTestId("out-of-stock-tag" )).toHaveLength(0)
   });



});
