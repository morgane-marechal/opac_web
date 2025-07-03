import React from 'react'
import Navbar from './NavBar'
import { MemoryRouter } from 'react-router-dom';


describe('<Navbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
          <MemoryRouter>   
          <Navbar />
          </MemoryRouter>
  )
  })
})