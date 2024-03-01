import { config } from "../../config/config.service";
import { CustomerMockedRepository } from "./mocked/customer.mocked-repo";
import { CustomerMongoRepository } from "./mongo/customer.mongo-repo";

export const getCustomerRepo = () => {
  const type = config.get("customerRepo");
  return {
    provide: "CustomerRepository",
    useClass: type === "mock" ? CustomerMockedRepository : CustomerMongoRepository,
  };
};
