import { Inject, Injectable } from '@nestjs/common';
import { Roles } from './auth/domain/middleware/roles.decorator';
import { UserRole } from './user/domain/user.interface';
import { UserService } from './user/domain/user.service';
import { getMockedBrandList, getMockedCountryList, getMockedProductCategoryList, getMockedStoreList, getMockedUserList } from './shared/mocks/mock';
import { StoreService } from './store/domain/store.service';
import { BrandService } from './brand/domain/brand.service';
import { CountryService } from './country/domain/country.service';
import { ProductCategoryService } from './product-category/domain/product-category.service';

@Injectable()
export class AppService {

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
  ){}

  @Roles([UserRole.ADMIN, UserRole.OWNER])
  getData(): { message: string } {
    const message = 'Welcome to Platform CU Backend System!';
    console.log(message);
    return { message };
  }

  onApplicationBootstrap(){
    getMockedUserList().map((user) => this.userService.registerUser(user));
    getMockedStoreList().map((store) => this.soreService.addStore(store));
    getMockedBrandList().map((brand) => this.brandService.addBrand(brand));
    getMockedCountryList().map((country) => this.countryService.addCountry(country));
    getMockedProductCategoryList().map((pc) => this.productCategoryService.addProductCategory(pc));
  }
}