import { render } from "@testing-library/react";
import Profile from "../components/Profile";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const user1 = {
  id: 1,
  username: "test_user",
  email: "test@gmail.com",
  password: "password",
  quizes_id: null
}

it("renders profile page for the test_user", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/profile']}>
      <UserContext.Provider value={{ currentUser: user1 }}>
        <Profile />
      </UserContext.Provider>
    </MemoryRouter>)
  expect(getByText('test_user')).toBeInTheDocument()
})