export interface AuthRequest {
    email: string;
    password: string;
}

export interface User {
    email: string;
    name: string;
    password?: string;
}