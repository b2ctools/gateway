import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { BrandService } from "../../domain/brand.service";
import { BrandDto, brandToDto } from "../../domain/brand.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { UpdateBrandRequest } from "./update-brand.request";

@Injectable()
export class UpdateBrandUseCse {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID, request: UpdateBrandRequest): Promise<BrandDto> {
    const brand = await this.brandService.updateBrand(id, request);
    // const tenantRef = this.tenantService.getTenantRef(brand.tenantId);
    return brandToDto(brand, null);
  }
}
