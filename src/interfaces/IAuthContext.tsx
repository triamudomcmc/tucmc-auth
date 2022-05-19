import { UserData } from "./UserData"

export interface IAuthContext {
  SignInWithTUCMC: () => JSX.Element
  signIn: () => void
  signOut: () => void
  reFetch: () => void
  userData: UserData | null
}
