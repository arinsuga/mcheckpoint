export interface IUser {
    username?: string | null;
    roles?: string[] | null;
    email?: string | null;
}

export interface IToken {
    token?: string | null;
    status?: boolean;
    code?: number; // 200 valid / 401 invalid / 402 expired
    message?: string;
}

export default interface IAuth {
    user?: IUser | null;
    token?: IToken | null;
    authenticated?: boolean | null;
}
  