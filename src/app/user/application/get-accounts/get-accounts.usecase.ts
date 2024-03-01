import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import { StoreService } from "src/app/store/domain/store.service";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { AccountDto, accountToDto } from "src/app/account/domain/account.interface";

@Injectable()
export class GetAccountUseCase {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,

        @Inject(StoreService)
        private readonly storeService: StoreService,
    
        @Inject(TenantService)
        private readonly tenantService: TenantService,
    ) {}
    
    async execute(): Promise<AccountDto[]> {
        const accounts =  await this.userService.getAccounts();

        return accounts.map(account => {
            const tenantRef = this.tenantService.getTenantRef(account.tenantId);
            const storeRef = this.storeService.getStoreRef(account.storeId);

            const dto = accountToDto(account, null, storeRef, null);
            return {
                ...dto,
                tenant: tenantRef
            }
        })
    }
}