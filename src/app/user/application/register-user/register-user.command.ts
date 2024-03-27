import { sanitizeEmail } from "../../../shared/utils/string";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { User, UserRole, UserStatus } from "../../domain/user.interface";
import { RegisterUserRequest } from "./register-user.request";
import { encodePassword } from "src/app/auth/domain/encoder.service";
import { IAddress } from "src/app/shared/address/address.interface";

export class RegisterUserCommand implements Omit<User, "id"> {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  nickname: string;
  role: UserRole;
  phone: string;
  avatar: string;
  birthDay: Date;
  address: IAddress;
  city: string;
  state: string;
  zip: string;
  countryId: ID;
  recoveryPasswordCode: string;
  failedLogin: number;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  status: UserStatus;

  constructor(request: RegisterUserRequest) {
    const {
      firstName,
      email,
      password,
      nickname,
      role,
      phone,
      avatar,
      birthDay,
      address,
      lastName,
    } = request;
    this.firstName = firstName;
    this.password = encodePassword(password);
    this.email = sanitizeEmail(email);
    this.nickname = nickname;
    this.role = role;
    this.phone = phone;
    this.avatar = avatar;
    this.birthDay = birthDay;
    this.address = address;
    this.lastName = lastName;

    this.recoveryPasswordCode = null;
    this.failedLogin = 0;
    this.isEmailConfirmed = false;
    this.isPhoneConfirmed = false;
    this.status = UserStatus.ENABLED;
  }
}
