import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { AddAccountUseCase } from "src/app/account/application/add-account/add-account.usecase";
import { AddSubscriptionUseCase } from "src/app/subscription/application/add-subscription/add-subscription.usecase";
import { AddTenantUseCase } from "src/app/tenant/application/add-tenant/add-tenant.usecase";
import { RegisterUserUseCase } from "src/app/user/application/register-user/register-user.usecase";
import { OnboardTenantRequest } from "./onboard-tenant.request";
import {
  OnboardOwnerAccountCommand,
  OnboardSubscriptionCommand,
  OnboardTenantCommand,
  OnboardUserCommand,
} from "./onboard-tenant.commands";
import { PlanService } from "src/app/plan/domain/plan.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Billing, BillingCycle } from "src/app/plan/domain/plan.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { UserService } from "src/app/user/domain/user.service";
import { AccountService } from "src/app/account/domain/account.service";
import { SubscriptionBillingRequest } from "src/app/subscription/application/add-subscription/add-subscription.request";

@Injectable()
export class OnboardTenantUseCase {
  private _tenantId: ID;
  private _userId: ID;
  private _accountId: ID;

  private errors: string[] = [];

  constructor(
    @Inject(forwardRef(() => AddTenantUseCase))
    private readonly addTenant: AddTenantUseCase,

    @Inject(forwardRef(() => TenantService))
    private readonly tenantService: TenantService,

    //-------------------------

    @Inject(forwardRef(() => RegisterUserUseCase))
    private readonly registerUser: RegisterUserUseCase,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    //-------------------------

    @Inject(forwardRef(() => AddAccountUseCase))
    private readonly addAccount: AddAccountUseCase,

    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,

    //-------------------------

    @Inject(forwardRef(() => AddSubscriptionUseCase))
    private readonly addSubscription: AddSubscriptionUseCase,

    @Inject(forwardRef(() => PlanService))
    private readonly planService: PlanService
  ) {}

  private async getPlanAndBillingInfo(
    planId: ID,
    cycle: BillingCycle
  ): Promise<Billing> {
    const plan = await this.planService.findByIdOrFail(planId);
    const billing = plan.billing.find((b) => b.cycle === cycle);
    if (!billing) {
      throw new Error("Plan does not have the selected billing cycle");
    }
    return billing;
  }

  private checkErrors() {
    if (this.errors.length > 0) {
      throw new BadRequestException(this.errors.join("\n"));
    }
  }

  /** ROLLBACKS */
  private async rollbackTenant() {
    await this.tenantService.removeTenant(this._tenantId);
  }

  private async rollbackUser() {
    await this.userService.removeUser_id(this._userId);
  }

  private async rollbackAccount() {
    await this.accountService.removeAccount(this._accountId);
  }

  /** ONBOARDINGS */
  private async onboardTenant(request: OnboardTenantRequest) {
    try {
      const tenant = await this.addTenant.execute(
        OnboardTenantCommand.build(request)
      );
      this._tenantId = tenant.id;
      return tenant;
    } catch (error) {
      const message = `Error onboarding tenant: ${error}`;
      console.error(message);
      this.errors.push(message);
    }
  }

  private async onboardUser(request: OnboardTenantRequest) {
    try {
      const user = await this.registerUser.execute(
        OnboardUserCommand.build(request)
      );
      this._userId = user.id;
      return user;
    } catch (error) {
      const message = `Error onboarding user: ${error}`;
      console.error(message);
      await this.rollbackTenant();
      this.errors.push(message);
    }
  }

  private async onboardAccount({
    userId,
    tenantId,
  }: {
    userId: ID;
    tenantId: ID;
  }) {
    try {
      const account = await this.addAccount.execute(
        OnboardOwnerAccountCommand.build({
          userId,
          tenantId,
        })
      );
      this._accountId = account.id;
      return account;
    } catch (error) {
      const message = `Error onboarding account: ${error}`;
      console.error(message);
      await this.rollbackUser();
      await this.rollbackTenant();
      this.errors.push(message);
    }
  }

  private async onboardSubscription({
    planId,
    tenantId,
    billing,
  }: {
    planId: ID;
    tenantId: ID;
    billing: SubscriptionBillingRequest;
  }) {
    try {
      const subscription = await this.addSubscription.execute(
        OnboardSubscriptionCommand.build({
          planId,
          tenantId,
          billing,
        })
      );
      return subscription;
    } catch (error) {
      const message = `Error onboarding subscription: ${error}`;
      console.error(message);
      await this.rollbackAccount();
      await this.rollbackUser();
      await this.rollbackTenant();
      this.errors.push(message);
    }
  }

  async onboard(request: OnboardTenantRequest): Promise<string> {
    // build billing and validate plan and requested billing cycle
    const {
      plan: { id: planId, subscription: requestesCycle },
    } = request;
    const billing = await this.getPlanAndBillingInfo(planId, requestesCycle);

    // add tenant
    const tenant = await this.onboardTenant(request); 
    this.checkErrors();

    // add user
    const user = await this.onboardUser(request);
    this.checkErrors();

    // add account
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const account = await this.onboardAccount({
      userId: user.id,
      tenantId: tenant.id,
    });
    this.checkErrors();

    // add subscription
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const subscription = await this.onboardSubscription({
      planId,
      tenantId: tenant.id,
      billing,
    });
    this.checkErrors();

    return "Tenant oboarded succesfully!";
  }

}
