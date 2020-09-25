import React from 'react'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../utils/testUtils'
import Profile from '../components/profile'
it('Renders the connected app with initialState', () => {
  render(<Profile />, { initialState: { } })
    
  expect(screen.getByText(/redux user/i)).toBeInTheDocument()
})

describe(

)