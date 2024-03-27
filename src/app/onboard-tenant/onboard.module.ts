import { Module, forwardRef } from "@nestjs/common";
import { OnboardTenantController } from "./application/onboard-tenant/onboard-tenant.controller";
import { OnboardTenantUseCase } from "./application/onboard-tenant/onboard-tenant.usecase";
import { TenantModule } from "../tenant/tenant.module";
import { AccountModule } from "../account/account.module";
import { UserModule } from "../user/user.module";
import { SubscriptionModule } from "../subscription/subscription.module";
import { AddressModule } from "../address/address.module";
import { PlanModule } from "../plan/plan.module";

@Module({
  imports: [
    forwardRef(() => TenantModule),
    forwardRef(() => AccountModule),
    forwardRef(() => UserModule),
    forwardRef(() => SubscriptionModule),
    forwardRef(() => AddressModule),
    forwardRef(() => PlanModule),
  ],
  controllers: [OnboardTenantController],
  providers: [OnboardTenantUseCase],
  exports: [OnboardTenantUseCase],
})
export class OnboardTenantModule {}
