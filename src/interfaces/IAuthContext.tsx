import { LoggedUser } from "./LoggedUser";

export interface IAuthContext {
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  reFetch: () => void;
  loggedUser: LoggedUser;
}
