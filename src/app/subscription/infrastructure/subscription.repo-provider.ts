
import { config } from "../../config/config.service";
import { SubscriptionMockedRepository } from "./mocked/subscription.mocked-repo";
import { SubscriptionMongoRepository } from "./mongo/subscription.mongo-repo";

export const getSubscriptionRepo = () => {
    const type = config.get('subscriptionRepo');
    return {
        provide: 'SubscriptionRepository',
        useClass: type === 'mock' ? SubscriptionMockedRepository : SubscriptionMongoRepository
    }
}
