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

    entity.name = d.name;
    entity.email = d.email;
    entity.password = d.password;
    entity.status = d.status;
    entity.role = d.role;
    entity.tenantId = d.tenantId;
    entity.recoveryPasswordCode = d.recoveryPasswordCode;
    entity.failedLogin = d.failedLogin;

    return entity;
  }
  entityToDomain(e: UserMockedEntity): User {
    return {
      id: e._id,
      name: e.name,
      email: e.email,
      password: e.password,
      tenantId: e.tenantId,
      status: e.status,
      role: e.role,
      recoveryPasswordCode: e.recoveryPasswordCode,
      failedLogin: e.failedLogin,
    };
  }

  async getUserByEmail(email: string) {
    const users = await this.findAll({});
    if (users.length === 0) return null;
    const filtered = users.filter(u => u.email === email);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
