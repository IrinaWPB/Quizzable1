import { cleanup, fireEvent, render } from '@testing-library/react'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'
import { clickSound } from '../components/Sounds'
import { mocked } from 'jest-mock'
import { UserContext } from '../context/UserContext'
import { AppRoutes } from '../components/Routes'
import { LoginForm, AuthorizationPromise, RegistrationForm } from '../types/form'
import { NavBar } from '../components/NavBar'

jest.mock('../components/Sounds')
const sound = mocked(clickSound)

const user1 = {
  id: 1,
  username: "test_user",
  email: "test@getMaxListeners.com",
  password: "password",
  quizes_id: null
}

afterEach(cleanup)

it("renders without crashing", () => {
  render(<MemoryRouter>
           <App />
        </MemoryRouter>)
})

it("renders navbar and homepage for unauthorized users", () => {
  const { getByText } = render(
    <MemoryRouter>
        <App />
    </MemoryRouter>)

  //should have login/register options in navbar 
  expect(getByText('Sign In')).toBeInTheDocument()

  //should have login/register options on homepage
  expect(getByText('Login')).toBeInTheDocument()

  //click on one of these options should take to login page
  fireEvent.click(getByText('Sign In'))
  //make sure it plays "click sound"
  expect(sound).toHaveBeenCalled()
  expect(getByText('Please Login')).toBeInTheDocument()
})

it("renders homepage for authorized users", () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: user1 }}>
        <NavBar logout={function (): void {
                  throw new Error('Function not implemented.')}} />
        <AppRoutes login={function (loginData: LoginForm): Promise<AuthorizationPromise> {
                     throw new Error('Function not implemented.')}} 
                   register={function (signupData: RegistrationForm): Promise<AuthorizationPromise> {
                     throw new Error('Function not implemented.')}} 
                   setMultiNavShow={function (status: boolean): void {
                     throw new Error('Function not implemented.')}} 
                   multiNavShow={false} />
      </UserContext.Provider>
    </MemoryRouter>)

  //should not have login/register options in navbar 
  expect(queryByText('Sign In')).not.toBeInTheDocument()

  //should have Select Category button on homepage
  expect(getByText('Select Category')).toBeInTheDocument()

  //should have Profile link in navbar
  expect(getByText('Profile')).toBeInTheDocument()
  
  //click on Profile should take to testuser profile page
  fireEvent.click(getByText('Profile'))
  expect(getByText('test_user')).toBeInTheDocument()
})

