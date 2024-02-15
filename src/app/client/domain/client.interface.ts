import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";

export interface Client extends IDomain {
  userId: ID;
  description?: string;
}

export interface ClientDto extends Client {}

export const clientToDto = (u: Client): ClientDto => ({ ...u });

export const sortable = ["name", "description"];
