
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Client } from "../../domain/client.interface";

export class ClientMongoEntity extends MongoEntity implements Omit<Client, 'id'>{
    userId: ID;
    description?: string;
}
