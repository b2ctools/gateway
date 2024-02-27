import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import {
  SearchSubProductCategoriesOutput,
  SearchSubProductCategoryRequest,
} from "./sub-product-categories.request";
import { sanitazeSearchQueryParams } from "../../../shared/base.request";
import {
  productCategoryToDto,
  sortable,
} from "../../domain/product-category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class SubProductCategoriesUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}
  async execute(
    request: SearchSubProductCategoryRequest,
  ): Promise<SearchSubProductCategoriesOutput> {
    const categories = await this.pcService.productCategoriesFromParent(
      sanitazeSearchQueryParams<SearchSubProductCategoryRequest>(
        request,
        sortable,
      ),
    );

    const data = categories.map((pc) => {
      // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
      return productCategoryToDto(pc, null);
    });
    return {
      data,
      count: data.length,
      sortable,
    };
  }
}
