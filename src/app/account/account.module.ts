import { Module, forwardRef } from "@nestjs/common";
import { getAccountRepo } from "./infrastructure/account.repo-provider";
import { AddAccountController } from "./application/add-account/add-account.controller";
import { AddAccountUseCase } from "./application/add-account/add-account.usecase";
import { AccountService } from "./domain/account.service";
import { SearchAccountController } from "./application/search-account/search-account.controller";
import { SearchAccountUseCase } from "./application/search-account/search-account.usecase";
import { RemoveAccountController } from "./application/remove-account/remove-account.controller";
import { RemoveAccountUseCase } from "./application/remove-account/remove-account.usecase";
import { StoreModule } from "../store/store.module";
import { SetPermissionsController } from "./application/set-permissions/set-permissions.controller";
import { SetPermissionsUseCase } from "./application/set-permissions/set-permissions.usecase";
import { UserModule } from "../user/user.module";
import { FindOneAccountController } from "./application/find-one-account/find-one-account.controller";
import { FindOneAccountUsecase } from "./application/find-one-account/find-one-account.usecase";
import { AuthModule } from "../auth/auth.module";
import { TenantModule } from "../tenant/tenant.module";
import { PermissionModule } from "../permission/permission.module";

@Module({
  imports: [
    forwardRef(() => StoreModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TenantModule,
    PermissionModule,
  ],
  controllers: [
    AddAccountController,
    SearchAccountController,
    RemoveAccountController,
    SetPermissionsController,
    FindOneAccountController,
  ],
  providers: [
    AddAccountUseCase,
    SearchAccountUseCase,
    RemoveAccountUseCase,
    AccountService,
    getAccountRepo(),
    SetPermissionsUseCase,
    FindOneAccountUsecase,
  ],
  exports: [AccountService, AddAccountUseCase],
})
export class AccountModule {}
