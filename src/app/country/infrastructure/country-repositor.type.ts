import { CountryMockedRepository } from "./mocked/country.mocked-repo";
import { CountryMongoRepository } from "./mongo/country.mongo-repo";

export type CountryRepository =
  | CountryMockedRepository
  | CountryMongoRepository;
