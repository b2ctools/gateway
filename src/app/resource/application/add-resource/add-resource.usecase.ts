import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { AddResourceCommand } from "./add-resource.command";

@Injectable()
export class AddResourceUseCase {
  constructor(
    @Inject(ResourceService)
    private readonly pcService: ResourceService,
  ) {}

  async addResource(command: AddResourceCommand) {
    return await this.pcService.addResource(command);
  }
}
