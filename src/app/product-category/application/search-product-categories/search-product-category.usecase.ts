import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { SearchProductCategoryOutput, SearchProductCategoryRequest } from "./search-product-category.request";
import { sanitazeSearchQueryParams } from "../../../shared/base.request";
import { productCategoryToDto, sortable } from "../../domain/product-category.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";

@Injectable()
export class SearchProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(request: SearchProductCategoryRequest): Promise<SearchProductCategoryOutput> {
    const { count, data: pcs } = await this.pcService.findAllProductCategories(
      sanitazeSearchQueryParams<SearchProductCategoryRequest>(
        request,
        sortable,
      ),
    );
    const data = pcs.map((pc) => {
      const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
      return productCategoryToDto(pc, tenantRef);
    });
    return {
      data,
      count,
      sortable,
    };
  }
}
