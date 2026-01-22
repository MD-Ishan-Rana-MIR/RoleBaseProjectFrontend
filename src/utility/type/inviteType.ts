

export type UserRole = "ADMIN" | "MANAGER" | "STAFF";

export interface InviteApiPayloadType {
    role: UserRole;
    email: string
}

export interface InviteData {
    _id: string;
    email: string;
    role: UserRole;
    token: string;
    expiresAt: string;   // ISO date string
    createdAt: string;   // ISO date string
    updatedAt: string;   // ISO date string
}

export interface InviteApiResType {
    status: "success";
    message: string;
    data: InviteData;
}

