
import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveAccountUseCase {
    constructor(
        @Inject(AccountService)
        private readonly accountService: AccountService,
    ){}

    async execute(accountId: ID){
        await this.accountService.removeAccount(accountId);
    }
}
