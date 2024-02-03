import { Module, forwardRef } from '@nestjs/common';
import { getUserRepo } from './infrastructure/user.repo-provider';
import { UserService } from './domain/user.service';
import { RegisterUserUseCase } from './application/register-user/register-user.usecase';
import { RegisterUserController } from './application/register-user/register-user.controller';
import { SearchUsersController } from './application/search-users/search-user.controller';
import { SearchUsersUseCase } from './application/search-users/search-user.usecase';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { RecoveryPasswordService } from './domain/recovery-password.service';
import { SendRecoveryTokenUseCase } from './application/send-recovery-token/send-recovery-token.usecase';
import { SendRecoveryTokenController } from './application/send-recovery-token/send-recovery-token.controller';
import { RecoverPasswordController } from './application/recover-password/recover-password.controller';
import { RecoverPasswordUseCase } from './application/recover-password/recover-password.usecase';
@Module({
  imports: [
    NotificationModule,
    forwardRef(() => AuthModule),

  ],
  controllers: [RegisterUserController, SearchUsersController, SendRecoveryTokenController, RecoverPasswordController],
  providers: [RegisterUserUseCase, SearchUsersUseCase, UserService, getUserRepo(), RecoveryPasswordService, SendRecoveryTokenUseCase, RecoverPasswordUseCase],
  exports: [UserService, RecoveryPasswordService],
})
export class UserModule {}
