import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import {
  SearchOutput,
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/filters-and-request/base.request";
import { BrandDto, brandToDto, sortable } from "../../domain/brand.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class SearchBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(request: SearchRequest): Promise<SearchOutput<BrandDto>> {
    const { count, data } = await this.brandService.findAllBrands(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );

    const brands = data.map((b) => {
      // const tenantRef = this.tenantService.getTenantRef(b.tenantId);
      return brandToDto(b, null);
    });
    return {
      count,
      data: brands,
      sortable,
    };
  }
}
