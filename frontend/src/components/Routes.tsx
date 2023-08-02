import HomePage from './HomePage'
import SignIn from './forms/SignIn'
import Register from './forms/Register'
import Profile from './Profile'
import Categories from './Categories'
import StartGame from './game/StartGame'
import StartMultiPlayerGame from './game/StartMultiPlayerGame'
import { LoginForm, RegistrationForm, AuthorizationPromise } from '../types/form'
import { Routes, Route } from 'react-router-dom'


interface IRoutesProps {
 login: (loginData: LoginForm) => Promise<AuthorizationPromise>
 register: (signupData: RegistrationForm) => Promise<AuthorizationPromise>
 setMultiNavShow: (status: boolean) => void
 multiNavShow: boolean
}

export const AppRoutes: React.FunctionComponent<IRoutesProps> = ({ login, register, setMultiNavShow, multiNavShow }): JSX.Element => {
  return (
	<Routes>
	  <Route path='/' element={<HomePage setMultiNavShow={(status: boolean) => setMultiNavShow(status)} 
	                                     multiNavShow={ multiNavShow } />} />
	  <Route path='/login' element={<SignIn login={ login }/>} />
	  <Route path='/register' element={<Register register={ register }/>} />
	  <Route path='/categories' element={<Categories />} />
	  <Route path='/profile' element={<Profile />} />
	  <Route path='/start-game' element={<StartGame />} />
	  <Route path='/multi-game' element={<StartMultiPlayerGame />} />
	</Routes> 
  )
}
