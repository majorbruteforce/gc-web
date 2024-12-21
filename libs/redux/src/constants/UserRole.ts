export enum UserRole {
    USER = 1,
    ADMIN = 512,
    SUPER_ADMIN = 32768,
}

export const UserRolesEnum = [
    UserRole.USER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
];

export const UserRoleOptions = [
    { label: 'USER', value: UserRole.USER },
    { label: 'ADMIN', value: UserRole.ADMIN },
    { label: 'SUPER_ADMIN', value: UserRole.SUPER_ADMIN },
];
