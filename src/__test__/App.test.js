import React from 'react'
import {BrowserRouter} from 'react-router-dom'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../utils/testUtils'
import Profile from '../components/profile'

const userData={
  name: '',
  email: '',
  booksInCart: 0,
  itemsList: [],
}

describe("render profile page",()=>{
  it('Renders the connected app with initialState', () => {
 const {asFragment}= render(<BrowserRouter> <Profile  user="Milan"  userData={userData}  /></BrowserRouter>, { initialState: { user: 'Redux User',userData ,cardquantity:0} })
    expect(screen.getByText("Bookstore")).toBeInTheDocument()
  })

  it("Match SnapShot for profile page",()=>{
 const {asFragment}= render(<BrowserRouter> <Profile  user="Milan"  userData={userData}  /></BrowserRouter>, { initialState: { user: 'Redux User',userData ,cardquantity:0} })
    expect(asFragment()).toMatchSnapshot();
  })

  
  it("Match SnapShot for profile page",()=>{
    const {getByTestId}= render(<BrowserRouter> <Profile  user="Milan"  userData={userData}  /></BrowserRouter>, { initialState: { user: 'Redux User',userData ,cardquantity:0} })
      //  expect(asFragment()).toMatchSnapshot();
     })

})

