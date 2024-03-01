import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { categoryToDto } from "../../domain/category.interface";

@Injectable()
export class MoveCategoryUseCase {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute({ id, parent }: { id: ID; parent?: ID }) {
    const pc = await this.pcService.updateCategory({ id, parent });
    // const tenantRef = this.tenantService.getTenantRef(pc.tenantId);
    return categoryToDto(pc, null);
  }
}
