import { Body, Controller, Inject, Post } from "@nestjs/common";
import { permissionPath } from "../../../shared/routes";
import { AddPermissionUseCase } from "./add-permission.usecase";
import { AddPermissionRequest } from "./add-permission.request";
import { AddPermissionCommand } from "./add-permission.command";
import { PermissionDto } from "../../domain/permission.interface";

@Controller(permissionPath)
export class AddPermissionController {
  constructor(
    @Inject(AddPermissionUseCase)
    private readonly useCase: AddPermissionUseCase,
  ) {}

  @Post()
  async addPermission(@Body() request: AddPermissionRequest): Promise<PermissionDto> {
    return await this.useCase.addPermission(
      new AddPermissionCommand(request),
    );
  }
}
