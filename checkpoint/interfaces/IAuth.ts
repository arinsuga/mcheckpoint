export interface IRole {
    code?: string;
    name?: string;
}

export interface IHeader {
    typ: string;
    alg: string;
}

export interface IClaims {
    iss?: string;
    iat?: number;
    exp?: number;
    nbf?: number;
    jti?: string;
    sub?: number,
    username?: string;
    roles?: IRole[];
    bo?: 0;
    prv?: {
        name?: string;
        email?: string;
        dept?: string;
        noabsen?: string;
    };

}

export interface IUser {
    name?: string;
    username?: string;
    roles?: IRole[];
    email?: string;
}

export interface IToken {
    token?: string;
    status?: boolean;
    code?: number; // 200 valid / 401 invalid / 402 expired
    message?: string;
}

export interface IJWT {
    header?: IHeader;
    payload?: IClaims;
}

export default interface IAuth {
    user?: IUser;
    token?: IToken;
    jwt?: IJWT;
    authenticated?: boolean;
}
  