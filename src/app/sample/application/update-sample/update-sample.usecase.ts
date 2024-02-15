import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import { UpdateSampleRequest } from "./update-sample.request";
import { ProductCategoryService } from "../../../product-category/domain/product-category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { StoreService } from "../../../store/domain/store.service";
import { BrandService } from "../../../brand/domain/brand.service";
import { CountryService } from "../../../country/domain/country.service";

@Injectable()
export class UpdateSampleUseCse {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,

    @Inject(ProductCategoryService)
    private readonly productCategoryService: ProductCategoryService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(CountryService)
    private readonly countryService: CountryService,
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

  async execute(request: UpdateSampleRequest) {
    const { categoryId, storeId, brandId, countryId } = request;
    // validations
    await this.validteProductCategoryId(categoryId);
    await this.validateStoreId(storeId);
    await this.validateBrandId(brandId);
    await this.validateCountry(countryId);

    return await this.sampleService.updateSample(request);
  }
}
