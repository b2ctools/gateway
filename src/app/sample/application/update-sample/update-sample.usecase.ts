import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import { UpdateSampleRequest } from "./update-sample.request";
import { CategoryService } from "../../../category/domain/category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { StoreService } from "../../../store/domain/store.service";
import { BrandService } from "../../../brand/domain/brand.service";
import { CountryService } from "../../../country/domain/country.service";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { SampleDto, sampleToDto } from "../../domain/sample.interface";

@Injectable()
export class UpdateSampleUseCse {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,

    @Inject(CategoryService)
    private readonly productCategoryService: CategoryService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(CountryService)
    private readonly countryService: CountryService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  private async validteProductCategoryId(productCategoryId: ID) {
    if (!productCategoryId) return;
    await this.productCategoryService.findByIdOrFail(productCategoryId);
  }

  private async validateStoreId(storeId: ID) {
    if (!storeId) return;
    await this.storeService.findByIdOrFail(storeId);
  }

  private async validateBrandId(brandId: ID) {
    if (!brandId) return;
    await this.brandService.findByIdOrFail(brandId);
  }

  private async validateCountry(countryId: ID) {
    if (!countryId) return;
    await this.countryService.findByIdOrFail(countryId);
  }

  async execute(id: ID, request: UpdateSampleRequest): Promise<SampleDto> {
    const { categoryId, storeId, brandId, countryId } = request;
    // validations
    await this.validteProductCategoryId(categoryId);
    await this.validateStoreId(storeId);
    await this.validateBrandId(brandId);
    await this.validateCountry(countryId);

    const sample = await this.sampleService.updateSample(id, request);
    // const tenantRef = this.tenantService.getTenantRef(sample.tenantId);
    return sampleToDto(sample, null);
  }
}
