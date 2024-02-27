import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { AddProductCategoryCommand } from "./add-product-category.command";

import { productCategoryToDto } from "../../domain/product-category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class AddProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async addProductCategory(command: AddProductCategoryCommand) {
    const pc = await this.pcService.addProductCategory(command);
    // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return productCategoryToDto(pc, null);
  }

  async loadFromJson(json: string) {
    return await this.pcService.insertCategoriesFromJson(json);
  }
}
