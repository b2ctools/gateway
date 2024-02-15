import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import {
  ILocations,
  IPrice,
  ISampeImages,
  IUnit,
  IWeight,
} from "../application/common.request";

export interface Sample extends IDomain {
  name: string;
  description?: string;
  images: ISampeImages;
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

export interface SampleDto extends Sample {}

export const sampleToDto = (u: Sample): SampleDto => ({ ...u });

export const sortable = ["name", "description"];
