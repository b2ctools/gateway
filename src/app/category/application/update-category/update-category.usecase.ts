import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { categoryToDto } from "../../domain/category.interface";
import { UpdateCategoryRequest } from "./update-category.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateCategoryUseCse {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID, request: UpdateCategoryRequest) {
    const { name, description } = request;
    const pc = await this.pcService.updateCategory({
      id,
      name,
      description,
    });
    // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return categoryToDto(pc, null);
  }
}
