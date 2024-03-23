import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PermissionRepository } from "../infrastructure/permission-repository.type";
import { AddPermissionCommand } from "../application/add-permission/add-permission.command";
import { Permission, PermissionRef } from "./permission.interface";
import { FindAllOutput, ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdatePermissionRequest } from "../application/update-permission/update-permission.request";

@Injectable()
export class PermissionService {
  private backupPermissions: Permission[] = [];
  constructor(
    @Inject("PermissionRepository")
    private readonly permissionRepo: PermissionRepository,
  ) {}

  getPermissionRef(permissionId: ID): PermissionRef {
    if (!permissionId) {
      return null;
    }
    const { id, name } = this.backupPermissions.find(
      (t) => t.id === permissionId,
    );
    return { id, name };
  }

  private async updateBackupPermissions() {
    const response = await this.permissionRepo.findAll({});
    this.backupPermissions = response.data;
  }

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

  async addPermission(command: AddPermissionCommand): Promise<Permission> {
    await this.verifyPermissionName(command.name);

    const permission: Permission = {
      id: null,
      ...command,
    };

    const response = await this.permissionRepo.create(permission);
    await this.updateBackupPermissions();
    return response;
  }

  async removePermission(id: ID) {
    await this.permissionRepo.delete(id);
    await this.updateBackupPermissions();
  }

  async findAllPermissions(request: SearchRequest): Promise<FindAllOutput<Permission>> {
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
    const permissionToUpdate = {
      ...existingPermission,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
    };

    console.log(`Updating Permission - ${JSON.stringify(request)}`);
    const response = await this.permissionRepo.persist(permissionToUpdate);
    await this.updateBackupPermissions();
    return response;
  }

  private async canUpdateName(name: string, existingId: ID) {
    const permission = await this.permissionRepo.getPermissionByName(name);
    if (permission && permission.id !== existingId) {
      throw new BadRequestException(`Permission name ${name} is already taken`);
    }
  }
}
