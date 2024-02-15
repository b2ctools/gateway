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

@Module({
  imports: [StoreModule, forwardRef(() => UserModule)],
  controllers: [
    AddAccountController,
    SearchAccountController,
    RemoveAccountController,
    SetPermissionsController,
  ],
  providers: [
    AddAccountUseCase,
    SearchAccountUseCase,
    RemoveAccountUseCase,
    AccountService,
    getAccountRepo(),
    SetPermissionsUseCase,
  ],
  exports: [AccountService],
})
export class AccountModule {}
