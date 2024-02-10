import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user/domain/user.service';
import { StoreService } from './store/domain/store.service';
import { BrandService } from './brand/domain/brand.service';
import { CountryService } from './country/domain/country.service';
import { ProductCategoryService } from './product-category/domain/product-category.service';
import { getMockedBrandList, getMockedCountryList, getMockedProductCategoryList, getMockedStoreList, getMockedUserList } from './shared/mocks/mock';

@Injectable()
export class InitService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(StoreService)
    private readonly soreService: StoreService,
    
    @Inject(BrandService)
    private readonly brandService: BrandService,

    @Inject(CountryService)
    private readonly countryService: CountryService,

    @Inject(ProductCategoryService)
    private readonly productCategoryService: ProductCategoryService
  ) {}

  onApplicationBootstrap() {
    getMockedUserList().map((user) => this.userService.registerUser(user));
    getMockedStoreList().map((store) => this.soreService.addStore(store));
    getMockedBrandList().map((brand) => this.brandService.addBrand(brand));
    getMockedCountryList().map((country) =>
      this.countryService.addCountry(country)
    );
    getMockedProductCategoryList().map((pc) =>
      this.productCategoryService.addProductCategory(pc)
    );
  }
}
