import { ID } from "../repository.interface";

/** Generic domain entity */
export interface IDomain {
  id: ID;

  createdAt?: Date;
  updatedAt?: Date;
}
