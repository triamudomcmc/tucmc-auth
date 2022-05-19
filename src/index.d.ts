import { UserData } from "./interfaces/UserData"

declare module "tucmc-auth" {
  interface UserData {
    studentID: string
    title: string
    firstname: string
    lastname: string
    email: string
  }

  interface IAuthContext {
    SignInWithTUCMC: () => JSX.Element
    signIn: () => void
    signOut: () => void
    reFetch: () => void
    userData: UserData | null
  }

  export function AuthProvider({ children, TOKEN: string }): JSX.Element
  export function useAuth(): IAuthContext
}
