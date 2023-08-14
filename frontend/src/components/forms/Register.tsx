import React, {  useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegistrationForm } from "../../types/form"
import { ButtonElement } from "../Button";
import { FormContainer, Field, Header, Errors, Note } from "../../styles/form.styles"
import { FadeInDiv } from "../Animation";

interface IRegisterProps {
  register: (data: RegistrationForm) => Promise<{ success: boolean; errors?: any}>
}


/** Register component takes passed register() prop and uses it when data is submitted.
 * Returns Registration Form with 3 input fields (username, password and email)
 * If registration is successful - navigates to home page (token is stored in local starage)
 */
const Register: React.FunctionComponent<IRegisterProps> = ({register}): JSX.Element => {
  
  const navigate = useNavigate()
  const initialState = {
    username:"",
    password:"",
    email:""
  }

  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState([])

  //updates state as user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value}= e.target
    setData((data: RegistrationForm) =>({
        ...data,
        [name]:value 
    }))
  }

  //Takes current data (if valid) and passes it to register function, navigates to homepage.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    let result = await register(data)
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
      <Header>Registration Form</Header>
      <form onSubmit={handleSubmit} className="ui form">
        <Errors>
          {errors && errors.map((e: string, i: number): JSX.Element => <p key={i}>* {e}</p>)}
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
        <Field>
          <label htmlFor='email'>Email</label>
          <input type='email' id="eamil" value={data.email} name="email"
              onChange={handleChange} />
        </Field>
        <ButtonElement text="Register" width='170px'/>
      </form>
      <Note>Already have an account? Please <Link to='/login'>Sign In</Link> here.</Note>
    </FormContainer>
    </FadeInDiv>
  )
}

export default Register