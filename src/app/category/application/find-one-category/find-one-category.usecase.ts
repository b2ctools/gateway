import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import {
  CategoryDTO,
  categoryToDto,
} from "../../domain/category.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class FindOneCategoryUsecase {
  constructor(
    @Inject(CategoryService)
    private readonly categoryService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<CategoryDTO> {
    const pc = await this.categoryService.findByIdOrFail(id);
    const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return categoryToDto(pc, tenantRef);
  }
}
