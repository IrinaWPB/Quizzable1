import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SignIn from '../components/forms/SignIn'
import Register from '../components/forms/Register'
import { AuthorizationPromise } from '../types/form'

afterEach(()=> cleanup())

it('renders login page for unauthorized users', () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
        <SignIn login={function (): Promise<AuthorizationPromise> {
          throw new Error('Function not implemented.')
        } }/>
    </MemoryRouter>)
  const loginButton = getByText('Log In')
  expect(getByText("Please Login")).toBeInTheDocument()
  expect(getByLabelText("Username")).toBeInTheDocument()
  expect(getByLabelText("Password")).toBeInTheDocument()
  expect(loginButton).toBeInTheDocument()
}) 

it('renders registration page for unauthorized users', () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
        <Register register={function (): Promise<AuthorizationPromise> {
          throw new Error('Function not implemented.')
        } }/>
    </MemoryRouter>)
  const loginButton = getByText('Register')
  expect(getByLabelText("Username")).toBeInTheDocument()
  expect(getByText("Email")).toBeInTheDocument()
  expect(loginButton).toBeInTheDocument()
}) 

