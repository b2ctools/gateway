import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Store } from "../../domain/store.interface";

export class StoreMockedEntity extends MockedEntity implements Omit<Store, 'id'> {
    name: string;
    description?: string;
}