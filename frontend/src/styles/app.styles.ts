import styled from 'styled-components';
import img from '../assets/images/bg.jpg'

export const Container = styled.div`
  background: url(${img}) fixed center; 
  background-size: 100% 100%;
  text-align: center;
  padding-bottom: 50px;
`
export const AppRoutesWrapper = styled.div`
  margin: 0 40px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-shadow: -3px -3px 10px white;
  display: flex;
  justify-content: center;
  padding: 3% 0;
  height: 100%
`