export interface ILoginErrorResponse {
    response?: {
        data?: {
            authenticated: boolean,
            message: string,
        }
    }
};
