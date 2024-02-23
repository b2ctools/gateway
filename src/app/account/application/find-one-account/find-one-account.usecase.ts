import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { AccountService } from "../../domain/account.service";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { AccountDto, accountToDto } from "../../domain/account.interface";

@Injectable()
export class FindOneAccountUsecase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<AccountDto> {
    const account = await this.accountService.findByIdOrFail(id);
    const tenantRef = this.tenantService.getTenantRef(account.tenantId);
    return accountToDto(account, tenantRef);
  }
}
