import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  extension: boolean;
}

export const NavBarContainer = styled.nav<Props>`
  width: 100%;
  height: ${(props) => (props.extension ? "400px" : "150px")};
  display: flex;
  flex-direction: column;
`
export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  padding-left: 70px;
`
export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  padding-right: 5%;
  justify-content: end;
`
export const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
`
export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 760px) {
    display: none;
  }
`
export const Logo = styled(Link)`
  color:#99b8fc;
  font-size: 4rem;
  text-shadow: 1px 1px 2px white;
`
export const NavLink = styled(Link)`
  color: #a1c3fd;
  font-size: 2rem;
  text-shadow: 1px 1px 9px blueviolet;
  margin: 10px;
`
export const OpenButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 80px;
  cursor: pointer;
  margin-right: 30px;

  @media (min-width: 760px) {
    display: none;
  }
`
export const ExtendedNavBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 760px) {
    display: none;
  }

`