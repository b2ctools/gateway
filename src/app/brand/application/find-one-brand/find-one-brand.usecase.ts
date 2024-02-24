import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import { Brand, brandToDto } from "../../domain/brand.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";

@Injectable()
export class FindOneBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<Brand> {
    const brand = await this.brandService.findByIdOrFail(id);
    const tenantRef = this.tenantService.getTenantRef(brand.tenantId);
    return brandToDto(brand, tenantRef);
  }
}
