export interface LoginPayloadType {
    email: string;
    password: string
}


export type UserRole = "ADMIN" | "MANAGER" | "STAFF";
export interface LoginUserData {
    token: string;
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface LoginApiResType {
    status: "success";
    message: string;
    data: LoginUserData;
}

