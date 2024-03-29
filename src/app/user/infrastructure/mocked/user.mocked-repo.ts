import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { User } from "../../domain/user.interface";
import { UserMockedEntity } from "./user.mocked-entity";

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
    entity.recoveryPasswordCode = d.recoveryPasswordCode;
    entity.failedLogin = d.failedLogin;
    entity.phone = d.phone;
    entity.isEmailConfirmed = d.isEmailConfirmed;
    entity.isPhoneConfirmed = d.isPhoneConfirmed;
    entity.avatar = d.avatar;
    entity.birthDay = d.birthDay;
    entity.address = d.address;

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
    };
  }

  async getUserByEmail(email: string): Promise<User> {
    /**
     * Search among all users without
     */
    const users = Object.values(this.elements).filter((u) => u.email === email);
    return users.length > 0 ? this.entityToDomain(users.shift()) : null;
  }
}
