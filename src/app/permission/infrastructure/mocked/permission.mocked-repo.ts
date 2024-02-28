
import { Injectable } from '@nestjs/common';
import { MockedRepository } from '../../../shared/abstract-repository/mocked-repository';
import { PermissionMockedEntity } from './permission.mocked-entity';
import { Permission } from '../../domain/permission.interface';

@Injectable()
export class PermissionMockedRepository extends MockedRepository<
  PermissionMockedEntity,
  Permission
> {
  domainToEntity(d: Permission): PermissionMockedEntity {
    const entity = new PermissionMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    return entity;
  }

  entityToDomain(e: PermissionMockedEntity): Permission {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      
    };
  }

  async getPermissionByName(name: string): Promise<Permission> {
    const { data: permissions} = await this.findAll({});
    if (permissions.length === 0) return null;
    const filtered = permissions.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }

}
