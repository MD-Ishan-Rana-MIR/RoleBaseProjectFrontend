
export type UserRole = "ADMIN" | "MANAGER" | "STAFF";
export type UserStatus = "ACTIVE" | "INACTIVE";



export interface UserType {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    invitedAt: string;
    createdAt: string;
    updatedAt: string
}