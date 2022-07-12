declare module "tucmc-auth" {
  interface UserData {
    studentID: string;
    title: string;
    firstname: string;
    lastname: string;
    email: string;
  }

  interface IAuthContext {
    loading: boolean;
    signIn: () => void;
    signOut: () => void;
    reFetch: () => void;
    userData: UserData | null;
  }

  export function AuthProvider({ children, TOKEN: string }): JSX.Element;
  export function useAuth(): IAuthContext;
}
