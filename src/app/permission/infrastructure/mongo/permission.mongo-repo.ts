
import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { PermissionMongoEntity } from './permission.mongo-entity';
import { Permission } from '../../domain/permission.interface';

@Injectable()
export class PermissionMongoRepository extends MongoRepository<
  PermissionMongoEntity,
  Permission
> {
  domainToEntity(d: Permission): PermissionMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }
  entityToDomain(e: PermissionMongoEntity): Permission {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  async getPermissionByName(name: string): Promise<Permission> {
    console.log(name);
    throw new Error('Method not implemented.');
  }

}
