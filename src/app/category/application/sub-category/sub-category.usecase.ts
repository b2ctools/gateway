import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import {
  SearchSubCategoriesOutput,
  SearchSubCategoryRequest,
} from "./sub-category.request";
import { sanitazeSearchQueryParams } from "../../../shared/base.request";
import {
  categoryToDto,
  sortable,
} from "../../domain/category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class SubCategoriesUseCase {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}
  async execute(
    request: SearchSubCategoryRequest,
  ): Promise<SearchSubCategoriesOutput> {
    const categories = await this.pcService.categoriesFromParent(
      sanitazeSearchQueryParams<SearchSubCategoryRequest>(
        request,
        sortable,
      ),
    );

    const data = categories.map((pc) => {
      // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
      return categoryToDto(pc, null);
    });
    return {
      data,
      count: data.length,
      sortable,
    };
  }
}
