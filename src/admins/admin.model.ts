export interface Admin {
    id: number;
    email: string;
    name: string;
    status: AdminStatus;
}

export enum AdminStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}