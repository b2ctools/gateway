import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Client } from "../../domain/client.interface";
import { AddClientRequest } from "./add-client.request";

export class AddClientCommand implements Omit<Client, "id" | "tenantId"> {
  userId: ID;
  description?: string;
  parent: ID;

  constructor(request: AddClientRequest) {
    const { userId, description } = request;
    this.userId = userId;
    this.description = description;
  }
}
