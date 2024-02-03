import { IDomain } from '../../shared/abstract-repository/entities/domain';

export enum UserStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  USER = 'USER',
  CLIENT = 'CLIENT',
}
export interface User extends IDomain {

  name: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
  recoveryPasswordCode: string;
  failedLogin: number;
}

export interface UserDto extends Omit<User, 'password'>{}

export const userToDto = (u: User): UserDto => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {password, ...info } = u;
  return {
    ...info
  }
}

export const sortable = [
  'name',
  'email',
]