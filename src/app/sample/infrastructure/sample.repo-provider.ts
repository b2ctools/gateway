
import { config } from "../../config/config.service";
import { SampleMockedRepository } from "./mocked/sample.mocked-repo";
import { SampleMongoRepository } from "./mongo/sample.mongo-repo";

export const getSampleRepo = () => {
    const type = config.get('sampleRepo');
    return {
        provide: 'SampleRepository',
        useClass: type === 'mock' ? SampleMockedRepository : SampleMongoRepository
    }
}
