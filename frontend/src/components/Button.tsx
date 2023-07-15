import { clickSound, hoverSound } from "./Sounds"
import { Button } from "../styles/button.styles"

interface IButtonProps {
    classNames?: string;
    actions?: any;
    text?: string;
    width?: string; 
    height?: string;
    dangerouslySetInnerHTML?: any
}

export const ButtonElement: React.FunctionComponent<IButtonProps> = ({classNames, actions, text, width, height = '50px', dangerouslySetInnerHTML }): JSX.Element => {
  const handleClick = (action?: any) => {
    if (actions) {
      actions()
    }
    clickSound()
  }
  return (
    <Button
      style={{width, height}}
      className={classNames}
      onMouseEnter={hoverSound}
      onClick={handleClick}>{text}
    </Button>
  )
} 