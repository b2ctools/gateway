import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import {
  ILocations,
  IPrice,
  IUnit,
  IWeight,
} from "../../application/common.request";
import { Sample } from "../../domain/sample.interface";

export class SampleMongoEntity
  extends MongoEntity
  implements Omit<Sample, "id">
{
  name: string;
  description?: string;
  images: string[];
  price: IPrice;
  stock: number;
  unit: IUnit;
  weight: IWeight;
  categoryId: ID;
  storeId: ID;
  brandId: ID;
  countryId: ID;
  hidden: boolean;
  locations: ILocations;
}
