import { CustomerMockedRepository } from "./mocked/customer.mocked-repo";
import { CustomerMongoRepository } from "./mongo/customer.mongo-repo";

export type CustomerRepository = CustomerMockedRepository | CustomerMongoRepository;
