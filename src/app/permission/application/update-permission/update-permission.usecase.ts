import { Inject, Injectable } from "@nestjs/common";
import { PermissionService } from "../../domain/permission.service";
import { UpdatePermissionRequest } from "./update-permission.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdatePermissionUseCse {
  constructor(
    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  async execute(id: ID, request: UpdatePermissionRequest) {
    return await this.permissionService.updatePermission(id, request);
  }
}
