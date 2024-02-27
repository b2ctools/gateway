import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { TenantRef } from "../../tenant/domain/tenant.interface";
import { ctxSrv } from "../../shared/context.service";

export enum UserStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  USER = "USER",
  CLIENT = "CLIENT",
}
export interface User extends IDomain {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
  recoveryPasswordCode: string;
  failedLogin: number;
  phone: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  avatar: string;
  birthDay: Date;
  address: string;
  city: string;
  state: string;
  zip: string;
  countryId: ID;
}

export interface UserDto
  extends Omit<User, "password" | "recoveryPasswordCode" | "failedLogin"> {
  tenant?: TenantRef;
}

export const userToDto = (u: User, tenantRef: TenantRef = null): UserDto => {
  delete u.tenantId;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, recoveryPasswordCode, failedLogin, ...info } = u;
  const role = ctxSrv.getUserRole();
  return {
    ...info,
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = [
  "firstName",
  "email",
  "nickname",
  "status",
  "role",
  "phone",
  "birthDay",
  "city",
  "state",
  "zip",
];
