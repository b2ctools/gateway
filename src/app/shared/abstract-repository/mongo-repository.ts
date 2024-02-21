import { SearchRequest } from "../base.request";
import { IDomain } from "./entities/domain";
import { MongoEntity } from "./entities/mongo-entity";
import { AppRepository, FindAllOutput, ID } from "./repository.interface";

/**
 * This is a class to implement the handling
 * of all mongo entities
 */
export abstract class MongoRepository<
  TMongoEntity extends MongoEntity,
  TDomain extends IDomain,
> implements AppRepository<TMongoEntity, TDomain>
{
  logItems() {}

  getEntityId(id: ID): Promise<TMongoEntity> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  persist(d: TDomain): Promise<TDomain> {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: TMongoEntity): TDomain {
    console.log(e);
    throw new Error("Method not implemented.");
  }
  findById(id: ID): Promise<TDomain> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  findAll(request: SearchRequest): Promise<FindAllOutput<TDomain>> {
    console.log(request);
    throw new Error("Method not implemented.");
  }
  exist(id: ID): Promise<boolean> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  create(e: TDomain): Promise<TDomain> {
    console.log(e);
    throw new Error("Method not implemented.");
  }
  delete(id: ID): void {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  domainToEntity(d: TDomain): TMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
}
