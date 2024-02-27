import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { productCategoryToDto } from "../../domain/product-category.interface";
import { UpdateProductCategoryRequest } from "./update-product-category.request";

@Injectable()
export class UpdateProductCategoryUseCse {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(request: UpdateProductCategoryRequest) {
    const pc = await this.pcService.updateProductCategory(request);
    const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return productCategoryToDto(pc, tenantRef);
  }
}
