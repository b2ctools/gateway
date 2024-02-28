import { Inject, Injectable } from "@nestjs/common";
import { PermissionService } from "../../domain/permission.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import {
  PermissionDto,
  permissionToDto,
} from "../../domain/permission.interface";

@Injectable()
export class FindOnePermissionUseCase {
  constructor(
    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  async execute(id: ID): Promise<PermissionDto> {
    const permission = await this.permissionService.findByIdOrFail(id);
    return permissionToDto(permission);
  }
}
