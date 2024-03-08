import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import {
  SearchCategoryOutput,
  SearchCategoryRequest,
} from "./search-category.request";
import { sanitazeSearchQueryParams, setTenantOnRequest } from "../../../shared/base.request";
import {
  categoryToDto,
  sortable,
} from "../../domain/category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class SearchCategoryUseCase {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(
    request: SearchCategoryRequest,
  ): Promise<SearchCategoryOutput> {

    const { request: requestToSanitize, sortable: fieldsToFilter } = setTenantOnRequest(sortable, request);


    const { count, data: pcs } = await this.pcService.findAllCategories(
      sanitazeSearchQueryParams<SearchCategoryRequest>(
        requestToSanitize,
        fieldsToFilter,
      ),
    );
    const data = pcs.map((pc) => {
      const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
      return categoryToDto(pc, tenantRef);
    });
    return {
      data,
      count,
      sortable,
    };
  }
}
