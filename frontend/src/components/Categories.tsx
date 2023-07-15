import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../assets/categoriesList";
import Category from "./Category";
import { ButtonElement } from "./Button";
import { CategoryType } from "../types/category";
import { FadeInDiv } from "./Animation";
import { CategoriesWrapper, WarningPage, Header } from "../styles/categories.styles";

interface ICategoriesProps {}

const Categories: React.FunctionComponent<ICategoriesProps> = (): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <CategoriesWrapper currentUser = { currentUser }>
      <FadeInDiv>
        {currentUser 
        ? <>
            <Header>Categories</Header>
            <div className="ui three column doubling stackable grid">
              {CATEGORIES.map((category: CategoryType) => (
                <div className="column" key={category.code}>
                  <Category category={ category } />
                </div>
                ))}
            </div>
          </>
        : <WarningPage>
            <h2>Please</h2>
            <ButtonElement text="Sign In" actions={() => navigate('/login')} width='300px'/>
            <h2>or</h2>
            <ButtonElement text="Register" actions={() => navigate('/register')} width='300px'/>
            <h2>to choose a category</h2>
        </WarningPage>}
      </FadeInDiv>
    </CategoriesWrapper>
	)
}

export default Categories