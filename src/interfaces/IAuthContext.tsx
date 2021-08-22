import { UserData } from "./UserData";

export interface IAuthContext {
  loading: boolean,
  signIn: () => void,
  signOut: () => void,
  reFetch: () => void,
  userData: UserData | null
}
