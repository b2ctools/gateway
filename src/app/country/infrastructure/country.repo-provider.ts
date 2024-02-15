import { config } from "../../config/config.service";
import { CountryMockedRepository } from "./mocked/country.mocked-repo";
import { CountryMongoRepository } from "./mongo/country.mongo-repo";

export const getCountryRepo = () => {
  const type = config.get("countryRepo");
  return {
    provide: "CountryRepository",
    useClass:
      type === "mock" ? CountryMockedRepository : CountryMongoRepository,
  };
};
