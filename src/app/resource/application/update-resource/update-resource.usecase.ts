import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { UpdateResourceRequest } from "./update-resource.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateResourceUseCse {
  constructor(
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  // TODO: Add validation for permissions
  async execute(id: ID, request: UpdateResourceRequest) {
    return await this.resourceService.updateResource(id, request);
  }
}
