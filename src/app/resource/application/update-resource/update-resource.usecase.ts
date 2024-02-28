import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { UpdateResourceRequest } from "./update-resource.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateResourceUseCse {
  constructor(
    @Inject(ResourceService)
    private readonly pcService: ResourceService,

    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  private async validatePermissions(permissions: ID[]) {
    if (permissions && permissions.length > 0) {
      await Promise.all(
        permissions.map(async (permission) =>
          this.resourceService.findByIdOrFail(permission),
        ),
      );
    }
  }

  async execute(id: ID, request: UpdateResourceRequest) {
    await this.validatePermissions(request.permissions);

    return await this.resourceService.updateResource(id, request);
  }
}
