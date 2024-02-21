import { SearchRequest } from "../base.request";

export type ID = string | number;

export interface FindAllOutput<domainE> {
  count: number;
  data: domainE[];
}

/** Interface to represent all the repositories of the project  */
export interface AppRepository<databaseE, domainE> {
  findById(id: ID): Promise<domainE>;

  getEntityId(id: ID): Promise<databaseE>;

  findAll(request: SearchRequest): Promise<FindAllOutput<domainE>>;

  exist(id: ID): Promise<boolean>;

  create(d: domainE): Promise<domainE>;

  persist(d: domainE): Promise<domainE>;

  delete(id: ID): void;

  domainToEntity(d: domainE): databaseE;

  entityToDomain(e: databaseE): domainE;
}
