import { render } from '@testing-library/react'
import HomePage from '../components/HomePage'
import { MemoryRouter } from 'react-router-dom'
import { OnlineContext, OnlinePlayersContext, UserContext } from '../context/UserContext'

const user = {
  id: 1,
  username: "test_user",
  email: "test@getMaxListeners.com",
  password: "password",
  quizes_id: null
}

it("renders when OnlineBar state is true", () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: user }}>
        <OnlineContext.Provider value={{ online: true, setOnlineStatus: function (status:boolean): void {throw new Error('Function not implemented')} }} >
        <OnlinePlayersContext.Provider value={{ onlinePlayers: {'user': 'test_user'}, setOnlinePlayers: function (): void {throw new Error('Function not implemented')} }} >
          <HomePage setMultiNavShow={function (status: boolean): void {throw new Error('Function not implemented.')}} 
                    multiNavShow={true} />
        </OnlinePlayersContext.Provider>
        </OnlineContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>)
    expect(getByText('Online Players')).toBeInTheDocument()
    expect(getByText('Invitations')).toBeInTheDocument()
})

it("doesn't render when OnlineBar state is false", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: user }}>
          <HomePage setMultiNavShow={function (status: boolean): void {throw new Error('Function not implemented.')}} 
                    multiNavShow={false} />
        </UserContext.Provider>
      </MemoryRouter>)
    expect(queryByText('Online Players')).not.toBeInTheDocument()
    expect(queryByText('Invitations')).not.toBeInTheDocument()
})
  