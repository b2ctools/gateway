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
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    StoreModule,
    ProductCategoryModule,
    BrandModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderCheckMiddleware)
      .exclude(...excludeRoutes)
      .forRoutes("*");
  }
}
