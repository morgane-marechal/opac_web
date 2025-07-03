import React from 'react'
import LoginForm from './form_connection'
import { MemoryRouter } from 'react-router-dom';

describe('<LoginForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
        <MemoryRouter>
        <LoginForm />
        </MemoryRouter>
)
  })
})



// import MyComponent from '../../src/MyComponent';

// it('test mon composant avec navigation', () => {
//   cy.mount(
//     <MemoryRouter>
//       <MyComponent />
//     </MemoryRouter>
//   );
// });
