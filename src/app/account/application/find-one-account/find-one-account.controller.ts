import { Controller, Get, Inject, Param } from "@nestjs/common";
import { accountPath } from "src/app/shared/routes";
import { FindOneAccountUsecase } from "./find-one-account.usecase";
import { accountToDto } from "../../domain/account.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(accountPath)
export class FindOneAccountController {
    constructor(
        @Inject(FindOneAccountUsecase)
        private readonly useCase: FindOneAccountUsecase,
    ) {}
    
    @Get(":id")
    async findOne(@Param('id') id: ID) {
        const account = await this.useCase.execute(id);
        return accountToDto(account);
    }
}
