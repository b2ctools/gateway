import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { AddStoreCommand } from "./add-store.command";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { StoreDto, storeToDto } from "../../domain/store.interface";

@Injectable()
export class AddStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly StoreService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService
  ) {}

  private async validateTenantId(tenantId: ID) {
    await this.tenantService.findByIdOrFail(tenantId);
  }

  async execute(command: AddStoreCommand): Promise<StoreDto> {
    await this.validateTenantId(command.tenantId);
    
    const store = await this.StoreService.addStore(command);
    const tenantRef = this.tenantService.getTenantRef(store.tenantId);
    return storeToDto(store, tenantRef);
  }
}
