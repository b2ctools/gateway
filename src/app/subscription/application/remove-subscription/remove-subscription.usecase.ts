
import { Inject, Injectable } from "@nestjs/common";
import { SubscriptionService } from "../../domain/subscription.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveSubscriptionUseCase {
    constructor(
        @Inject(SubscriptionService)
        private readonly subscriptionService: SubscriptionService,
    ){}

    async execute(subscriptionId: ID){
        await this.subscriptionService.findByIdOrFail(subscriptionId);
        await this.subscriptionService.removeSubscription(subscriptionId);
    }
}
