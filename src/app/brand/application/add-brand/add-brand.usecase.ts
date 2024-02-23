import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import { AddBrandCommand } from "./add-brand.command";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { BrandDto, brandToDto } from "../../domain/brand.interface";

@Injectable()
export class AddBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(command: AddBrandCommand): Promise<BrandDto> {
    const brand = await this.brandService.addBrand(command);
    const tenantRef = this.tenantService.getTenantRef(brand.tenantId);
    return brandToDto(brand, tenantRef);
  }
}
