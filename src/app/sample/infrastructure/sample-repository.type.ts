
import { SampleMockedRepository } from "./mocked/sample.mocked-repo";
import { SampleMongoRepository } from "./mongo/sample.mongo-repo";

export type SampleRepository = SampleMockedRepository | SampleMongoRepository
