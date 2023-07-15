import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Categories from '../components/Categories'
import { CategoryContext } from '../context/CategoryContext'
import { mocked } from 'jest-mock'
import { clickSound } from '../components/Sounds'
import { act } from 'react-dom/test-utils'

jest.mock('../components/Sounds')
const sound = mocked(clickSound)

afterEach(()=> cleanup())

const user = {
    id: 1,
    username: "test_user",
    email: "test@gmail.com",
    password: "password",
    quizes_id: null
  }

it('renders prompt to login/register for unauthorized users', () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: null }}>
        <Categories />
      </UserContext.Provider>
    </MemoryRouter>)
  const loginButton = getByText('Sign In')
  const registerButton = getByText('Register')
  expect(loginButton).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()
}) 

it('renders list of categories for authorized users', async () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: user }}>
      <CategoryContext.Provider value={{ catCode:9, setCode: function(){}}}>
        <Categories/>
      </CategoryContext.Provider>   
      </UserContext.Provider>
    </MemoryRouter>)
  
  expect(getByText('Nature')).toBeInTheDocument()
  expect(getByText('Music')).toBeInTheDocument()
  const someCategoryCard = getByText('Music')
  const spy = jest.spyOn(someCategoryCard, 'click')
  act(()=> fireEvent.click(someCategoryCard))
  expect(sound).toHaveBeenCalled()
  spy.mockRestore()
}) 

