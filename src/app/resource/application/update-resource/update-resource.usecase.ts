import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { UpdateResourceRequest } from "./update-resource.request";

@Injectable()
export class UpdateResourceUseCse {
  constructor(
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  async execute(request: UpdateResourceRequest) {
    return await this.resourceService.updateResource(request);
  }
}
