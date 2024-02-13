
import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { SearchAccountRequest } from "./search-account.request";
import { IEntity } from "src/app/shared/abstract-repository/entities/base-entity";
import { UserService } from "src/app/user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class SearchAccountUseCase {
    constructor(
        @Inject(AccountService)
        private readonly accountService: AccountService,

        @Inject(UserService)
        private readonly userService: UserService,
    ){}

    private async validateUser(userId: ID){
        if (userId){
            await this.userService.findByIdOrFail(userId);
            return;
        }
    }

    async execute(request: SearchAccountRequest){
        return await this.accountService.findAllAccounts(request)
    }
}
