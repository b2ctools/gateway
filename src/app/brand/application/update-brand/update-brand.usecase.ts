import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { BrandService } from "../../domain/brand.service";
import { BrandDto, brandToDto } from "../../domain/brand.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";

@Injectable()
export class UpdateBrandUseCse {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute({
    id,
    name,
    description,
  }: {
    id: ID;
    name?: string;
    description?: string;
  }): Promise<BrandDto> {
    const brand = await this.brandService.updateBrand({
      id,
      name,
      description,
    });
    const tenantRef = this.tenantService.getTenantRef(brand.tenantId);
    return brandToDto(brand, tenantRef);
  }
}
