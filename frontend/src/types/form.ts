export type RegistrationForm = {
  username: string
  email: string
  password: string
}

export type LoginForm = {
  username: string
  password: string
}

export type AuthorizationPromise = {
  success: boolean;
  errors?: any
}