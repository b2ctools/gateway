import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Sample } from "../../domain/sample.interface";
import { ILocations, IPrice, IUnit, IWeight } from "../common.request";
import { AddSampleRequest } from "./add-sample.request";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";
import { ctxSrv } from "src/app/shared/context.service";

export class AddSampleCommand implements Omit<Sample, "id"> {
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
  tenantId: ID;

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
      tenantId,
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
    this.tenantId = isAdmin() ? tenantId : ctxSrv.getTenantId();
  }
}
