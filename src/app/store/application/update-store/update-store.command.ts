import { Injectable } from "@nestjs/common";
import { UpdateStoreRequest } from "./update-store.request";
import { Store, StoreAddress } from "../../domain/store.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateStoreCommand implements Omit<Store, "id" | "tenantId">{
  name: string;
  description: string;
  address: StoreAddress;
  logo: string;
  managedBy: ID;

  constructor(request: UpdateStoreRequest) {
    const { name, description, address, logo, managedBy } = request;
    this.name = name;
    this.description = description;
    this.address = address;
    this.logo = logo;
    this.managedBy = managedBy;
  }
}
