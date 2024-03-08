import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { StoreDto, storeToDto } from "../../domain/store.interface";

@Injectable()
export class FindOneStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<StoreDto> {
    const store = await this.storeService.findByIdOrFail(id);
    const tenantRef = this.tenantService.getTenantRef(store.tenantId);
    return storeToDto(store, tenantRef);
  }
}
