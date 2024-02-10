
import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { SampleMongoEntity } from './sample.mongo-entity';
import { Sample } from '../../domain/sample.interface';

@Injectable()
export class SampleMongoRepository extends MongoRepository<
  SampleMongoEntity,
  Sample
> {
  domainToEntity(d: Sample): SampleMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }
  entityToDomain(e: SampleMongoEntity): Sample {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  async getSampleByName(name: string): Promise<Sample> {
    console.log(name);
    throw new Error('Method not implemented.');
  }

}
