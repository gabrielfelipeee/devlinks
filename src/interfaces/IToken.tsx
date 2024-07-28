export interface IToken {
    unique_name: string[],
    nameid: string,
    jti: string,
    nbf: number,
    exp: number,
    iat: number,
    iss: string,
    aud: string
};