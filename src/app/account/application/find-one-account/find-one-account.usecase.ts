import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { AccountService } from "../../domain/account.service";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { AccountDto, accountToDto } from "../../domain/account.interface";
import { StoreService } from "../../../store/domain/store.service";

@Injectable()
export class FindOneAccountUsecase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<AccountDto> {
    const account = await this.accountService.findByIdOrFail(id);
    // const tenantRef = this.tenantService.getTenantRef(account.tenantId);
    const storeRef = this.storeService.getStoreRef(account.storeId);
    return accountToDto(account, null, storeRef);
  }
}
