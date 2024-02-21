import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "./user/domain/user.service";
import { StoreService } from "./store/domain/store.service";
import { BrandService } from "./brand/domain/brand.service";
import { CountryService } from "./country/domain/country.service";
import { ProductCategoryService } from "./product-category/domain/product-category.service";
import {
  getMockedBrandList,
  getMockedCountryList,
  getMockedProductCategoryList,
  getMockedStoreList,
  getMockedUserList,
} from "./shared/mocks/mock";
import { AccountService } from "./account/domain/account.service";
import { getPermissionsList } from "./access/domain/permissions";
import { Scope } from "./account/domain/account.interface";

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
    private readonly productCategoryService: ProductCategoryService,

    @Inject(AccountService)
    private readonly accountService: AccountService
  ) {}

  private async seedAccountsForElmer() {
    const user = await this.userService.findUserByEmail("elmer@email.com");
    const { data: stores } = await this.soreService.findAllStores({ take: 3 });
    const permissions = getPermissionsList();
    stores.map((store) => {
      this.accountService
        .addAccount({
          userId: user.id,
          storeId: store.id,
          scope: Scope.STORE_ADMIN,
        })
        .then((account) => {
          this.accountService.setPermissions(account.id, [
            permissions[0],
            permissions[1],
            permissions[2],
            permissions[3],
          ]);
        });
    });
  }

  async onApplicationBootstrap() {
    await Promise.all(
      getMockedUserList().map((user) => this.userService.registerUser(user))
    );
    await Promise.all(
      getMockedStoreList().map((store) => this.soreService.addStore(store))
    );
    await Promise.all(
      getMockedBrandList().map((brand) => this.brandService.addBrand(brand))
    );
    await Promise.all(
      getMockedCountryList().map((country) =>
        this.countryService.addCountry(country)
      )
    );

    await Promise.all(
      getMockedProductCategoryList().map((pc) =>
        this.productCategoryService.addProductCategory(pc)
      )
    );

    await this.seedAccountsForElmer();
  }
}
