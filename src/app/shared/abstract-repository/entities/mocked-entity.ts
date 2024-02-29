import { ID } from "../repository.interface";
import { IEntity } from "./base-entity";

/** Generic Mocked Entity */
export class MockedEntity extends IEntity {
  _id: ID;
}
