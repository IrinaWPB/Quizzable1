import styled, { keyframes } from 'styled-components'
import { fadeIn, slideInLeft, slideInRight, tada, shake } from 'react-animations'

const fadeInAnimation = keyframes`${fadeIn}`
const slideLeftAnimation = keyframes`${slideInLeft}`
const slideRightAnimation = keyframes`${slideInRight}`
const correctAnswerAnimation = keyframes`${tada}`
const incorrectAnswerAnimation = keyframes`${shake}`

export const FadeInDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`
export const SlideLeftDiv = styled.div`
  animation: 1s ${slideLeftAnimation};
`
export const SlideRightDiv = styled.div`
  animation: 1s ${slideRightAnimation};
`
export const TadaDiv = styled.div`
  animation: 1s ${correctAnswerAnimation};
`
export const ShakeDiv = styled.div`
  animation: 1s ${incorrectAnswerAnimation};
`
export const Invitation = styled.span`
  animation: 1s ${slideRightAnimation};
` 

