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

export interface LoggedUser {
  meta: SessionMeta;
  user: UserData;
}
