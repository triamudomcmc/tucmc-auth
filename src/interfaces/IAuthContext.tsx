import {UserData} from "./UserData";

export interface IAuthContext {
  SignInWithTUCMC: () => JSX.Element,
  signOut: () => void,
  reFetch: () => void,
  userData: UserData | null
}
