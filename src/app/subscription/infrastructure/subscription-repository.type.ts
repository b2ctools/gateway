
import { SubscriptionMockedRepository } from "./mocked/subscription.mocked-repo";
import { SubscriptionMongoRepository } from "./mongo/subscription.mongo-repo";

export type SubscriptionRepository = SubscriptionMockedRepository | SubscriptionMongoRepository
