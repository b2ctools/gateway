import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { accountPath } from "../../../shared/routes";
import { SetPermissionsUseCase } from "./set-permissions.usecase";
import { SetPermissionsRequest } from "./set-permissions.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(accountPath)
export class SetPermissionsController {
  constructor(
    @Inject(SetPermissionsUseCase)
    private readonly useCase: SetPermissionsUseCase,
  ) {}

  @Post("/:id/set-permissions")
  async setPermissions(
    @Param("id") id: ID,
    @Body() request: SetPermissionsRequest,
  ) {
    return await this.useCase.execute(id, request);
  }
}
