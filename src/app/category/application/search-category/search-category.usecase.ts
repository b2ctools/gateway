import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import {
  SearchCategoryOutput,
  SearchCategoryRequest,
} from "./search-category.request";
import { sanitazeSearchQueryParams } from "../../../shared/base.request";
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
    const { count, data: pcs } = await this.pcService.findAllCategories(
      sanitazeSearchQueryParams<SearchCategoryRequest>(
        request,
        sortable,
      ),
    );
    const data = pcs.map((pc) => {
      // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
      return categoryToDto(pc, null);
    });
    return {
      data,
      count,
      sortable,
    };
  }
}
