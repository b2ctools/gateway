import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { productCategoryToDto } from "../../domain/product-category.interface";

@Injectable()
export class MoveProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute({ id, parent }: { id: ID; parent?: ID }) {
    const pc = await this.pcService.updateProductCategory({ id, parent });
    const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return productCategoryToDto(pc, tenantRef);
  }
}
