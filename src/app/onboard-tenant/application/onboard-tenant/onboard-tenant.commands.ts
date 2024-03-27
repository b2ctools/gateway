import { TenantAddress } from "src/app/tenant/domain/tenant.interface";
import { OnboardTenantRequest } from "./onboard-tenant.request";
import { AddTenantRequest } from "src/app/tenant/application/add-tenant/add-tenant.request";
import { AddTenantCommand } from "src/app/tenant/application/add-tenant/add-tenant.command";
import { RegisterUserCommand } from "src/app/user/application/register-user/register-user.command";
import { RegisterUserRequest } from "src/app/user/application/register-user/register-user.request";
import { UserRole } from "src/app/user/domain/user.interface";
import { AddAccountCommand } from "src/app/account/application/add-account/add-account.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Scope } from "src/app/account/domain/account.interface";
import { SubscriptionBillingRequest } from "src/app/subscription/application/add-subscription/add-subscription.request";
import { AddSubscriptionCommand } from "src/app/subscription/application/add-subscription/add-subscription.command";

export class OnboardTenantCommand {
  public static build(request: OnboardTenantRequest): AddTenantCommand {
    const { company } = request;

    // building tenant command
    const address: TenantAddress = {
      address: company.address,
      address2: company.address2,
      city: company.city,
      state: company.state,
      country: company.country,
      zip: company.zip,
      latitude: company.lat,
      longitude: company.long,
    };

    const tenantRequest: AddTenantRequest = {
      name: company.name,
      address: address,
      logo: "",
      primaryOwnerId: "",
    };
    return new AddTenantCommand(tenantRequest);
  }
}

export class OnboardUserCommand {
  public static build(request: OnboardTenantRequest): RegisterUserCommand {
    const { owner } = request;

    // building user command
    const userRequest: RegisterUserRequest = {
      firstName: owner.firstName,
      lastName: owner.lastName,
      password: "12345",
      email: owner.email,
      nickname: "",
      role: UserRole.USER,
      phone: owner.phone,
      avatar: "",
      birthDay: null,
      address: {
        address: "",
      },
    };
    return new RegisterUserCommand(userRequest);
  }
}

export class OnboardOwnerAccountCommand {
  public static build({
    userId,
    tenantId,
  }: {
    userId: ID;
    tenantId: ID;
  }): AddAccountCommand {
    return new AddAccountCommand({
      userId,
      scope: Scope.OWNER,
      tenantId,
    });
  }
}

export class OnboardSubscriptionCommand {
  public static build({
    planId,
    tenantId,
    billing,
  }: {
    planId: ID;
    tenantId: ID;
    billing: SubscriptionBillingRequest;
  }): AddSubscriptionCommand {
    
    return new AddSubscriptionCommand({
      billing,
      tenantId,
      planId,
    });
  }
}