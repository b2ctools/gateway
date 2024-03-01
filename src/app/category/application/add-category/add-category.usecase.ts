import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import { AddCategoryCommand } from "./add-category.command";

import { categoryToDto } from "../../domain/category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class AddCategoryUseCase {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async addCategory(command: AddCategoryCommand) {
    const pc = await this.pcService.addCategory(command);
    // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return categoryToDto(pc, null);
  }

  async loadFromJson(json: string) {
    return await this.pcService.insertCategoriesFromJson(json);
  }
}
