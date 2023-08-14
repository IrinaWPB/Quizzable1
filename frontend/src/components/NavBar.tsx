import { NavBarContainer,
         NavLink,
         NavLinksContainer,
         ExtendedNavBar,
         InnerContainer,
         LeftContainer,
         RightContainer,
         OpenButton,
         Logo } from '../styles/navBar.styles'
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { clickSound, hoverSound } from "./Sounds"


interface INavBarProps {
  logout(): void
}

/** NavBar component contains Links to navigate through the app
 * If there is a current user - renders set of links for logged in user
 * Will render an expandable hamburger menu for smaller screen sizes
 */
export const NavBar: React.FunctionComponent<INavBarProps> = ({ logout }): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const [extension, setExtension] = useState(false)

  const loggedIn = (
    <>
      <NavLink to='/categories' onMouseEnter={hoverSound}>Categories</NavLink>
      <NavLink to='/profile' onMouseEnter={hoverSound}>Profile</NavLink>
      <NavLink to='/' onClick={ logout } onMouseEnter={hoverSound}>Sign Out</NavLink>
    </>
  )
  const notLoggedIn = (
    <>
      <NavLink to='/categories' onMouseEnter={hoverSound}>Categories</NavLink>
      <NavLink to='/login' onMouseEnter={hoverSound}>Sign In</NavLink> 
      <NavLink to='/register' onMouseEnter={hoverSound}>Register</NavLink>
    </>
  )

  return (
    <NavBarContainer extension = { extension }>
      <InnerContainer>
        <LeftContainer>
          <Logo to='/' onMouseEnter={hoverSound} onClick={clickSound}>Quizzable</Logo>
        </LeftContainer>
        <RightContainer>
          <NavLinksContainer onClick={clickSound}>
            {currentUser ? loggedIn : notLoggedIn}
          </NavLinksContainer>
          <OpenButton onClick={() => {
            setExtension((state: boolean) => !state) 
            clickSound()}}>
              {extension ? <>&#10005;</> : <>&#8801;</>}
          </OpenButton>
        </RightContainer>
      </InnerContainer>
      { extension &&
      <ExtendedNavBar>
        {currentUser ? loggedIn : notLoggedIn}
      </ExtendedNavBar> }
    </NavBarContainer>
  )
}
