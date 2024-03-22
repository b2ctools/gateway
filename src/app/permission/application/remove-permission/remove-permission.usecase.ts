import { Inject, Injectable } from "@nestjs/common";
import { PermissionService } from "../../domain/permission.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemovePermissionUseCase {
  constructor(
    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  async execute(permissionId: ID) {
    await this.permissionService.findByIdOrFail(permissionId);
    await this.permissionService.removePermission(permissionId);
  }
}
