import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import testingLibrary from "@testing-library/react";

import theme from "../theme/theme";

import { render, fireEvent, screen, cleanup } from "../utils/testUtils";
import Books from "../components/Books";

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

const totalBooks = [
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
  {
    id: "4",
    author: "Dan Brown",
    title: "Angels & Demons - Movie Tie-In",
    image:
      "http://books.google.com/books/content?id=GXznEnKwTdAC&printsec=frontcover&img=1&zoom=5",
    quantity: "15",
    price: "462",
    description:
      "The murder of a world-famous physicist raises fear that the Illuminati are operating again after centuries of silenceand religion professor Robert Langdon is called in to assist with the case. By the author of Digital Fortress. Reprint",
  },
  {
    id: "5",
    author: "Dan Brown",
    title: "Origin",
    image:
      "http://books.google.com/books/content?id=95wnDQAAQBAJ&printsec=frontcover&img=1&zoom=5",
    quantity: "16",
    price: "174",
    description:
      "Sunday Times #1 Bestseller New York Times #1 Bestseller The global bestseller - Origin is the latest Robert Langdon novel from the author of The Da Vinci Code. Fans will not be disappointed The Times Robert LangdonHarvard professor of symbology and religious iconologyarrives at the Guggenheim Museum Bilbao to attend the unveiling of an astonishing scientific breakthrough. The evening�s host is billionaire Edmond Kirscha futurist whose dazzling high-tech inventions and audacious predictions have made him a controversial figure around the world. But Langdon and several hundred guests are left reeling when the meticulously orchestrated evening is suddenly blown apart. There is a real danger that Kirsch�s precious discovery may be lost in the ensuing chaos. With his life under threatLangdon is forced into a desperate bid to escape Bilbaotaking with him the museum�s directorAmbra Vidal. Together they flee to Barcelona on a perilous quest to locate a cryptic password that will unlock Kirsch�s secret. To evade a devious enemy who is one step ahead of them at every turnLangdon and Vidal must navigate the labyrinthine passageways of extreme religion and hidden history. On a trail marked only by enigmatic symbols and elusive modern artLangdon and Vidal will come face-to-face with a breathtaking truth that has remained buried � until now. �Dan Brown is the master of the intellectual cliffhanger� Wall Street Journal �As engaging a hero as you could wish for� Mail on Sunday �For anyone who wants more brain-food than thrillers normally provide� Sunday Times'",
  },
  {
    id: "6",
    author: "Dan Brown",
    title: "Deception Point",
    image:
      "http://books.google.com/books/content?id=tYwq0H5HcrcC&printsec=frontcover&img=1&zoom=5",
    quantity: "12",
    price: "128",
    description:
      "*INCLUDES A SNEAK PREVIEW OF ORIGINTHE NEW THRILLER BY DAN BROWN: OUT 3RD OCTOBER. PRE-ORDER TODAY* --------------------------------------------------------------------------------------------------- When a new NASA satellite detects evidence of an astonishingly rare object buried deep in the Arctic icethe floundering space agency proclaims a much-needed victory...a victory that has profound implications for U.S. space policy and the impending presidential election. With the Oval Office in the balancethe President dispatches White House Intelligence analyst Rachel Sexton to the Arctic to verify the authenticity of the find. Accompanied by a team of expertsincluding the charismatic academic Michael TollandRachel uncovers the unthinkable - evidence of scientific trickery - a bold deception that threatens to plunge the world into controversy..",
  },
  {
    id: "7",
    author: "Dan Brown",
    title: "Digital Fortress",
    image:
      "http://books.google.com/books/content?id=pfB9VsrdX4IC&printsec=frontcover&img=1&zoom=5",
    quantity: "14",
    price: "573",
    description:
      "*INCLUDES A SNEAK PREVIEW OF ORIGINTHE NEW THRILLER BY DAN BROWN: OUT 3RD OCTOBER. PRE-ORDER TODAY* --------------------------------------------------------------------------------------------------- When the National Security Agencys invincible code-breaking machine encounters a mysterious code it cannot breakthe agency calls in its head cryptographerSusan Fletchera brilliantbeautiful mathematician. What she uncovers sends shock waves through the corridors of power. The NSA is being held hostage - not by guns or bombsbut by a code so complex that if released would cripple U.S. intelligence. Caught in an accelerating tempest of secrecy and liesFletcher battles to save the agency she believes in. Betrayed on all sidesshe finds herself fighting not only for her country but for her lifeand in the endfor the life of the man she loves..",
  },
  {
    id: "8",
    author: "Dan Brown",
    title: "Inferno",
    image:
      "http://books.google.com/books/content?id=9nloexmq6QsC&printsec=frontcover&img=1&zoom=5",
    quantity: "12",
    price: "951",
    description:
      "#1 WORLDWIDE BESTSELLER Harvard professor of symbology Robert Langdon awakens in an Italian hospitaldisoriented and with no recollection of the past thirty-six hoursincluding the origin of the macabre object hidden in his belongings. With a relentless female assassin trailing them through Florencehe and his resourceful doctorSienna Brooksare forced to flee. Embarking on a harrowing journeythey must unravel a series of codeswhich are the work of a brilliant scientist whose obsession with the end of the world is matched only by his passion for one of the most influential masterpieces ever writtenDante Alighieris The Inferno. Dan Brown has raised the bar yet againcombining classical Italian arthistoryand literature with cutting-edge science in this captivating thriller",
  },
  {
    id: "9",
    author: "Dan Brown",
    title: "The Da Vinci Code",
    image:
      "http://books.google.com/books/content?id=ivzfRJGrdFsC&printsec=frontcover&img=1&zoom=5",
    quantity: "13",
    price: "348",
    description:
      "*INCLUDES AN EXTRACT FROM ORIGINTHE NEW THRILLER BY DAN BROWN: OUT NOW* --------------------------------------------------------------------------------------------------- Harvard professor Robert Langdon receives an urgent late-night phone call while on business in Paris: the elderly curator of the Louvre has been brutally murdered inside the museum. Alongside the bodypolice have found a series of baffling codes. As Langdon and a gifted French cryptologistSophie Neveubegin to sort through the bizarre riddlesthey are stunned to find a trail that leads to the works of Leonardo Da Vinci - and suggests the answer to a mystery that stretches deep into the vault of history. Unless Langdon and Neveu can decipher the labyrinthine code and quickly assemble the pieces of the puzzlea stunning historical truth will be lost forever..",
  },
  {
    id: "10",
    author: "Dan Brown",
    title: "Robert Langdon Omnibus",
    image:
      "http://books.google.com/books/content?id=IqPW7mqq6GIC&printsec=frontcover&img=1&zoom=5",
    quantity: "14",
    price: "451",
    description: "Thriller. Two books in one",
  },
  {
    id: "11",
    author: "Dan Brown",
    title: "Angels And Demons",
    image:
      "http://books.google.com/books/content?id=d5xgYw4Ts0gC&printsec=frontcover&img=1&zoom=5",
    quantity: "15",
    price: "612",
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
  it("Renders the connected app with initialState", () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  it("Renders the connected app with initialState negative testing", () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(screen.getByText("Booksss")).not.toBeInTheDocument();
  });

  it("matches SnapShot", () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Check text content of sort by relavence", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(getByTestId("sortByRelevance")).toHaveTextContent(
      "Sort By RelavancePrice : Low to HighPrice : High to Low"
    );
  });

  
  it("Check text content of sort by relavence negative testing", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(getByTestId("sortByRelevance")).not.toHaveTextContent("Sort By RelavancePrice");
  });


  it("Check No of books displayed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} listOfBooks={totalBooks} searchContent={''}  />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(getByTestId("itemsNumber")).toHaveTextContent(
      "(11 Items)"
    );
  });

  it("Check No of books displayed negative testing", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} listOfBooks={totalBooks} searchContent={''}  />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(getByTestId("itemsNumber")).not.toHaveTextContent(
      "(11 Items)"
    );
  });


  it("Check if 8 books are rendered due to pagination ", () => {
    const { queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} listOfBooks={totalBooks} searchContent={''}  />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(queryAllByTestId("numberOfBooksRendered")).toHaveLength(8)
  });

  it("Send 7 books and Check if 7 books are rendered  ", () => {
    const { queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} listOfBooks={totalBooks.slice(0,7)} searchContent={''}  />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(queryAllByTestId("numberOfBooksRendered")).toHaveLength(7)
  });

  
  it("Send 7 books and Check if 7 books are rendered negative testing ", () => {
    const { queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Books userData={userData} listOfBooks={totalBooks.slice(0,7)} searchContent={''}  />
        </BrowserRouter>
      </ThemeProvider>,
      { initialState: { user: "Redux User", userData, cardquantity: 0 } }
    );
    expect(queryAllByTestId("numberOfBooksRendered")).not.toHaveLength(12)
  });


});
