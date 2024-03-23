import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "./user/domain/user.service";
import { StoreService } from "./store/domain/store.service";
import { BrandService } from "./brand/domain/brand.service";
import { CountryService } from "./country/domain/country.service";
import { CategoryService } from "./category/domain/category.service";
import {
  getMockedBrandList,
  getMockedCountryList,
  getMockedPermissionList,
  getMockedPlansList,
  getMockedCategoryList,
  getMockedResourcesList,
  getMockedStoreList,
  getMockedUserList,
} from "./shared/mocks/mock";
import { AccountService } from "./account/domain/account.service";
import { Scope } from "./account/domain/account.interface";
import { TenantService } from "./tenant/domain/tenant.service";
import { ctxSrv } from "./shared/context.service";
import { PlanService } from "./plan/domain/plan.service";
import { ResourceService } from "./resource/domain/resource.service";
import { SampleService } from "./sample/domain/sample.service";
import { AddSampleCommand } from "./sample/application/add-sample/add-sample.command";
import { PermissionService } from "./permission/domain/permission.service";
import { AddAccountCommand } from "./account/application/add-account/add-account.command";
import { AddPlanCommand } from "./plan/application/add-plan/add-plan.command";
import { EqualFilter } from "./shared/filters-and-request/request-filters";
import { AddSubscriptionCommand } from "./subscription/application/add-subscription/add-subscription.command";
import { AddSubscriptionRequest } from "./subscription/application/add-subscription/add-subscription.request";
import { BillingCycle } from "./plan/domain/plan.interface";
import { AddSubscriptionUseCase } from "./subscription/application/add-subscription/add-subscription.usecase";

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

    @Inject(CategoryService)
    private readonly productCategoryService: CategoryService,

    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PlanService)
    private readonly planService: PlanService,

    @Inject(ResourceService)
    private readonly resourceService: ResourceService,

    @Inject(SampleService)
    private readonly sampleService: SampleService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService,

    @Inject(AddSubscriptionUseCase)
    private readonly addSubscriptionUseCase: AddSubscriptionUseCase,
  ) {}

  private async addSubscription() {
    const { data } = await this.tenantService.findAllTenants({
      filters: [new EqualFilter("name", "Leo")],
    });
    const tenant = data[0];
    const { data: plans } = await this.planService.findAllPlans({
      filters: [new EqualFilter("name", "Pro")],
    });
    const plan = plans[0];
    const request: AddSubscriptionRequest = {
      planId: plan.id,
      tenantId: tenant.id,
      billing: {
        cycle: BillingCycle.MONTHLY,
        price: 100,
      },
    };
    await this.addSubscriptionUseCase.execute(new AddSubscriptionCommand(request));
  }

  private async seedAccountsForLeo() {
    const user = await this.userService.findUserByEmail("leo@email.com");
    await this.accountService.addAccount(
      new AddAccountCommand({
        userId: user.id,
        scope: Scope.OWNER,
      }),
    );
  }

  private async seedAccountsForElmer() {
    const user = await this.userService.findUserByEmail("elmer@email.com");
    const { data: stores } = await this.soreService.findAllStores({ take: 2 });
    const { data: permissions } =
      await this.permissionService.findAllPermissions({});
    

    stores.forEach(async (store) => {
      const account = await this.accountService.addAccount(
        new AddAccountCommand({
          userId: user.id,
          storeId: store.id,
          scope: Scope.MANAGER,
        }),
      );
      this.accountService.setPermissions(account.id, [
        permissions[0].id,
        permissions[1].id,
      ]);
    });

  }

  private async setResourcesToPlan() {
    const plan = await this.planService.findPlanByName("Pro");
    const { data: resources } = await this.resourceService.findAllResources({});
    const resourcesIds = resources.map((r) => r.id);
    const request = {
      id: plan.id,
      resources: resourcesIds,
    };
    await this.planService.setResources(request);
  }

  private async seedSample() {
    const { data: stores } = await this.soreService.findAllStores({ take: 3 });
    const { data: brands } = await this.brandService.findAllBrands({ take: 3 });
    const { data: categories } =
      await this.productCategoryService.findAllCategories({ take: 3 });
    const { data: countries } = await this.countryService.findAllCountries({
      take: 3,
    });
    // const { data: users } = await this.userService.findAllUsers({ take: 3 });
    // const user = users[0];
    const store = stores[0];
    const brand = brands[0];
    const category = categories[0];
    const country = countries[0];
    const sample: AddSampleCommand = {
      name: "Pasta Perla",
      description: "Pasta dental cubana",
      images: [
        "https://www.sample.com/image1",
        "https://www.sample.com/image2",
      ],
      price: {
        current: 100,
      },
      stock: 100,
      unit: "Oz",
      weight: {
        gross: 100,
        net: 80,
      },
      categoryId: category.id,
      storeId: store.id,
      brandId: brand.id,
      countryId: country.id,
      hidden: false,
      locations: ["Managua"],
      tenantId: ctxSrv.getTenantId(),
    };
    await this.sampleService.addSample(sample);
  }

  

  async onApplicationBootstrap() {
    await Promise.all(
      getMockedUserList().map((user) => this.userService.registerUser(user)),
    );

    const userLeo = await this.userService.findUserByEmail("leo@email.com");
    const tenant = await this.tenantService.addTenant({
      name: "Leo",
      address: { address: "Managua" },
      logo: "https://www.sample.com/wp-content/uploads/2022/03/logo.png",
      primaryOwnerId: userLeo.id,
      state: "active",
    });
    ctxSrv.setTenantId(tenant.id);

    await Promise.all(
      getMockedStoreList().map((store) => this.soreService.addStore(store)),
    );
    await Promise.all(
      getMockedBrandList().map((brand) => this.brandService.addBrand(brand)),
    );
    await Promise.all(
      getMockedCountryList().map((country) =>
        this.countryService.addCountry(country),
      ),
    );

    await Promise.all(
      getMockedCategoryList().map((pc) =>
        this.productCategoryService.addCategory(pc),
      ),
    );

    await Promise.all(
      getMockedPlansList().map((plan) => this.planService.addPlan(new AddPlanCommand(plan))),
    );

    await Promise.all(
      getMockedResourcesList().map((resource) =>
        this.resourceService.addResource(resource),
      ),
    );

    await Promise.all(
      getMockedPermissionList().map((p) =>
        this.permissionService.addPermission(p),
      ),
    );

    await this.seedAccountsForElmer();
    await this.seedAccountsForLeo();
    await this.setResourcesToPlan();
    await this.seedSample();


    /** adding new tenant with store for testing pourpouses */
    // add another store for another tenant

    const tenant2 = await this.tenantService.addTenant({
      name: "Tito",
      address: { address: "Managua" },
      logo: "https://www.sample.com/wp-content/uploads/2022/03/logo.png",
      primaryOwnerId: null,
      state: "active",
    });
    ctxSrv.setTenantId(tenant2.id);

    await Promise.all(
      getMockedStoreList().map((store) => this.soreService.addStore(store)),
    );
    await Promise.all(
      getMockedCategoryList(1).map((pc) =>
        this.productCategoryService.addCategory(pc),
      ),
    );

    await this.addSubscription();
  }
}
