import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PermissionRepository } from "../infrastructure/permission-repository.type";
import { AddPermissionCommand } from "../application/add-permission/add-permission.command";
import { Permission } from "./permission.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/base.request";
import { UpdatePermissionRequest } from "../application/update-permission/update-permission.request";

@Injectable()
export class PermissionService {
  constructor(
    @Inject("PermissionRepository")
    private readonly permissionRepo: PermissionRepository,
  ) {}

  private async verifyPermissionName(name: string): Promise<void> {
    const existing = await this.permissionRepo.getPermissionByName(name);

    if (existing) {
      throw new BadRequestException(`Permission name  is already taken`);
    }
  }

  async findByIdOrFail(permissionId: ID) {
    const existingPermission = await this.permissionRepo.findById(permissionId);
    if (!existingPermission) {
      throw new BadRequestException(
        `Permission with id ${permissionId} not found`,
      );
    }
    return existingPermission;
  }

  async addPermission(command: AddPermissionCommand) {
    await this.verifyPermissionName(command.name);

    const permission: Permission = {
      id: null,
      ...command,
    };

    return await this.permissionRepo.create(permission);
  }

  async removePermission(id: ID) {
    await this.permissionRepo.delete(id);
  }

  async findAllPermissions(request: SearchRequest) {
    return await this.permissionRepo.findAll(request);
  }

  async updatePermission(
    id: ID,
    request: UpdatePermissionRequest,
  ): Promise<Permission> {
    const { name, description } = request;
    const existingPermission = await this.findByIdOrFail(id);

    existingPermission.name = name ? name : existingPermission.name;
    existingPermission.description = description
      ? description
      : existingPermission.description;

    console.log(
      `Updating Permission - ${JSON.stringify({
        id,
        name,
        description,
      })}`,
    );
    return await this.permissionRepo.persist(existingPermission);
  }
}
