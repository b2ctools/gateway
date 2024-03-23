
import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { subscriptionPath } from "../../../shared/routes";
import { UpdateSubscriptionUseCse } from "./update-subscription.usecase";
import { UpdateSubscriptionRequest } from "./update-subscription.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(subscriptionPath)
export class UpdateSubscriptionController {
    constructor(
        @Inject(UpdateSubscriptionUseCse)
        private readonly useCase: UpdateSubscriptionUseCse,
    ){}

    @Patch()
    async updateSubscription(@Param("id") id: ID, @Body() request: UpdateSubscriptionRequest){
        return await this.useCase.execute(id, request)
    }
}
