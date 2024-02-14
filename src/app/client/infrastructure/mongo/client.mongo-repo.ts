
import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { ClientMongoEntity } from './client.mongo-entity';
import { Client } from '../../domain/client.interface';
import { ID } from 'src/app/shared/abstract-repository/repository.interface';

@Injectable()
export class ClientMongoRepository extends MongoRepository<
  ClientMongoEntity,
  Client
> {
  domainToEntity(d: Client): ClientMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }
  entityToDomain(e: ClientMongoEntity): Client {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  async getClientByUserId(userId: ID): Promise<Client> {
    console.log(name);
    throw new Error('Method not implemented.');
  }

}
