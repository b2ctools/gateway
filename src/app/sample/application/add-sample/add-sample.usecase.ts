import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import { AddSampleCommand } from "./add-sample.command";
import { ProductCategoryService } from "../../../product-category/domain/product-category.service";
import { StoreService } from "../../../store/domain/store.service";
import { BrandService } from "../../../brand/domain/brand.service";
import { CountryService } from "../../../country/domain/country.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { SampleDto, sampleToDto } from "../../domain/sample.interface";

@Injectable()
export class AddSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly pcService: SampleService,

    @Inject(ProductCategoryService)
    private readonly productCategoryService: ProductCategoryService,

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
    await this.productCategoryService.findByIdOrFail(productCategoryId);
  }

  private async validateStoreId(storeId: ID) {
    await this.storeService.findByIdOrFail(storeId);
  }

  private async validateBrandId(brandId: ID) {
    await this.brandService.findByIdOrFail(brandId);
  }

  private async validateCountry(countryId: ID) {
    await this.countryService.findByIdOrFail(countryId);
  }

  async addSample(command: AddSampleCommand): Promise<SampleDto> {
    const { categoryId, storeId, brandId, countryId } = command;
    // validations
    await this.validteProductCategoryId(categoryId);
    await this.validateStoreId(storeId);
    await this.validateBrandId(brandId);
    await this.validateCountry(countryId);

    const sample = await this.pcService.addSample(command);
    const tenantRef = this.tenantService.getTenantRef(sample.tenantId);
    return sampleToDto(sample, tenantRef);
  }
}
