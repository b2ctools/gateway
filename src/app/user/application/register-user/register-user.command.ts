import { ID } from '../../../shared/abstract-repository/repository.interface';
import { RegisterUserRequest } from './register-user.request';

export class RegisterUserCommand {
  name: string;
  password: string;
  email: string;
  tenantId: ID;
  nickname: string;
  role: string;
  phone: string;
  avatar: string;
  birthDay: Date;
  address: string;
  city: string;
  state: string;
  zip: string;
  countryId: ID;

  constructor(request: RegisterUserRequest) {
    const { name, email, password, tenantId, nickname, role, phone, avatar, birthDay, address, city, state, zip, countryId } = request;
    this.name = name;
    this.password = password;
    this.email = email;
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
  }
}
