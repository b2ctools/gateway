import { TenantRef } from "../../tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import {
  ILocations,
  IPrice,
  ISampeImages,
  IUnit,
  IWeight,
} from "../application/common.request";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";

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
  tenantId: ID;
}

export interface SampleDto extends Sample {
  tenant?: TenantRef;
}

export const sampleToDto = (
  u: Sample,
  tenantRef: TenantRef = null,
): SampleDto => {
  // delete u.tenantId;
  return {
    ...u,
    ...(isAdmin() && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "description"];
