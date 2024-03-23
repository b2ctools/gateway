
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { subscriptionPath } from "src/app/shared/routes";
import { FindOneSubscriptionUseCase } from "./find-one-subscription.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { SubscriptionDto } from "../../domain/subscription.interface";

@Controller(subscriptionPath)
export class FindOneSubscriptionController {
    constructor(
        @Inject(FindOneSubscriptionUseCase)
        private readonly useCase: FindOneSubscriptionUseCase
    ) {}

    @Get(":id")
    async findOne(@Param("id") id: ID): Promise<SubscriptionDto> {
        return await this.useCase.execute(id);
    }
}
