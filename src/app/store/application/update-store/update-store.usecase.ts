import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { UpdateStoreCommand } from "./update-store.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { storeToDto } from "../../domain/store.interface";

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID, command: UpdateStoreCommand) {
    const store = await this.storeService.updateStore(id, command);
    const tenantRef = this.tenantService.getTenantRef(store.tenantId);
    
    return storeToDto(store, tenantRef);
  }
}
