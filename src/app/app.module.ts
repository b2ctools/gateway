import { MiddlewareConsumer, Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { HeaderCheckMiddleware } from "./auth/domain/middleware/header-check.middleware";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "./store/store.module";
import { excludeRoutes } from "./shared/routes";
import { CategoryModule } from "./category/category.module";
import { BrandModule } from "./brand/brand.module";
import { CountryModule } from "./country/country.module";
import { SampleModule } from "./sample/sample.module";
import { InitService } from "./init";
import { AccountModule } from "./account/account.module";
import { CustomerModule } from "./customer/customer.module";
import { TenantModule } from "./tenant/tenant.module";
import { PlanModule } from "./plan/plan.module";
import { ResourceModule } from "./resource/resource.module";
import { PermissionModule } from "./permission/permission.module";
import { SubscriptionModule } from "./subscription/subscription.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    StoreModule,
    CategoryModule,
    BrandModule,
    CountryModule,
    SampleModule,
    AccountModule,
    CustomerModule,
    TenantModule,
    PlanModule,
    ResourceModule,
    PermissionModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderCheckMiddleware)
      .exclude(...excludeRoutes)
      .forRoutes("*");
  }
}
