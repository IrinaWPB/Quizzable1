import { fireEvent, render, cleanup } from '@testing-library/react'
import HomePage from '../components/HomePage'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { clickSound } from '../components/Sounds'
import { mocked } from 'jest-mock'
import App from '../App'

jest.mock('../components/Sounds')
const sound = mocked(clickSound)

const user = {
  id: 1,
  username: "test_user",
  email: "test@getMaxListeners.com",
  password: "password",
  quizes_id: null
}

afterEach(cleanup)

it("renders home screen for unauthorized users", async () => {
  const { getByText, queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <UserContext.Provider value={{ currentUser: null }}>
        <App />
      </UserContext.Provider>
    </MemoryRouter>)
  expect(getByText('Start Game')).toBeInTheDocument()
  //category choice works only for logged in users
  expect(queryByText('Select Category')).not.toBeInTheDocument()

  //click on "Multiplayer" button takes to "Login" page
  fireEvent.click(getByText('Multiplayer Game'))
  expect(sound).toHaveBeenCalled()
  expect(getByText('Please Login')).toBeInTheDocument()
})

it("renders home screen for authorized users", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: user }}>
        <HomePage setMultiNavShow={function (status: boolean): void {
          throw new Error('Function not implemented.')
        } } multiNavShow={false} />
      </UserContext.Provider>
    </MemoryRouter>)
  expect(getByText('Start Game')).toBeInTheDocument()
  //category choice works only for logged in users
  expect(getByText('Select Category')).toBeInTheDocument()

  fireEvent.click(getByText('Select Category'))
})
   