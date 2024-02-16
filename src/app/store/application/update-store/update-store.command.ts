import { Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { UpdateStoreRequest } from "./update-store.request";

@Injectable()
export class UpdateStoreCommand {
  id: ID;
  name: string;
  description: string;
  constructor(request: UpdateStoreRequest) {
    const { id, name, description } = request;
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
