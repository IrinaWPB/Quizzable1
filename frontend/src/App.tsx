import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar.tsx';
import { AppRoutes } from './components/Routes.tsx';
import { OnlineContext, UserContext, OnlinePlayersContext } from './context/UserContext.tsx';
import { CategoryContext } from './context/CategoryContext.tsx';
import UserApi from './api.ts';
import useLocalStorage from './hooks/UseLocalStorage.tsx';
import { decodeToken } from 'react-jwt';
import { AuthorizationPromise, LoginForm, RegistrationForm } from './types/form.ts';
import { DecodedUser } from './types/user.ts';
import { Container, AppRoutesWrapper } from './styles/app.styles.ts';
import { clientSocketInstance } from './socketio-frontend.ts';

export const App: React.FunctionComponent = (): JSX.Element => {

  const [currentUser, setCurrentUser] = useState(null)

  //automatically adds a new token/ delete a token
  const [token, setToken] = useLocalStorage("token")
  const [catCode, setCode] = useState(9)
  const [multiNavShow, setMultiNavShow] = useState<boolean>(false)
  const [online, setOnlineStatus] = useState<boolean>(false)
  const [onlinePlayers, setOnlinePlayers] = useState({})

  /**  Load user info from API. Until a user is logged in and they have a token,
  * this should not run. It only needs to re-run when a user logs out(deletes token), so
  * the value of the token is a dependency for this effect.
  */
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser(): Promise<void> {
        if (token) {
          try {
            const user: DecodedUser = decodeToken(token)
            // put the token on the Api class so it can use it to call the API.
            UserApi.token = token;
            // finds current user info by username from token
            let currUser = await UserApi.getCurrentUser(user.username);
            setCurrentUser(currUser);   
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
      }
      getCurrentUser();
      }
  , [token]);
  
  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   */
  async function register(signupData: RegistrationForm): Promise<AuthorizationPromise> {
    try {
      let token = await UserApi.register(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.*/
  async function login(loginData: LoginForm): Promise<AuthorizationPromise> {
    try {
      let token = await UserApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // Handles site-wide logout
  async function logout(): Promise<void> {
    setCurrentUser(null);
    setToken(null);
    setMultiNavShow(false)
    //when user logs out they're automatically removed from online players
    clientSocketInstance.emit('go_offline')
  }
  
  /** App returns Navbar and all Routes wrapped in
   * Context Providers to have it's values accessible
   * throughout the app
   */
  return (
    <Container>
        <UserContext.Provider value={{ currentUser }}>
        <CategoryContext.Provider value={{ catCode, setCode }}>
        <OnlineContext.Provider value={{ online, setOnlineStatus }}>
        <OnlinePlayersContext.Provider value={{ onlinePlayers, setOnlinePlayers }}>
          
          <NavBar logout = { logout } />
          <AppRoutesWrapper>
            <AppRoutes login={ login } register={ register } 
                       setMultiNavShow={ (status: boolean) => setMultiNavShow(status) }
                       multiNavShow={multiNavShow}
                       /> 
          </AppRoutesWrapper>
        
        </OnlinePlayersContext.Provider>
        </OnlineContext.Provider>
        </CategoryContext.Provider>
        </UserContext.Provider>

    </Container>
  );
}

export default App