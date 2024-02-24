import { TenantRef } from "src/app/tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import {
  ILocations,
  IPrice,
  ISampeImages,
  IUnit,
  IWeight,
} from "../application/common.request";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";

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

export interface SampleDto extends Sample {
  tenant?: TenantRef;
}

export const sampleToDto = (
  u: Sample,
  tenantRef: TenantRef = null,
): SampleDto => {
  const role = ctxSrv.getUserRole();
  delete u.tenantId;
  return {
    ...u,
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "description"];
