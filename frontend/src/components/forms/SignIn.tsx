import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthorizationPromise, LoginForm } from "../../types/form";
import { clickSound, hoverSound } from "../Sounds";
import { ButtonElement } from "../Button";
import { FormContainer, Field, Header, Errors, Note } from "../../styles/form.styles";
import { FadeInDiv } from "../Animation";


export interface ISignInProps {
  login: (loginData: LoginForm) => Promise<AuthorizationPromise>
}

/** SingIn component takes passed login() prop and uses it when data is submitted.
 * Returns Login Form with 2 input fields (username and password)
 * If login is successful - navigates to home page (token is stored in local starage)
 */

const SignIn: React.FunctionComponent<ISignInProps> = ({ login }): JSX.Element => {

  const navigate = useNavigate()
  const initialState = {
    username:"",
    password:""
  }

  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState([])

  //tracks inputs state, updates it as user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value}= e.target
    setData(data=>({
      ...data,
      [name]:value 
    }))
  }

  /** submits current state and pass the data into provided login function
   * if entered data is invalid renders errors on top of the form and sets data to initial state
   * navigates to homepage for registered users if login is successful
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const result = await login(data)
    if (result.success) {
      navigate('/')
    } else {
      setErrors(result.errors)
      setData(initialState)
    }
  }

  return(
    <FadeInDiv>
      <FormContainer>
      <Header>Please Login</Header>
      <form onSubmit={handleSubmit} className="ui form">
        <Errors>
          {errors.length > 0 && errors.map((e: string, i: number): JSX.Element => <p key={i}>* {e}</p>)}
        </Errors>
        <Field>
          <label htmlFor='username'>Username</label>
          <input type='text' id="username" value={data.username} name="username"
                 onChange={handleChange} />
        </Field>
        <Field>
          <label htmlFor='password'>Password</label>
          <input type='password' id="password" value={data.password} name="password"
               onChange={handleChange} />
        </Field>
        <ButtonElement text="Log In" width="170px" />
      </form>
      <Note>Don't have an account yet? <Link to="/register" 
                                          onMouseEnter={hoverSound}
                                          onClick={clickSound}>
                                            Register
                                       </Link> here.
      </Note>
    </FormContainer>
    </FadeInDiv>
    
  )
}

export default SignIn