import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Sample } from "../../domain/sample.interface";
import { ILocations, IPrice, IUnit, IWeight } from "../common.request";
import { AddSampleRequest } from "./add-sample.request";

export class AddSampleCommand implements Omit<Sample, "id" | "tenantId"> {
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

  constructor(request: AddSampleRequest) {
    const {
      name,
      description,
      images,
      price,
      stock,
      unit,
      weight,
      categoryId,
      storeId,
      brandId,
      countryId,
      locations,
    } = request;
    this.name = name;
    this.description = description;
    this.images = images || [];

    const { previous } = price;
    this.price = { ...price, previous: previous || 0 };

    this.stock = stock;
    this.unit = unit;
    this.weight = weight;
    this.categoryId = categoryId;
    this.storeId = storeId;
    this.brandId = brandId;
    this.countryId = countryId;
    this.hidden = false;
    this.locations = locations;
  }
}
