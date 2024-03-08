import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Store } from "../../domain/store.interface";
import { AddStoreRequest } from "./add-store.request";
import { ctxSrv } from "src/app/shared/context.service";

export class AddStoreCommand implements Omit<Store, "id">{
  name: string;
  description: string;
  address: string;
  logo: string;
  managedBy: ID;
  tenantId: ID;

  constructor(request: AddStoreRequest) {
    const { name, description, address, logo, tenantId } = request;
    this.name = name;
    this.description = description;
    this.address = address;
    this.logo = logo;
    this.managedBy = undefined;

    this.tenantId = ctxSrv.getUserRole() === "ADMIN" ? tenantId : ctxSrv.getTenantId();
  }

}
