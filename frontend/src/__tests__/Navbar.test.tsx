import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { NavBar } from '../components/NavBar'

const user = {
    id: 1,
    username: "test_user",
    email: "test@getMaxListeners.com",
    password: "password",
    quizes_id: null
  }

afterEach(cleanup)

it("renders navigation for unauthorized users", () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: null }}>
        <NavBar logout={function (): void {
          throw new Error('Function not implemented.')
        } } />
      </UserContext.Provider>
    </MemoryRouter>)
  
  expect(getByText('Sign In')).toBeInTheDocument()
  expect(queryByText('Profile')).not.toBeInTheDocument()

})

it("renders navigation for authorized users", () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: user }}>
        <NavBar logout={function (): void {
                  throw new Error('Function not implemented.')
              } } />
      </UserContext.Provider>
    </MemoryRouter>)
  expect(getByText('Profile')).toBeInTheDocument()
  expect(queryByText('Sign In')).not.toBeInTheDocument()
})

