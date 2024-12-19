export interface IError {
    response?: {
        data?: {
            status: number;
            title: string;
            detail: string;
            extensions?: Record<string, unknown>;
            errors?: Record<string, string[]>;
        }
    }
}
