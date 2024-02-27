import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import {
  ProductCategoryDTO,
  productCategoryToDto,
} from "../../domain/product-category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class FindOneProductCategoryUsecase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly productCategoryService: ProductCategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<ProductCategoryDTO> {
    const pc = await this.productCategoryService.findByIdOrFail(id);
    const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return productCategoryToDto(pc, tenantRef);
  }
}
