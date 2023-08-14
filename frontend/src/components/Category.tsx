import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { clickSound, hoverSound } from "./Sounds";
import { CategoryCard, CategoryImage, Title } from "../styles/categories.styles";

interface ICategoryProps {
  category: {
    code: number;
    name: string;
	  src: string;
  }
}

/** Category component represents a category card
 * click on it will update a category code and navigate to a start-game route
 */
const Category: React.FunctionComponent<ICategoryProps> = ({ category }): JSX.Element => { 
  const navigate = useNavigate()
  const { setCode } = useContext(CategoryContext)

	//starts the game in chosen category
  const startGame = () => {
    setCode(category.code)
    navigate('/start-game')
    clickSound()
  }

  return (
	<CategoryCard onClick={startGame} onMouseEnter={hoverSound}>
	  <CategoryImage src={category.src} alt={category.name}></CategoryImage>
	  <Title>{category.name}</Title>
	</CategoryCard>
  )
}

export default Category

