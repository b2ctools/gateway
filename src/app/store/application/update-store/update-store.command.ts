import { Injectable } from "@nestjs/common";
import { UpdateStoreRequest } from "./update-store.request";

@Injectable()
export class UpdateStoreCommand {
  name: string;
  description: string;
  constructor(request: UpdateStoreRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
