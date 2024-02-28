import { MiddlewareConsumer, Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { HeaderCheckMiddleware } from "./auth/domain/middleware/header-check.middleware";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "./store/store.module";
import { excludeRoutes } from "./shared/routes";
import { ProductCategoryModule } from "./product-category/product-category.module";
import { BrandModule } from "./brand/brand.module";
import { CountryModule } from "./country/country.module";
import { SampleModule } from "./sample/sample.module";
import { InitService } from "./init";
import { AccountModule } from "./account/account.module";
import { ClientModule } from "./client/client.module";
import { TenantModule } from "./tenant/tenant.module";
import { PlanModule } from "./plan/plan.module";
import { ResourceModule } from "./resource/resource.module";
import { PermissionModule } from "./permission/permission.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    StoreModule,
    ProductCategoryModule,
    BrandModule,
    CountryModule,
    SampleModule,
    AccountModule,
    ClientModule,
    TenantModule,
    PlanModule,
    ResourceModule,
    PermissionModule,
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
