import { Injectable } from '@nestjs/common';
import { MockedRepository } from '../../../shared/abstract-repository/mocked-repository';
import { User } from '../../domain/user.interface';
import { UserMockedEntity } from './user.mocked-entity';

@Injectable()
export class UserMockedRepository extends MockedRepository<
  UserMockedEntity,
  User
> {
  domainToEntity(d: User): UserMockedEntity {
    const entity = new UserMockedEntity();

    entity.firstName = d.firstName;
    entity.lastName = d.lastName;
    entity.nickname = d.nickname;
    entity.email = d.email;
    entity.password = d.password;
    entity.status = d.status;
    entity.role = d.role;
    entity.tenantId = d.tenantId;
    entity.recoveryPasswordCode = d.recoveryPasswordCode;
    entity.failedLogin = d.failedLogin;
    entity.phone = d.phone;
    entity.isEmailConfirmed = d.isEmailConfirmed;
    entity.isPhoneConfirmed = d.isPhoneConfirmed;
    entity.avatar = d.avatar;
    entity.birthDay = d.birthDay;
    entity.address = d.address;
    entity.city = d.city;
    entity.state = d.state;
    entity.zip = d.zip;
    entity.countryId = d.countryId;

    return entity;
  }
  entityToDomain(e: UserMockedEntity): User {
    return {
      id: e._id,
      firstName: e.firstName,
      lastName: e.lastName,
      nickname: e.nickname,
      email: e.email,
      password: e.password,
      tenantId: e.tenantId,
      status: e.status,
      role: e.role,
      recoveryPasswordCode: e.recoveryPasswordCode,
      failedLogin: e.failedLogin,
      phone: e.phone,
      isEmailConfirmed: e.isEmailConfirmed,
      isPhoneConfirmed: e.isPhoneConfirmed,
      avatar: e.avatar,
      birthDay: e.birthDay,
      address: e.address,
      city: e.city,
      state: e.state,
      zip: e.zip,
      countryId: e.countryId,
    };
  }

  async getUserByEmail(email: string) {
    const users = await this.findAll({});
    if (users.length === 0) return null;
    const filtered = users.filter(u => u.email === email);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
