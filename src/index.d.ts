declare module "tucmc-auth" {
  interface SessionMeta {
    fp: string;
    created: number;
    domain: string;
    applicationId: string;
  }

  interface UserData {
    sessionId: string;
    uuid: string;
    studentID?: string;
    title?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    room?: string;
    number?: string;
  }

  interface LoggedUser {
    meta: SessionMeta;
    user: UserData;
  }

  interface IAuthContext {
    loading: boolean;
    signIn: () => void;
    signOut: () => void;
    reFetch: () => void;
    loggedUser: LoggedUser;
  }

  export function AuthProvider({ children, TOKEN: string }): JSX.Element;
  export function useAuth(): IAuthContext;
  export function TUCMCLogin(): JSX.Element;
}
