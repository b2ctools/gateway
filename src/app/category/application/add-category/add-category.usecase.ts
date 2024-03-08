import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import { AddCategoryCommand } from "./add-category.command";

import { categoryToDto } from "../../domain/category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";
import { ctxSrv } from "src/app/shared/context.service";

@Injectable()
export class AddCategoryUseCase {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  private async validateTenantId(tenantId: ID) {
    await this.tenantService.findByIdOrFail(tenantId);
  }

  async addCategory(command: AddCategoryCommand) {
    await this.validateTenantId(command.tenantId);
    const pc = await this.pcService.addCategory(command);
    const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return categoryToDto(pc, tenantRef);
  }

  async loadFromJson(json: string, tenantId: ID) {
    const tenant = isAdmin() ? tenantId : ctxSrv.getTenantId();
    await this.validateTenantId(tenant);
    return await this.pcService.insertCategoriesFromJson(json, tenantId);
  }
}
