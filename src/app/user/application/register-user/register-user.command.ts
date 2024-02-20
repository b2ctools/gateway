import { sanitizeEmail } from "../../../shared/utils/string";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { User, UserRole } from "../../domain/user.interface";
import { RegisterUserRequest } from "./register-user.request";

export class RegisterUserCommand
  implements
    Omit<
      User,
      | "id"
      | "status"
      | "recoveryPasswordCode"
      | "failedLogin"
      | "isEmailConfirmed"
      | "isPhoneConfirmed"
    >
{
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  tenantId: ID;
  nickname: string;
  role: UserRole;
  phone: string;
  avatar: string;
  birthDay: Date;
  address: string;
  city: string;
  state: string;
  zip: string;
  countryId: ID;

  constructor(request: RegisterUserRequest) {
    const {
      firstName,
      email,
      password,
      tenantId,
      nickname,
      role,
      phone,
      avatar,
      birthDay,
      address,
      city,
      state,
      zip,
      countryId,
      lastName,
    } = request;
    this.firstName = firstName;
    this.password = password;
    this.email = sanitizeEmail(email);
    this.tenantId = tenantId;
    this.nickname = nickname;
    this.role = role;
    this.phone = phone;
    this.avatar = avatar;
    this.birthDay = birthDay;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.countryId = countryId;
    this.lastName = lastName;
  }
}
