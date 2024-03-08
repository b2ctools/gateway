import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
  setTenantOnRequest,
} from "../../../shared/base.request";
import { StoreDto, sortable, storeToDto } from "../../domain/store.interface";
import { FindAllOutput } from "src/app/shared/abstract-repository/repository.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";

@Injectable()
export class SearchStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly StoreService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(request: SearchRequest): Promise<FindAllOutput<StoreDto>> {

    const { request: requestToSanitize, sortable: fieldsToFilter } = setTenantOnRequest(sortable, request);
    const { count, data: stores } = await this.StoreService.findAllStores(
      sanitazeSearchQueryParams<SearchRequest>(requestToSanitize, fieldsToFilter),
    );

    return {
      count,
      data: stores.map((s) => {
        const tenantRef = this.tenantService.getTenantRef(s.tenantId);
        return storeToDto(s, tenantRef);
      })
    }
  }
}
