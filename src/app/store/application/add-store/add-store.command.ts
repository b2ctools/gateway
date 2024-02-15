import { AddStoreRequest } from "./add-store.request";

export class AddStoreCommand {
  name: string;
  description: string;

  constructor(request: AddStoreRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
