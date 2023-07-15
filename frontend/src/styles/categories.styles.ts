import styled from "styled-components";
import { UserData } from "../types/user";

interface Props {
  currentUser: UserData | null;
}

export const CategoriesWrapper = styled.div<Props>`
  width: 100%;
  height: ${(props) => (props.currentUser ? "100%" : "100vh")};
  display: flex; 
  justify-content: center;
  padding-top: ${(props) => (props.currentUser ? "0" : "7%")};
`
export const Header = styled.h1`
  color: rgb(0, 108, 170);
  text-shadow: 1px 1px 3px white;
  font-size: 5rem;
  letter-spacing: 3px;
`
export const WarningPage = styled.div`
  color: white;
`

export const CategoryCard = styled.div``

export const CategoryImage = styled.img`
  width: 60%;
  height: 150px;
  object-fit: cover;
  border-radius: 14px;
  margin-top: 10px;
  border: rgb(255, 255, 255, 0.3) solid 3px;
  box-shadow: -3px -3px 3px white;
  &:hover {
	box-shadow: 1px 1px 3px white;
  }
`
export const Title = styled.h3`
  color: rgb(140, 202, 253);
  margin-top: 0px;
`