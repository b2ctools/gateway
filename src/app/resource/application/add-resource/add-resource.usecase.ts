import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { AddResourceCommand } from "./add-resource.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { PermissionService } from "src/app/permission/domain/permission.service";
import { ResourceDto, resourceToDto } from "../../domain/resource.interface";

@Injectable()
export class AddResourceUseCase {
  constructor(
    @Inject(ResourceService)
    private readonly pcService: ResourceService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  private async validatePermissions(permissions: ID[]) {
    if (permissions && permissions.length > 0) {
      await Promise.all(
        permissions.map(async (permission) =>
          this.permissionService.findByIdOrFail(permission),
        ),
      );
    }
  }

  async execute(command: AddResourceCommand): Promise<ResourceDto> {
    await this.validatePermissions(command.permissions);

    const resource = await this.pcService.addResource(command);
    return resourceToDto(resource);

  }
}
