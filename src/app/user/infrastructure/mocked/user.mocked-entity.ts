import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { User, UserRole, UserStatus } from "../../domain/user.interface";
import { IAddress } from "../../../shared/address/address.interface";

export class UserMockedEntity extends MockedEntity implements Omit<User, "id"> {
  firstName: string;
  lastName: string;
  user: string;
  password: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  recoveryPasswordCode: string;
  failedLogin: number;
  nickname: string;
  phone: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  avatar: string;
  birthDay: Date;
  address: IAddress;
}
