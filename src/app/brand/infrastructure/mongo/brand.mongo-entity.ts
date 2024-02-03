
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Brand } from "../../domain/brand.interface";

export class BrandMongoEntity extends MongoEntity implements Omit<Brand, 'id'>{
    name: string;
    description?: string;
}
