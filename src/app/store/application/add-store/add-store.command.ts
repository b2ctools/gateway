import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Store } from "../../domain/store.interface";
import { AddStoreRequest } from "./add-store.request";

export class AddStoreCommand implements Omit<Store, "id" | "tenantId">{
  name: string;
  description: string;
  address: string;
  logo: string;
  managedBy: ID;

  constructor(request: AddStoreRequest) {
    const { name, description, address, logo } = request;
    this.name = name;
    this.description = description;
    this.address = address;
    this.logo = logo;
    this.managedBy = undefined;
  }

}
