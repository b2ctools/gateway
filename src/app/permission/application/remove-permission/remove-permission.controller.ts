import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { permissionPath } from "../../../shared/routes";
import { RemovePermissionUseCase } from "./remove-permission.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(permissionPath)
export class RemovePermissionController {
  constructor(
    @Inject(RemovePermissionUseCase)
    private readonly useCase: RemovePermissionUseCase,
  ) {}

  @Delete("/:id")
  async removePermission(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Permission succesfully removed" };
  }
}
