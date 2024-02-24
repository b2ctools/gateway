import { Module, forwardRef } from "@nestjs/common";
import { getUserRepo } from "./infrastructure/user.repo-provider";
import { UserService } from "./domain/user.service";
import { RegisterUserUseCase } from "./application/register-user/register-user.usecase";
import { RegisterUserController } from "./application/register-user/register-user.controller";
import { SearchUsersController } from "./application/search-users/search-user.controller";
import { SearchUsersUseCase } from "./application/search-users/search-user.usecase";
import { AuthModule } from "../auth/auth.module";
import { NotificationModule } from "../notification/notification.module";
import { RecoveryPasswordService } from "./domain/recovery-password.service";
import { SendRecoveryTokenUseCase } from "./application/send-recovery-token/send-recovery-token.usecase";
import { SendRecoveryTokenController } from "./application/send-recovery-token/send-recovery-token.controller";
import { RecoverPasswordController } from "./application/recover-password/recover-password.controller";
import { RecoverPasswordUseCase } from "./application/recover-password/recover-password.usecase";
import { CountryModule } from "../country/country.module";
import { MeController } from "./application/me/me.controller";
import { UpdateUserController } from "./application/update-user/update-user.controller";
import { UpdateUserUseCase } from "./application/update-user/update-user.usecase";
import { RemoveUserController } from "./application/remove-user/remove-user.controller";
import { RemoveSampleUseCase } from "./application/remove-user/remove-user.usecase";
import { TenantModule } from "../tenant/tenant.module";
@Module({
  imports: [
    NotificationModule,
    forwardRef(() => AuthModule),
    CountryModule,
    TenantModule,
  ],
  controllers: [
    RegisterUserController,
    SearchUsersController,
    SendRecoveryTokenController,
    RecoverPasswordController,
    MeController,
    UpdateUserController,
    RemoveUserController,
  ],
  providers: [
    RegisterUserUseCase,
    SearchUsersUseCase,
    UserService,
    getUserRepo(),
    RecoveryPasswordService,
    SendRecoveryTokenUseCase,
    RecoverPasswordUseCase,
    UpdateUserUseCase,
    RemoveSampleUseCase,
  ],
  exports: [UserService, RecoveryPasswordService],
})
export class UserModule {}
