import styled from "styled-components";

export const Button = styled.button`
  margin: 15px;
  background-color: #56a3f5;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 6px blue;
  font-size: 1.5rem;
  border: none;
  font-weight: 700;
  width: 400px;

  &:hover {
    background-color: #5b9bf5;
    box-shadow: 2px 2px 10px #56a3f5;
    transform: scale(1.1);
  };
  @media (max-width: 700px) {
    width: 300px;
  };
  @media (max-width: 430px) {
    width: 250px;
  };
`