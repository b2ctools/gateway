import { Inject, Injectable } from "@nestjs/common";
import { PermissionService } from "../../domain/permission.service";
import { AddPermissionCommand } from "./add-permission.command";
import { PermissionDto, permissionToDto } from "../../domain/permission.interface";

@Injectable()
export class AddPermissionUseCase {
  constructor(
    @Inject(PermissionService)
    private readonly pcService: PermissionService,
  ) {}

  async addPermission(command: AddPermissionCommand): Promise<PermissionDto> {
    const p = await this.pcService.addPermission(command);
    return permissionToDto(p);
  }
}
