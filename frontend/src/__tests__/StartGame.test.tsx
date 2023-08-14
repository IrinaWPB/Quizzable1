import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CategoryContext } from '../context/CategoryContext'
import StartGame from '../components/game/StartGame'

it('renders startgame "Ready?" page when ready state is false', () => {
  const { getByText } = render(
    <MemoryRouter>
      <CategoryContext.Provider value={{ catCode: 9, setCode: jest.fn() }}>
        <StartGame  />
      </CategoryContext.Provider>
    </MemoryRouter>)
  const goButton = getByText('GO!')
  expect(goButton).toBeInTheDocument()
  expect(getByText("Ready?")).toBeInTheDocument()
}) 


