export interface IUser {
    username?: string | null;
    roles?: string[] | null;
    email?: string | null;
}

export interface IToken {
    token?: string | null;
    status?: boolean;
    message?: string;
}
export default interface IAuth {
    user?: IUser | null;
    token?: IToken | null;
    authenticated?: boolean | null;
}
  